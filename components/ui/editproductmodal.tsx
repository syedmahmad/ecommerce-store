"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import { PATCH, PUT } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  discount: number;
  stock: string;
  status: number;
  imageUrls: string[];
  isOnSale: any;
  saleTitle: string;
  saleDescription: string;
  startDate: string;
  endDate: string;
  bannerImageUrl: string;
  images?: { imageUrl: string }[];
}

export const EditProductModal = ({
  isEditProductOpen,
  setIsEditProductOpen,
  isUploading,
  setIsUploading,
  reFetch,
  productToEdit,
  saleInfo,
}: {
  isEditProductOpen: boolean;
  setIsEditProductOpen: (open: boolean) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  reFetch: () => void;
  productToEdit: Product | any | null;
  saleInfo: any;
}) => {
  console.log("productToEdit", productToEdit);

  const [editedProduct, setEditedProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    description: "",
    discount: 0,
    stock: "",
    status: 0,
    imageUrls: [],
    isOnSale: "",
    saleTitle: saleInfo?.title ?? "",
    saleDescription: saleInfo?.description ?? "",
    startDate: saleInfo?.startDate ?? "",
    endDate: saleInfo?.endDate ?? "",
    bannerImageUrl: saleInfo?.bannerImageUrl ?? "",
  });

  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const MAX_SIZE_MB = 5;
  const REQUIRED_WIDTH = 1536;
  const REQUIRED_HEIGHT = 1024;

  console.log("editedProduct.isOnSale", editedProduct.isOnSale);
  useEffect(() => {
    if (productToEdit) {
      setEditedProduct({
        ...productToEdit,
        imageUrls:
          productToEdit.images?.map((img: any) => img.imageUrl) ||
          productToEdit.imageUrls ||
          [],
      });
      setImagesToRemove([]);
    }
  }, [productToEdit]);

  useEffect(() => {
    if (saleInfo) {
      setEditedProduct((prev) => ({
        ...prev,
        isOnSale: productToEdit.isOnSale,
        saleTitle: saleInfo.title || "",
        saleDescription: saleInfo.description || "",
        startDate: saleInfo.startDate ? saleInfo.startDate.split("T")[0] : "",
        endDate: saleInfo.endDate ? saleInfo.endDate.split("T")[0] : "",
        bannerImageUrl: saleInfo.bannerImageUrl || "",
      }));
    } else if (productToEdit && !productToEdit.isOnSale) {
      // Only reset sale fields if the product wasn't already on sale
      setEditedProduct((prev) => ({
        ...prev,
        isOnSale: 0,
        saleTitle: "",
        saleDescription: "",
        startDate: "",
        endDate: "",
        bannerImageUrl: "",
      }));
    }
  }, [saleInfo, productToEdit]);

  console.log("saleInfo", saleInfo);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
          toast.error(`${file.name} must be smaller than ${MAX_SIZE_MB}MB`);
          continue;
        }

        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: REQUIRED_WIDTH,
            useWebWorker: true,
          });

          const path = `products/product-${Date.now()}.${compressedFile.name
            .split(".")
            .pop()}`;
          const downloadURL = await uploadImageToFirebase(compressedFile, path);
          uploadedUrls.push(downloadURL);
        } catch (error) {
          console.error(`Failed to upload ${file.name}`, error);
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      if (uploadedUrls.length) {
        setEditedProduct((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...uploadedUrls],
        }));
        toast.success("Images uploaded successfully");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleBannerImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: REQUIRED_WIDTH,
        useWebWorker: true,
      });

      const path = `products/banner-${Date.now()}.${compressedFile.name
        .split(".")
        .pop()}`;
      const downloadURL = await uploadImageToFirebase(compressedFile, path);
      setEditedProduct((prev) => ({
        ...prev,
        bannerImageUrl: downloadURL,
      }));

      toast.success("Banner image uploaded successfully");
    } catch (error) {
      console.error("Error uploading banner image:", error);
      toast.error("Failed to upload banner image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (index: number, url: any) => {
    const imageToRemove = editedProduct.imageUrls[index];
    setImagesToRemove((prev) => [...prev, imageToRemove]);
    setEditedProduct((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));

    try {
      const result = await deleteImageFromFirebase(url);
      if (result) {
        toast.success("Image successfully deleted.");
      } else {
        toast.error("Failed to delete image. Try again.");
      }
    } catch (error) {
      toast.error("Failed to delete image. Try again.");
    }
  };

  const handleEditProduct = async () => {
    const lcData = localStorage.getItem("user");
    const user = lcData && JSON.parse(lcData);

    if (
      !editedProduct?.name ||
      !editedProduct?.price ||
      editedProduct?.imageUrls?.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const existingImageUrls =
      productToEdit && productToEdit!.images.map((img: any) => img.imageUrl);

    const newImages = editedProduct.imageUrls
      .filter((url) => !existingImageUrls!.includes(url))
      .map((url) => ({ imageUrl: url }));

    try {
      const response = await PATCH(
        `/product/${editedProduct.id}?uuid=${user?.uuid}`,
        {
          name: editedProduct.name,
          price: editedProduct.price,
          description: editedProduct.description,
          discount: editedProduct.discount,
          stock: editedProduct.stock,
          status: editedProduct.status,
          isOnSale: editedProduct.isOnSale,
          saleTitle: editedProduct.saleTitle,
          saleDescription: editedProduct.saleDescription,
          startDate: editedProduct.startDate,
          endDate: editedProduct.endDate,
          images: newImages,
          imagesToRemove,
        }
      );
      productToEdit;
      if (response?.status === 200) {
        reFetch();
        setIsEditProductOpen(false);
        toast.success("Product updated successfully!");
      } else {
        console.error("Product update failed:", response?.data);
        toast.error("Failed to update product");
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      } else {
        toast.error("Error updating product");
      }
    }
  };

  return (
    <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
      <DialogContent className="sm:max-w-[95vw] lg:max-w-[925px] max-h-[90vh] overflow-y-auto w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base text-gray-600 mb-4">
            Update the product details below. All fields are required unless
            marked optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Section 1: Basic Information */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-medium text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  className="w-full text-sm sm:text-base"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                    ₨
                  </span>
                  <Input
                    id="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder=""
                    className="w-full pl-8 text-sm sm:text-base"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <Label
                  htmlFor="stock"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Stock Quantity
                </Label>
                <Input
                  id="stock"
                  value={editedProduct.stock || ""}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      stock: e.target.value,
                    })
                  }
                  placeholder="Enter stock quantity"
                  type="number"
                  min="0"
                  className="w-full text-sm sm:text-base"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Status <span className="text-red-500">*</span>
                </Label>
                <select
                  id="status"
                  value={editedProduct.status ?? "0"}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      status: parseInt(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Description */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-medium text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
              Description
            </h3>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium text-sm sm:text-base"
              >
                Product Description
              </Label>
              <Textarea
                id="description"
                value={editedProduct.description || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
                placeholder="Enter detailed product description"
                className="min-h-[120px] text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Section 3: Discount & Images */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-medium text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
              Media & Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Discount */}
              <div className="space-y-2">
                <Label
                  htmlFor="discount"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Discount (optional)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    %
                  </span>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="0"
                    value={editedProduct.discount || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        discount: Number(e.target.value),
                      })
                    }
                    className="w-full pl-8 text-sm sm:text-base"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label
                  htmlFor="imageUpload"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Product Images <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-3 sm:p-4">
                  <input
                    id="imageUpload"
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e)}
                    className="w-full text-xs sm:text-sm text-gray-500
                          file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                          file:rounded-md file:border-0
                          file:text-xs sm:file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                    Upload high-quality product images (max 5MB each)
                  </p>
                  {editedProduct?.imageUrls?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {editedProduct.imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, url)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Sale Settings */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
              <h3 className="font-medium text-base sm:text-lg text-gray-700">
                Sale Settings
              </h3>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="isOnSale"
                  className="text-gray-700 font-medium text-sm sm:text-base"
                >
                  Enable Sale
                </Label>
                <select
                  id="isOnSale"
                  value={editedProduct.isOnSale ? "1" : "0"}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      isOnSale: parseInt(e.target.value, 10),
                    })
                  }
                  className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            {editedProduct.isOnSale && (
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Sale Title */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="saleTitle"
                      className="text-gray-700 font-medium text-sm sm:text-base"
                    >
                      Sale Title
                    </Label>
                    <Input
                      id="saleTitle"
                      value={editedProduct.saleTitle || ""}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          saleTitle: e.target.value,
                        })
                      }
                      placeholder="e.g., Summer Sale"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>

                  {/* Banner Image */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="bannerImage"
                      className="text-gray-700 font-medium text-sm sm:text-base"
                    >
                      Banner Image
                    </Label>
                    <input
                      id="bannerImage"
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={(e) => handleBannerImageUpload(e)}
                      className="w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                    {editedProduct.bannerImageUrl && (
                      <div className="mt-2">
                        <img
                          src={editedProduct.bannerImageUrl}
                          alt="Banner preview"
                          className="h-24 w-full object-contain rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sale Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="saleDescription"
                    className="text-gray-700 font-medium text-sm sm:text-base"
                  >
                    Sale Description
                  </Label>
                  <Textarea
                    id="saleDescription"
                    value={editedProduct.saleDescription || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        saleDescription: e.target.value,
                      })
                    }
                    placeholder="Describe the sale promotion"
                    className="min-h-[80px] text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="startDate"
                      className="text-gray-700 font-medium text-sm sm:text-base"
                    >
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={editedProduct.startDate}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full text-sm sm:text-base"
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="text-gray-700 font-medium text-sm sm:text-base"
                    >
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={editedProduct.endDate}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-b-lg border-t">
          <button
            type="button"
            onClick={() => setIsEditProductOpen(false)}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base text-gray-700 font-medium bg-white border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleEditProduct}
            disabled={
              isUploading ||
              !editedProduct.name ||
              !editedProduct.price ||
              editedProduct.imageUrls.length === 0
            }
            className={`px-4 sm:px-6 py-1 sm:py-2 rounded-md text-sm sm:text-base text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 sm:mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
