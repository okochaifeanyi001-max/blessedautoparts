import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

function ProductImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter out empty image URLs
  const validImages = images?.filter(img => img && img.trim() !== "") || [];

  if (!validImages.length) {
    return (
      <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-96">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={validImages[currentImageIndex]}
        alt={`Product image ${currentImageIndex + 1}`}
        width={600}
        height={600}
        className="aspect-square w-full object-cover"
      />

      {validImages.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductImageSlider;