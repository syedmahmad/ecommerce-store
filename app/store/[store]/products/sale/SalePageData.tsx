import { GET } from "@/app/utils/Axios";
import { StoreLayout } from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";
import { Loader2, ShoppingCart } from "lucide-react";
import { POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { useCart } from "@/context/cart-context";

export const SalesPageData = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState("Store");

  useEffect(() => {
    const lcData = localStorage.getItem("user");
    const user = lcData && JSON.parse(lcData);
    if (user?.id) {
      setUserId(user.id);
      setStoreName(user.name);
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sale-product"],
    queryFn: async () => {
      const endpoint = `sale-product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const saleData = data?.data;

  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { currentTheme, storePreviewTheme } = useTheme();

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  const handleAddToCart = async (product: any) => {
    if (product.stock <= 0) {
      toast.error("Sorry, this product is currently out of stock.");
      return;
    }

    setIsAdding(true);

    try {
      const lcData = localStorage.getItem("user");
      const parsedLCData = lcData && JSON.parse(lcData);
      const currentUser = parsedLCData;

      const userId = currentUser?.id;
      if (!userId) throw new Error("User not authenticated");

      const payload = {
        userId,
        productId: product.id,
        quantity: 1,
      };

      const response = await POST("/cart/add", payload);
      console.log("response", response);

      if (!response || response.status !== 201) {
        throw new Error("Failed to add item to cart");
      }

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images,
        quantity: 1,
        discount: product.discount,
        inventory: product.stock,
      });

      toast.success("Item Added To The Cart !");
    } catch (error: any) {
      toast.error(
        "An error occurred while adding the item to the cart. Try Again"
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <StoreLayout storeName={storeName}>
      <div className="p-6">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Failed to load sale data.
          </div>
        ) : saleData?.products?.length ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {saleData.campaigns[0]?.title || "Ongoing Sale"}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {saleData.products.map((product: any) => {
                const isOutOfStock = product.stock <= 0;

                return (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex flex-col justify-between"
                  >
                    <img
                      src={product.images[0]?.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">
                            ${product.price}
                          </span>
                          {product.isOnSale && (
                            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Stock: {product.stock}
                        </p>
                      </div>

                      <Button
                        className="w-full mt-4"
                        size="lg"
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding || isOutOfStock}
                        style={{
                          backgroundColor: isOutOfStock
                            ? "#d1d5db"
                            : theme.primary,
                          color: "#ffffff",
                        }}
                      >
                        {isAdding ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Adding to Cart...
                          </>
                        ) : isOutOfStock ? (
                          "Out of Stock"
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            There is no sale now. Please check back later!
          </div>
        )}
      </div>
    </StoreLayout>
  );
};
