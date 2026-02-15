import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent style={{ maxWidth: '700px', maxHeight: '90vh', overflow: 'auto', backgroundColor: '#ffffff', borderRadius: '8px' }}>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#343a40', margin: 0 }}>Order Details</h2>
          <Button
            onClick={() => {
              // This will close the dialog and return to orders list
              const closeButton = document.querySelector('[data-radix-dialog-close]');
              if (closeButton) closeButton.click();
            }}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Back to Orders
          </Button>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057', marginBottom: '15px' }}>Order Information</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Order ID:</span>
                <Label style={{ fontWeight: 'bold', color: '#343a40' }}>{orderDetails?._id}</Label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Order Date:</span>
                <Label style={{ color: '#343a40' }}>{orderDetails?.orderDate.split("T")[0]}</Label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Order Price:</span>
                <Label style={{ fontWeight: '900', color: '#28a745', fontSize: '16px' }}>₦{orderDetails?.totalAmount?.toLocaleString()}</Label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Payment Method:</span>
                <Label style={{ color: '#343a40' }}>{orderDetails?.paymentMethod}</Label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Payment Status:</span>
                <Label style={{ color: '#343a40' }}>{orderDetails?.paymentStatus}</Label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#6c757d' }}>Order Status:</span>
                <Badge
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor:
                      orderDetails?.orderStatus === "confirmed"
                        ? "#d4edda"
                        : orderDetails?.orderStatus === "rejected"
                        ? "#f8d7da"
                        : "#e2e3e5",
                    color:
                      orderDetails?.orderStatus === "confirmed"
                        ? "#155724"
                        : orderDetails?.orderStatus === "rejected"
                        ? "#721c24"
                        : "#383d41"
                  }}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </div>
            </div>
          </div>

          <Separator style={{ margin: '20px 0', borderColor: '#e9ecef' }} />

          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057', marginBottom: '15px' }}>Order Items</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f3f4',
                      borderRadius: '4px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontWeight: '500', color: '#343a40' }}>{item.title}</span>
                      <span style={{ color: '#6c757d' }}>Qty: {item.quantity}</span>
                      <span style={{ fontWeight: '900', color: '#28a745' }}>₦{item.price?.toLocaleString()}</span>
                    </li>
                  ))
                : <li style={{ textAlign: 'center', color: '#6c757d', fontStyle: 'italic', padding: '20px' }}>No items found</li>}
            </ul>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057', marginBottom: '15px' }}>Shipping Information</h3>
            <div style={{ color: '#6c757d', lineHeight: '1.6' }}>
              <div><strong>{user.userName}</strong></div>
              <div>{orderDetails?.addressInfo?.address}</div>
              <div>{orderDetails?.addressInfo?.city}</div>
              <div>{orderDetails?.addressInfo?.pincode}</div>
              <div>{orderDetails?.addressInfo?.phone}</div>
              {orderDetails?.addressInfo?.notes && <div><em>Notes: {orderDetails?.addressInfo?.notes}</em></div>}
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e9ecef', padding: '20px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057', marginBottom: '15px' }}>Update Order Status</h3>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
