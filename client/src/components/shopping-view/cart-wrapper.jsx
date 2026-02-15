import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-lg md:text-xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item._id} cartItem={item} />)
          : <p className="text-sm md:text-base text-muted-foreground text-center py-4">Your cart is empty</p>}
      </div>
      <div className="mt-6 md:mt-8 space-y-4">
        <div className="flex justify-between text-base md:text-lg">
          <span className="font-bold">Total</span>
          <span className="font-extrabold">₦{totalCartAmount.toLocaleString()}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-4 md:mt-6 text-sm md:text-base py-5 md:py-6"
        disabled={!cartItems || cartItems.length === 0}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
