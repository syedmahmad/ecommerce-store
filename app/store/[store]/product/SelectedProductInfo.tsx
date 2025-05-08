"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CartButton } from "@/components/cart-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";

import {
  Loader2,
  ShoppingBag,
  ShoppingCart,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { useQuery } from "@tanstack/react-query";
import { GET, POST } from "@/app/utils/Axios";
import { useParams } from "next/navigation";

export default function SingleProduct() {
  // const { toast } = useToast();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { currentTheme, storePreviewTheme } = useTheme();
  const storeInfo = useParams();

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  // In a real app, you would fetch product data based on the ID
  const storeName: any = storeInfo.store || "demo-store";
  const productId: any = storeInfo?.id || 1;

  const getSingleProductData = useQuery({
    queryKey: ["get-single-product"],
    queryFn: async () => {
      const endpoint = `product/${productId}`;
      return await GET(endpoint);
    },
    enabled: !!productId,
  });

  const productsData = getSingleProductData?.data?.data;

  const discountedPrice =
    productsData && productsData?.discount > 0
      ? (productsData.price * (1 - productsData.discount / 100)).toFixed(2)
      : productsData?.price.toFixed(2);

  const isOutOfStock = productsData && productsData?.stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) {
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
        productId: productsData.id,
        quantity: 1,
      };

      const response = await POST("/cart/add", payload);
      console.log("response", response);

      if (!response || response.status !== 201) {
        throw new Error("Failed to add item to cart");
      }

      addItem({
        id: productsData.id,
        name: productsData.name,
        price: productsData.price,
        image: productsData.images,
        quantity: 1,
        discount: productsData.discount,
        inventory: productsData.stock,
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
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/store/${storeName}`}
            className="flex items-center space-x-2"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl capitalize">
              {storeName.replace(/-/g, " ")}
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={`/store/${storeName}`}
              className="text-sm font-medium hover:text-gray-600"
            >
              Home
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <CartButton storeName={storeName} />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={productsData?.images[0]?.imageUrl || "/placeholder.svg"}
                  alt={productsData?.name}
                  fill
                  className="object-cover"
                />
                {/* TODO: I'll add discount */}
                {/* {productsData.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )} */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge
                      className="bg-gray-800 text-white px-3 py-1.5 text-sm font-semibold"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    >
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {productsData &&
                  productsData?.images?.map((image: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="aspect-square rounded-md overflow-hidden border cursor-pointer"
                      >
                        <Image
                          src={image.imageUrl || "/placeholder.svg"}
                          alt={`${productsData?.name} - Image ${index + 1}`}
                          width={150}
                          height={150}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold">{productsData?.name}</h1>
              {/* <div className="flex items-center mt-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.reviews} reviews
                </span>
              </div> */}
              <div className="flex items-center mt-4 mb-6">
                {productsData && productsData?.discount > 0 ? (
                  <>
                    <span className="text-3xl font-bold">
                      ${discountedPrice}
                    </span>
                    <span className="text-gray-500 line-through ml-3 text-xl">
                      ${productsData.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">
                    ${productsData?.price.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-6">{productsData?.description}</p>

              {/* Inventory Status */}
              <div className="mb-4">
                {isOutOfStock ? (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Out of Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                    <span>In Stock: {productsData?.stock} available</span>
                  </div>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-6">
                <Truck className="h-5 w-5 mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              {/* <div className="mb-6">
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div> */}
              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-24">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value))
                    }
                    disabled={isOutOfStock}
                  >
                    {isOutOfStock ? (
                      <option value={0}>0</option>
                    ) : (
                      Array.from(
                        { length: Math.min(10, productsData?.stock || 0) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )
                    )}
                  </select>
                </div>
                <div className="flex-1">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAdding || isOutOfStock}
                    style={{
                      backgroundColor: isOutOfStock ? "#d1d5db" : theme.primary,
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
            </div>
          </div>
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                {/* <TabsTrigger value="specifications">Specifications</TabsTrigger> */}
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="prose max-w-none">
                  <p>{productsData?.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex border-b pb-2">
                        <span className="font-medium w-1/3">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    )
                  )} */}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  <div className="border rounded-lg p-6">
                    <p className="text-gray-500 italic">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 capitalize">
                {storeName.replace(/-/g, " ")}
              </h3>
              <p className="text-gray-600">
                Quality products for every need. Shop with confidence on our
                secure platform.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/store/${storeName}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${storeName}/products`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${storeName}/about`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${storeName}/contact`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <address className="not-italic text-gray-600">
                <p>123 Store Street</p>
                <p>City, State 12345</p>
                <p className="mt-2">Email: info@{storeName}.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} {storeName.replace(/-/g, " ")}. All
              rights reserved.
            </p>
            <p className="mt-1">Powered by StoreBuilder</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
