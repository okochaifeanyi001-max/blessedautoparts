import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col h-full">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={Array.isArray(product?.image) ? product?.image[0] : product?.image}
            alt={product?.title}
            className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-3 md:p-4 flex-grow">
          <h2 className="text-base md:text-lg lg:text-xl font-bold mb-2 line-clamp-2">{product?.title}</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
            <span className="text-sm md:text-base text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm md:text-base text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-base md:text-lg font-semibold text-primary`}
            >
              ₦{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-base md:text-lg font-semibold text-primary">
                ₦{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-3 md:p-4 pt-0 mt-auto">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-sm md:text-base">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-sm md:text-base"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
