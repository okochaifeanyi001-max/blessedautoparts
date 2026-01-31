import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.png";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Hero Banner Section */}
      <div style={{
        position: 'relative',
        height: '350px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)'
      }}>
        <img
          src={accImg}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.8)'
          }}
          alt="Account Banner"
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            My Account
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Manage your orders and addresses
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: '1px solid #e9ecef'
        }}>
          {/* Account Navigation Tabs */}
          <Tabs defaultValue="orders" style={{ width: '100%' }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #e9ecef',
              padding: '0 24px'
            }}>
              <TabsList style={{
                backgroundColor: 'transparent',
                border: 'none',
                justifyContent: 'flex-start',
                gap: '8px'
              }}>
                <TabsTrigger
                  value="orders"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px 8px 0 0',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#6c757d',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '3px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                >
                  📦 My Orders
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px 8px 0 0',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#6c757d',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '3px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                >
                  📍 My Addresses
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div style={{ padding: '24px' }}>
              <TabsContent
                value="orders"
                style={{
                  margin: 0,
                  animation: 'fadeIn 0.3s ease-in-out'
                }}
              >
                <div style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#343a40',
                    marginBottom: '8px'
                  }}>
                    Order History
                  </h2>
                  <p style={{
                    color: '#6c757d',
                    margin: 0
                  }}>
                    View and track all your orders
                  </p>
                </div>
                <ShoppingOrders />
              </TabsContent>

              <TabsContent
                value="address"
                style={{
                  margin: 0,
                  animation: 'fadeIn 0.3s ease-in-out'
                }}
              >
                <div style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#343a40',
                    marginBottom: '8px'
                  }}>
                    Address Management
                  </h2>
                  <p style={{
                    color: '#6c757d',
                    margin: 0
                  }}>
                    Manage your delivery addresses
                  </p>
                </div>
                <Address />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Add some custom CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .data-[state=active]:bg-white {
            background-color: white !important;
          }

          .data-[state=active]:text-blue-600 {
            color: #2563eb !important;
          }

          .data-[state=active]:border-blue-600 {
            border-bottom-color: #2563eb !important;
          }

          .data-[state=active]:shadow-none {
            box-shadow: none !important;
          }
        `}
      </style>
    </div>
  );
}

export default ShoppingAccount;
