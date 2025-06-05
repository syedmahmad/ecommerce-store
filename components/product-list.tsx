"use client";
import { useEffect, useState } from "react";

import imageCompression from "browser-image-compression";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { DELETE, GET, PATCH, POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { uploadImageToFirebase } from "@/app/utils/ImageUploader";
import { AddProductHeader } from "./ui/addproductheader";
import { AddNewProductModal } from "./ui/addproductmodal";
import { EditProductModal } from "./ui/editproductmodal";

export const ProductList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData ? JSON.parse(lcData) : null;
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, []);

  const queryClient = useQueryClient();
  const reFetch = () => {
    queryClient.invalidateQueries({ queryKey: ["get-product"] });
  };

  const getAllProducts = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const productsData = getAllProducts?.data?.data;

  const [products, setProducts] = useState<any[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  // const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const MAX_SIZE_MB = 5;
  const REQUIRED_WIDTH = 1536;
  const REQUIRED_HEIGHT = 1024;

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  // const handleImageUpload = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   isEdit = false
  // ) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   setIsUploading(true);
  //   const uploadedUrls: string[] = [];

  //   try {
  //     for (const file of Array.from(files)) {
  //       if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
  //         toast.error(`${file.name} must be smaller than ${MAX_SIZE_MB}MB`);
  //         continue;
  //       }

  //       try {
  //         const compressedFile = await imageCompression(file, {
  //           maxSizeMB: 1,
  //           maxWidthOrHeight: REQUIRED_WIDTH,
  //           useWebWorker: true,
  //         });

  //         const path = `products/product-${Date.now()}.${compressedFile.name
  //           .split(".")
  //           .pop()}`;
  //         const downloadURL = await uploadImageToFirebase(compressedFile, path);
  //         uploadedUrls.push(downloadURL);
  //       } catch (error) {
  //         console.error(`Failed to upload ${file.name}`, error);
  //         toast.error(`Failed to upload ${file.name}`);
  //       }
  //     }

  //     if (uploadedUrls.length) {
  //       if (isEdit) {
  //         setCurrentProduct((prev: any) => ({
  //           ...prev,
  //           images: [
  //             ...(prev.images || []),
  //             ...uploadedUrls.map((url) => ({ imageUrl: url })),
  //           ],
  //         }));
  //       } else {
  //         setNewProduct((prev) => ({
  //           ...prev,
  //           imageUrls: [...prev.imageUrls, ...uploadedUrls],
  //         }));
  //       }
  //       toast.success("Images uploaded successfully");
  //     }
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleBannerImageUpload = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   isEdit = false
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setIsUploading(true);

  //   try {
  //     const compressedFile = await imageCompression(file, {
  //       maxSizeMB: 1,
  //       maxWidthOrHeight: REQUIRED_WIDTH,
  //       useWebWorker: true,
  //     });

  //     const path = `products/banner-${Date.now()}.${compressedFile.name
  //       .split(".")
  //       .pop()}`;
  //     const downloadURL = await uploadImageToFirebase(compressedFile, path);

  //     if (isEdit) {
  //       setCurrentProduct((prev: any) => ({
  //         ...prev,
  //         saleBannerImage: downloadURL,
  //       }));
  //     } else {
  //       setNewProduct((prev) => ({
  //         ...prev,
  //         bannerImageUrl: downloadURL,
  //       }));
  //     }
  //     toast.success("Banner image uploaded successfully");
  //   } catch (error) {
  //     console.error("Error uploading banner image:", error);
  //     toast.error("Failed to upload banner image");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleAddProduct = async () => {
  //   const lcData = localStorage.getItem("user");
  //   const user = lcData && JSON.parse(lcData);

  //   if (
  //     !newProduct.name ||
  //     !newProduct.price ||
  //     newProduct.imageUrls.length === 0
  //   ) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   try {
  //     const response = await POST(`/product?id=${user.id}`, {
  //       ...newProduct,
  //       images: newProduct.imageUrls.map((url) => ({ imageUrl: url })),
  //     });

  //     if (response?.status === 201 || response?.status === 200) {
  //       reFetch();
  //       setNewProduct({
  //         name: "",
  //         price: 0,
  //         description: "",
  //         discount: 0,
  //         status: 0,
  //         imageUrls: [],
  //         stock: "",
  //         isOnSale: 0,
  //         saleTitle: "",
  //         saleDescription: "",
  //         startDate: "",
  //         endDate: "",
  //         bannerImageUrl: "",
  //       });
  //       setIsAddProductOpen(false);
  //       toast.success("Product added successfully!");
  //     } else {
  //       console.error("Product creation failed:", response?.data);
  //       toast.error("Failed to add product");
  //     }
  //   } catch (error: any) {
  //     console.error("Error adding product:", error);
  //     if (error?.response?.data?.message === "Unauthorized") {
  //       toast.warn(
  //         `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
  //         {
  //           autoClose: false,
  //         }
  //       );
  //     } else {
  //       toast.error("Error adding product");
  //     }
  //   }
  // };

  const handleEditProduct = (product: any) => {
    // setCurrentProduct({
    //   ...product,
    //   isOnSale: product.isOnSale || 0,
    //   saleTitle: product.saleTitle || "",
    //   saleDescription: product.saleDescription || "",
    //   startDate: product.startDate || "",
    //   endDate: product.endDate || "",
    //   saleBannerImage: product.saleBannerImage || "",
    //   status: product.status || 0,
    //   discount: product.discount || 0,
    //   stock: product.stock || "",
    //   images: product.images || [],
    // });
    setIsEditProductOpen(true);
  };

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // When you want to edit a product:
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  // const saveEditedProduct = async () => {
  //   if (!currentProduct || !currentProduct.id) return;

  //   const lcData = localStorage.getItem("user");
  //   const user = lcData && JSON.parse(lcData);

  //   try {
  //     const response = await PATCH(
  //       `/product/${currentProduct.id}?uuid=${user?.uuid}`,
  //       {
  //         name: currentProduct.name,
  //         price: currentProduct.price,
  //         description: currentProduct.description,
  //         discount: currentProduct.discount,
  //         stock: currentProduct.stock,
  //         status: currentProduct.status,
  //         isOnSale: currentProduct.isOnSale,
  //         saleTitle: currentProduct.saleTitle,
  //         saleDescription: currentProduct.saleDescription,
  //         startDate: currentProduct.startDate,
  //         endDate: currentProduct.endDate,
  //         bannerImageUrl: currentProduct.saleBannerImage,
  //         images: currentProduct.images,
  //       }
  //     );

  //     if (response?.data) {
  //       toast.success("Product updated successfully!");
  //       reFetch();
  //       setIsEditProductOpen(false);
  //     } else {
  //       toast.error("Failed to update product");
  //     }
  //   } catch (error: any) {
  //     console.error("Error updating product:", error);
  //     if (error?.response?.data?.message === "Unauthorized") {
  //       toast.warn(
  //         `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
  //         {
  //           autoClose: false,
  //         }
  //       );
  //     } else {
  //       toast.error("Error updating product");
  //     }
  //   }
  // };

  // #region to delete product
  const handleDeleteProduct = async (productId: number) => {
    try {
      const user = localStorage.getItem("user");
      const parseUser = user && JSON.parse(user);
      await DELETE(`/product/${productId}?uuid=${parseUser?.uuid}`);
      reFetch();
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  // #endregion

  // TODO: Not fully completed
  // const removeImage = (index: number, isEdit = false) => {
  //   if (isEdit) {
  //     setCurrentProduct((prev: any) => {
  //       const newImages = [...prev.images];
  //       newImages.splice(index, 1);
  //       return { ...prev, images: newImages };
  //     });
  //   } else {
  //     setNewProduct((prev) => {
  //       const newImages = [...prev.imageUrls];
  //       newImages.splice(index, 1);
  //       return { ...prev, imageUrls: newImages };
  //     });
  //   }
  // };

  return (
    <div className="space-y-4">
      <AddProductHeader
        products={products}
        setIsAddProductOpen={setIsAddProductOpen}
        handleEditProduct={handleEditClick}
        handleDeleteProduct={handleDeleteProduct}
      />

      <AddNewProductModal
        isAddProductOpen={isAddProductOpen}
        setIsAddProductOpen={setIsAddProductOpen}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        reFetch={reFetch}
      />

      {/* Edit Product Dialog */}
      <EditProductModal
        isEditProductOpen={isEditProductOpen}
        setIsEditProductOpen={setIsEditProductOpen}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        reFetch={reFetch}
        productToEdit={selectedProduct}
      />
    </div>
  );
};
