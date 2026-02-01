import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.png";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.3)]">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center brightness-75"
          alt="Account Banner"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-full px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 drop-shadow-lg">
            My Account
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 drop-shadow-md">
            Manage your orders and addresses
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Account Navigation Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6">
              <TabsList className="bg-transparent border-none justify-start gap-2 w-full sm:w-auto overflow-x-auto">
                <TabsTrigger
                  value="orders"
                  className="px-4 sm:px-6 py-3 rounded-t-lg font-semibold text-sm sm:text-base text-gray-600 bg-transparent border-none border-b-[3px] border-transparent transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">📦 My Orders</span>
                  <span className="sm:hidden">📦 Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="px-4 sm:px-6 py-3 rounded-t-lg font-semibold text-sm sm:text-base text-gray-600 bg-transparent border-none border-b-[3px] border-transparent transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">📍 My Addresses</span>
                  <span className="sm:hidden">📍 Addresses</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <TabsContent
                value="orders"
                className="m-0 animate-fadeIn"
              >
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mb-4 md:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Order History
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 m-0">
                    View and track all your orders
                  </p>
                </div>
                <ShoppingOrders />
              </TabsContent>

              <TabsContent
                value="address"
                className="m-0 animate-fadeIn"
              >
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mb-4 md:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Address Management
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 m-0">
                    Manage your delivery addresses
                  </p>
                </div>
                <Address />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
