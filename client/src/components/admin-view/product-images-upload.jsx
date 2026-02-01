import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { API_BASE_URL } from "../../config";

function ProductImagesUpload({
  imageFiles,
  setImageFiles,
  imageLoadingStates,
  uploadedImageUrls,
  setUploadedImageUrls,
  setImageLoadingStates,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  function handleImageFileChange(event, index) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = selectedFile;
      setImageFiles(newImageFiles);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, index) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = droppedFile;
      setImageFiles(newImageFiles);
    }
  }

  function handleRemoveImage(index) {
    const newImageFiles = [...imageFiles];
    const newUploadedImageUrls = [...uploadedImageUrls];
    newImageFiles[index] = null;
    newUploadedImageUrls[index] = "";
    setImageFiles(newImageFiles);
    setUploadedImageUrls(newUploadedImageUrls);
    if (inputRefs[index].current) {
      inputRefs[index].current.value = "";
    }
  }

  async function uploadImageToCloudinary(file, index) {
    const newLoadingStates = [...imageLoadingStates];
    newLoadingStates[index] = true;
    setImageLoadingStates(newLoadingStates);

    const data = new FormData();
    data.append("my_file", file);
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/products/upload-image`,
      data
    );

    if (response?.data?.success) {
      const newUploadedImageUrls = [...uploadedImageUrls];
      newUploadedImageUrls[index] = response.data.result.url;
      setUploadedImageUrls(newUploadedImageUrls);

      const newLoadingStates = [...imageLoadingStates];
      newLoadingStates[index] = false;
      setImageLoadingStates(newLoadingStates);
    }
  }

  useEffect(() => {
    imageFiles.forEach((file, index) => {
      if (file !== null && uploadedImageUrls[index] === "") {
        uploadImageToCloudinary(file, index);
      }
    });
  }, [imageFiles]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Images (Up to 3)</Label>
      {[0, 1, 2].map((index) => (
        <div key={index} className="mb-4">
          <Label className="text-sm font-medium mb-1 block">Image {index + 1}</Label>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`${
              isEditMode ? "opacity-60" : ""
            } border-2 border-dashed rounded-lg p-4`}
          >
            <Input
              id={`image-upload-${index}`}
              type="file"
              className="hidden"
              ref={inputRefs[index]}
              onChange={(e) => handleImageFileChange(e, index)}
              disabled={isEditMode}
            />
            {!imageFiles[index] ? (
              <Label
                htmlFor={`image-upload-${index}`}
                className={`${
                  isEditMode ? "cursor-not-allowed" : ""
                } flex flex-col items-center justify-center h-32 cursor-pointer`}
              >
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                <span>Drag & drop or click to upload image</span>
              </Label>
            ) : imageLoadingStates[index] ? (
              <Skeleton className="h-10 bg-gray-100" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                </div>
                <p className="text-sm font-medium">{imageFiles[index].name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductImagesUpload;