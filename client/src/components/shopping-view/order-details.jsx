import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent style={{
      maxWidth: '700px',
      maxHeight: '90vh',
      overflow: 'auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
    }}>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          paddingBottom: '16px',
          borderBottom: '2px solid #e9ecef'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#343a40',
            margin: '0 0 8px 0'
          }}>
            Order Details
          </h2>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            margin: 0
          }}>
            Complete information about your order
          </p>
        </div>

        {/* Order Information Card */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#495057',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📋 Order Information
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Order ID:</span>
              <span style={{
                fontFamily: 'monospace',
                backgroundColor: '#e9ecef',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#495057'
              }}>
                {orderDetails?._id}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Order Date:</span>
              <span style={{ color: '#6c757d', fontSize: '14px' }}>
                {orderDetails?.orderDate.split("T")[0]}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Total Amount:</span>
              <span style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#28a745'
              }}>
                ₦{orderDetails?.totalAmount}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Payment Method:</span>
              <span style={{
                backgroundColor: orderDetails?.paymentMethod === 'cod' ? '#d1ecf1' : '#d4edda',
                color: orderDetails?.paymentMethod === 'cod' ? '#0c5460' : '#155724',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {orderDetails?.paymentMethod === 'cod' ? '💰 Cash on Delivery' : orderDetails?.paymentMethod}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Payment Status:</span>
              <span style={{
                backgroundColor: orderDetails?.paymentStatus === 'paid' ? '#d4edda' : '#fff3cd',
                color: orderDetails?.paymentStatus === 'paid' ? '#155724' : '#856404',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {orderDetails?.paymentStatus === 'paid' ? '✅ Paid' : '⏳ ' + orderDetails?.paymentStatus}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Order Status:</span>
              <Badge
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor:
                    orderDetails?.orderStatus === "confirmed"
                      ? "#d4edda"
                      : orderDetails?.orderStatus === "rejected"
                      ? "#f8d7da"
                      : orderDetails?.orderStatus === "delivered"
                      ? "#d1ecf1"
                      : "#e2e3e5",
                  color:
                    orderDetails?.orderStatus === "confirmed"
                      ? "#155724"
                      : orderDetails?.orderStatus === "rejected"
                      ? "#721c24"
                      : orderDetails?.orderStatus === "delivered"
                      ? "#0c5460"
                      : "#383d41",
                  border: 'none'
                }}
              >
                {orderDetails?.orderStatus === "confirmed" && "✅ "}
                {orderDetails?.orderStatus === "rejected" && "❌ "}
                {orderDetails?.orderStatus === "delivered" && "📦 "}
                {orderDetails?.orderStatus === "inShipping" && "🚚 "}
                {orderDetails?.orderStatus === "inProcess" && "⚙️ "}
                {orderDetails?.orderStatus?.charAt(0).toUpperCase() + orderDetails?.orderStatus?.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Items Card */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#495057',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🛒 Order Items
          </h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid #dee2e6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'transform 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#343a40',
                        margin: '0 0 4px 0'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#6c757d',
                        margin: 0
                      }}>
                        Quantity: <strong>{item.quantity}</strong>
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'right',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#28a745'
                    }}>
                      ₦{item.price}
                    </div>
                  </div>
                ))
              : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6c757d',
                  fontStyle: 'italic'
                }}>
                  No items found in this order
                </div>
              )}
          </div>
        </div>

        {/* Shipping Information Card */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#495057',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📍 Shipping Information
          </h3>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              display: 'grid',
              gap: '8px',
              color: '#495057',
              lineHeight: '1.6'
            }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#343a40' }}>
                {user?.userName || 'Customer'}
              </div>
              <div>{orderDetails?.addressInfo?.address}</div>
              <div>{orderDetails?.addressInfo?.city}</div>
              <div>{orderDetails?.addressInfo?.pincode}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
              </div>
              {orderDetails?.addressInfo?.notes && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '6px',
                  border: '1px solid #ffeaa7'
                }}>
                  <strong style={{ color: '#856404' }}>Notes:</strong>
                  <div style={{ color: '#856404', marginTop: '4px' }}>
                    {orderDetails?.addressInfo?.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
