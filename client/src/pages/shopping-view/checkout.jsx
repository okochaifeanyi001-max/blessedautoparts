import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { approvalURL, paystackAuthURL, flutterwaveLink } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePayment() {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required for checkout. Please sign in.",
        variant: "destructive",
      });
      return;
    }

    if (!cartItems?.items || cartItems.items.length === 0 || totalCartAmount === 0) {
      toast({
        title: "Please add products to cart before checkout",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: Array.isArray(singleCartItem?.image) ? singleCartItem?.image[0] : singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: selectedPaymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // Add additional data for Paystack and Flutterwave
    if (selectedPaymentMethod === "paystack" || selectedPaymentMethod === "flutterwave") {
      orderData.email = user?.email;
      orderData.customerName = `${user?.userName || 'Customer'}`;
    }

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "order creation response");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
        if (selectedPaymentMethod === "cod") {
          // For Cash on Delivery, redirect to success page immediately
          window.location.href = "/shop/payment-success";
        }
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  if (paystackAuthURL) {
    window.location.href = paystackAuthURL;
  }

  if (flutterwaveLink) {
    window.location.href = flutterwaveLink;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₦{totalCartAmount}</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedPaymentMethod === "cod"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="cod" className="text-sm font-medium">
                    Make Transfer
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={selectedPaymentMethod === "paypal"}
                    onChange={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                      toast({
                        title: "Coming Soon, Contact Sales Admin",
                        variant: "default",
                      });
                    }}
                    className="h-4 w-4"
                    disabled
                  />
                  <label htmlFor="paypal" className="text-sm font-medium opacity-50">
                    PayPal (Disabled)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paystack"
                    name="paymentMethod"
                    value="paystack"
                    checked={selectedPaymentMethod === "paystack"}
                    onChange={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                      toast({
                        title: "Coming Soon, Contact Sales Admin",
                        variant: "default",
                      });
                    }}
                    className="h-4 w-4"
                    disabled
                  />
                  <label htmlFor="paystack" className="text-sm font-medium opacity-50">
                    Paystack (Disabled)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="flutterwave"
                    name="paymentMethod"
                    value="flutterwave"
                    checked={selectedPaymentMethod === "flutterwave"}
                    onChange={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                      toast({
                        title: "Coming Soon, Contact Sales Admin",
                        variant: "default",
                      });
                    }}
                    className="h-4 w-4"
                    disabled
                  />
                  <label htmlFor="flutterwave" className="text-sm font-medium opacity-50">
                    Flutterwave (Disabled)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePayment}
              className="w-full"
              disabled={
                selectedPaymentMethod === "paypal" ||
                selectedPaymentMethod === "paystack" ||
                selectedPaymentMethod === "flutterwave" ||
                !cartItems?.items ||
                cartItems.items.length === 0 ||
                totalCartAmount === 0
              }
            >
              {isPaymentStart
                ? selectedPaymentMethod === "cod"
                  ? "Processing Order..."
                  : `Processing ${selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1)} Payment...`
                : selectedPaymentMethod === "cod"
                ? "Place Order (After Transfer Success)"
                : `Checkout with ${selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
