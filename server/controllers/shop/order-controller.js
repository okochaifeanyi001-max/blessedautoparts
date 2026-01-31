const paypal = require("../../helpers/paypal");
const paystack = require("../../helpers/paystack");
const flutterwave = require("../../helpers/flutterwave");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // Handle different payment methods
    if (paymentMethod === "paypal") {
      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log(error);

          return res.status(500).json({
            success: false,
            message: "Error while creating paypal payment",
          });
        } else {
          const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });

          await newlyCreatedOrder.save();

          const approvalURL = paymentInfo.links.find(
            (link) => link.rel === "approval_url",
          ).href;

          res.status(201).json({
            success: true,
            approvalURL,
            orderId: newlyCreatedOrder._id,
          });
        }
      });
    } else if (paymentMethod === "paystack") {
      try {
        const paymentData = {
          email: req.body.email, // We'll need to pass email from frontend
          amount: Math.round(totalAmount * 100), // Paystack expects amount in kobo (multiply by 100)
          currency: "NGN", // or USD depending on your setup
          reference: `order_${Date.now()}_${userId}`,
          callback_url: "http://localhost:5173/shop/paystack-return",
          metadata: {
            orderId: null, // We'll set this after creating order
            cartId,
            userId,
          },
        };

        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId: paymentData.reference,
          payerId: "",
        });

        await newlyCreatedOrder.save();
        paymentData.metadata.orderId = newlyCreatedOrder._id;

        const paymentResponse =
          await paystack.transaction.initialize(paymentData);

        res.status(201).json({
          success: true,
          authorization_url: paymentResponse.data.authorization_url,
          reference: paymentResponse.data.reference,
          orderId: newlyCreatedOrder._id,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error while creating paystack payment",
        });
      }
    } else if (paymentMethod === "flutterwave") {
      try {
        const paymentData = {
          tx_ref: `order_${Date.now()}_${userId}`,
          amount: totalAmount,
          currency: "NGN",
          redirect_url: "http://localhost:5173/shop/flutterwave-return",
          customer: {
            email: req.body.email, // We'll need to pass email from frontend
            name: req.body.customerName, // We'll need to pass customer name
          },
          customizations: {
            title: "Order Payment",
            description: "Payment for order items",
          },
          meta: {
            orderId: null, // We'll set this after creating order
            cartId,
            userId,
          },
        };

        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId: paymentData.tx_ref,
          payerId: "",
        });

        await newlyCreatedOrder.save();
        paymentData.meta.orderId = newlyCreatedOrder._id;

        const paymentResponse = await flutterwave.Payment.create(paymentData);

        res.status(201).json({
          success: true,
          link: paymentResponse.data.link,
          tx_ref: paymentResponse.data.tx_ref,
          orderId: newlyCreatedOrder._id,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error while creating flutterwave payment",
        });
      }
    } else {
      // For other payment methods or cash on delivery
      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
      });

      await newlyCreatedOrder.save();

      res.status(201).json({
        success: true,
        orderId: newlyCreatedOrder._id,
        message: "Order created successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    // Verify the payment with Paystack
    const verificationResponse = await paystack.transaction.verify(reference);

    if (verificationResponse.data.status === "success") {
      let order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = reference;

      for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Not enough stock for product ${item.productId}`,
          });
        }

        product.totalStock -= item.quantity;

        await product.save();
      }

      const cart = await Cart.findById(order.cartId);

      if (cart) {
        cart.items = [];

        await cart.save();
      }

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order confirmed",
        data: order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const verifyFlutterwavePayment = async (req, res) => {
  try {
    const { transaction_id, orderId } = req.body;

    // Verify the payment with Flutterwave
    const verificationResponse = await flutterwave.Transaction.verify({
      id: transaction_id,
    });

    if (verificationResponse.data.status === "successful") {
      let order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = transaction_id;

      for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Not enough stock for product ${item.productId}`,
          });
        }

        product.totalStock -= item.quantity;

        await product.save();
      }

      const cart = await Cart.findById(order.cartId);

      if (cart) {
        cart.items = [];

        await cart.save();
      }

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order confirmed",
        data: order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  verifyPaystackPayment,
  verifyFlutterwavePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
