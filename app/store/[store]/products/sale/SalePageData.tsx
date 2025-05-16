import { GET } from "@/app/utils/Axios";
import StoreLayout from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";
import { Loader2, ShoppingCart } from "lucide-react";
import { POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { useCart } from "@/context/cart-context";
import { useParams } from "next/navigation";

export const SalesPageData = () => {
  const params = useParams();
  const storeId = params.store;

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
      const endpoint = `sale-product?id=${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
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
      const payload = {
        userId: storeId,
        productId: product.id,
        quantity: 1,
      };

      const response = await POST("/cart/add", payload);

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
    <StoreLayout>
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
          <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Active Sales at This Time
            </h3>

            <p className="text-gray-600 mb-6">
              Our store is currently between promotions, but exciting offers are
              coming soon!
            </p>

            {/* <div className="space-y-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Notify Me About Future Sales
              </button>

              <p className="text-sm text-gray-500">
                Follow us on social media for exclusive previews:
                <div className="flex justify-center space-x-4 mt-2">
                  <a href="#" className="text-gray-500 hover:text-blue-500">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-pink-500">
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </p>
            </div> */}
          </div>
        )}
      </div>
    </StoreLayout>
  );
};
