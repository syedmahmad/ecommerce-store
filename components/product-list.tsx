"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DELETE, GET } from "@/app/utils/Axios";
import { toast } from "react-toastify";
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
      const endpoint = `product/admin?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  console.log("getAllProducts", getAllProducts?.data?.data);

  const productsData = getAllProducts?.data?.data;
  const isOnSale = productsData && productsData?.isOnSale;

  console.log("isOnSale", isOnSale);
  console.log("productsData", productsData);
  const saleData = getAllProducts?.data?.data?.salesInfo;

  console.log("saleData......", saleData);

  const [products, setProducts] = useState<any[]>([]);
  const [saleInfo, setSaleInfo] = useState<any[]>([]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
    if (!isOnSale && saleData) {
      setSaleInfo(saleData);
    }
  }, [productsData, saleData, isOnSale]);

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // When you want to edit a product:
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

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
      {isEditProductOpen && (
        <EditProductModal
          isEditProductOpen={isEditProductOpen}
          setIsEditProductOpen={setIsEditProductOpen}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          reFetch={reFetch}
          productToEdit={selectedProduct}
          saleInfo={isOnSale ? [] : saleInfo}
        />
      )}
    </div>
  );
};
