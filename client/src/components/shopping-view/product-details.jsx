import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import ProductImageSlider from "./product-image-slider";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Is Required",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          variant: "success",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 lg:p-12 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] max-h-[90vh] overflow-y-auto">
        <ProductImageSlider images={productDetails?.image} />
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-2xl mb-3 md:mb-4 lg:mb-5 mt-2 md:mt-3 lg:mt-4">
              {productDetails?.description}
            </p>
            {productDetails?.condition && (
              <div className="mb-3">
                <Badge className={`text-xs font-semibold ${
                  productDetails.condition === "NEW" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}>
                  {productDetails.condition}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p
              className={`text-2xl md:text-3xl text-primary ${
                productDetails?.salePrice > 0 ? "line-through font-bold text-gray-500" : "font-bold"
              }`}
            >
              ₦{productDetails?.price?.toLocaleString()}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl md:text-2xl font-extrabold text-primary">
                ₦{productDetails?.salePrice?.toLocaleString()}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-sm md:text-base text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-4 md:mt-5 mb-4 md:mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] md:max-h-[400px] overflow-auto">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Reviews</h2>
            <div className="grid gap-4 md:gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-3 md:gap-4">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 border flex-shrink-0">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm md:text-base">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground break-words">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-sm md:text-base">No Reviews</h1>
              )}
            </div>
            <div className="mt-6 md:mt-10 flex-col flex gap-2">
              <Label className="text-sm md:text-base">Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="text-sm md:text-base"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="text-sm md:text-base"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
