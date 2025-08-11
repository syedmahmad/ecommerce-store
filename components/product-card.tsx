"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useTheme } from "@/context/theme-context";
import { Loader2 } from "lucide-react";
import { POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";

export function ProductCard({ product, storeInfoFromBE }: any) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { currentTheme, storePreviewTheme } = useTheme();

  const domain = storeInfoFromBE?.subdomain;

  const storeSubdomain = domain && domain.split(".")[0];

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  // Find the current quantity of this product in the cart
  const cartItem = items.find((item: any) => item.id === product.id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;

  // Disable if out of stock OR if cart quantity >= stock
  const isDisabled = product.stock <= 0 || currentCartQuantity >= product.stock;

  const handleAddToCart = async (product: any) => {
    if (isDisabled) {
      if (isDisabled) {
        toast.error(
          currentCartQuantity >= product.stock
            ? "You've already added the maximum available quantity to your cart."
            : "Sorry, this product is currently out of stock."
        );
        return;
      }
    }

    if (product.stock <= 0) {
      toast.error("Sorry, this product is currently out of stock.");
      return;
    }

    setIsAdding(true);

    try {
      // Step 1: Get or create guestId
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = crypto.randomUUID(); // Safe for modern browsers
        localStorage.setItem("guestId", guestId);
      }

      // Step 2: Prepare payload
      const payload = {
        guestId,
        productId: product.id,
        quantity: 1,
      };

      // Step 3: Send request to backend
      const response = await POST("/cart/add", payload);
      console.log("response", response);

      if (!response || (response.status !== 200 && response.status !== 201)) {
        throw new Error("Failed to add item to cart");
      }

      // Step 4: Update local cart UI
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.imageUrl ?? "",
        quantity: 1,
        discount: product.discount,
        inventory: product.stock,
      });
    } catch (error: any) {
      toast.error(
        "An error occurred while adding the item to the cart. Try again."
      );

      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          "Unauthorized access. Try reloading the page or log in again.",
          { autoClose: false }
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);

  const isOutOfStock = product.stock <= 0;
  const lowStock =
    product.inventory !== undefined &&
    product.inventory <= 5 &&
    product.inventory > 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* <Link
        href={`/store/${storeInfoFromBE?.id}/product/${product.id}`} */}
      <Link
        href={getStoreUrl(storeSubdomain, { path: `product/${product.id}` })}
      >
        className="relative block"
        <div className="relative">
          <Image
            src={product?.images[0]?.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className={`w-full object-cover aspect-square transition-transform hover:scale-105 ${
              isOutOfStock ? "opacity-70" : ""
            }`}
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Badge
                className="bg-gray-800 text-white px-3 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              >
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/store/${storeInfoFromBE?.id}/product/${product.id}`}>
          <h3 className="font-medium text-lg hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mt-2">
          {product.discount > 0 ? (
            <>
              <span className="font-bold">
                {new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                }).format(discountedPrice)}

                {discountedPrice}
              </span>
              <span className="text-gray-500 line-through ml-2 text-sm">
                {/* ${product.price.toFixed(2)} */}

                {new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                }).format(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold">
              {new Intl.NumberFormat("en-PK", {
                style: "currency",
                currency: "PKR",
              }).format(product.price)}
            </span>
          )}
        </div>
        {!isOutOfStock && (
          <p
            className={`text-xs mt-1 ${
              lowStock ? "text-amber-600 font-medium" : "text-green-600"
            }`}
          >
            {lowStock
              ? `Only ${product.inventory} left!`
              : `In stock: ${product.stock}`}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => handleAddToCart(product)}
          disabled={isAdding || isDisabled}
          style={{
            backgroundColor: isDisabled ? "#d1d5db" : theme.primary,
            color: "#ffffff",
          }}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isDisabled ? (
            currentCartQuantity >= product.stock ? (
              "Max Quantity Added"
            ) : (
              "Out of Stock"
            )
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function getStoreUrl(
  subdomain: string,
  options?: {
    path?: string;
    absolute?: boolean;
  }
) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://${subdomain}.localhost:3001`
      : `https://${subdomain}.zylospace.com`;

  // For absolute URLs (when needed for external use)
  if (options?.absolute) {
    return options.path
      ? `${baseUrl}/${options.path.replace(/^\//, "")}`
      : baseUrl;
  }

  // For relative URLs (used in Next.js navigation)
  return options?.path ? `/${options.path.replace(/^\//, "")}` : "/";
}
