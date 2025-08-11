"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CartButton } from "@/components/cart-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import {
  Loader2,
  ShoppingBag,
  ShoppingCart,
  Truck,
  AlertTriangle,
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { useQuery } from "@tanstack/react-query";
import { GET, POST } from "@/app/utils/Axios";
import { useParams } from "next/navigation";
import clsx from "clsx";

interface ProductImage {
  imageUrl: string;
}

interface ProductReview {
  id: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  user: {
    name: string;
  };
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  sku?: string;
  category?: {
    name: string;
  };
  images: ProductImage[];
  reviews?: ProductReview[];
  averageRating?: number;
  specifications?: Record<string, string>;
}

export default function SingleProduct() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { addItem, items } = useCart();
  const { currentTheme, storePreviewTheme } = useTheme();
  const params = useParams();
  const storeId = params.store as string;
  const productId = params.id as string;
  const pathname = usePathname();

  const theme = storePreviewTheme || currentTheme;

  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;
  const storeName = storeInfoFromBE?.name;
  const storeIdFromBE = storeInfoFromBE?.id;

  const location = storeInfoFromBE && storeInfoFromBE.location;

  const getSingleProductData = useQuery({
    queryKey: ["get-single-product"],
    queryFn: async () => {
      const endpoint = `product/${productId}`;
      return await GET(endpoint);
    },
    enabled: !!productId,
  });

  const productsData: ProductData = getSingleProductData?.data?.data;

  // Set initial selected image when product data loads
  useEffect(() => {
    if (productsData?.images?.length > 0) {
      setSelectedImage(productsData.images[0].imageUrl);
    }
  }, [productsData]);

  const discountedPrice =
    productsData && productsData?.discount > 0
      ? (productsData.price * (1 - productsData.discount / 100)).toFixed(2)
      : productsData?.price.toFixed(2);

  const isOutOfStock = productsData && productsData?.stock <= 0;

  // Find the current quantity of this product in the cart
  const cartItem = items.find((item: any) => item.id === productsData?.id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;

  // Disable if out of stock OR if cart quantity >= stock
  const isDisabled =
    productsData?.stock <= 0 || currentCartQuantity >= productsData?.stock;

  const handleAddToCart = async () => {
    if (isDisabled) {
      if (isDisabled) {
        toast.error(
          currentCartQuantity >= productsData?.stock
            ? "You've already added the maximum available quantity to your cart."
            : "Sorry, this product is currently out of stock."
        );
        return;
      }
    }

    if (isOutOfStock) {
      toast.error("Sorry, this product is currently out of stock.");
      return;
    }

    setIsAdding(true);

    try {
      // 1. Get or generate guestId
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = crypto.randomUUID(); // Generate a UUID for the guest
        localStorage.setItem("guestId", guestId);
      }

      // 2. Construct payload
      const payload = {
        guestId,
        productId: productsData.id,
        quantity,
      };

      // 3. Send request
      const response = await POST("/cart/add", payload);

      if (!response || (response.status !== 200 && response.status !== 201)) {
        throw new Error("Failed to add item to cart");
      }

      // 4. Update cart state locally (optional optimization)
      addItem({
        id: Number(productsData.id),
        name: productsData.name,
        price: productsData.price,
        image: productsData.images[0]?.imageUrl,
        quantity,
        discount: productsData.discount,
        inventory: productsData.stock,
      });

      toast.success("Item added to cart!");
    } catch (error: any) {
      toast.error(
        "An error occurred while adding the item to the cart. Try again."
      );

      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `Unauthorized access. Try reloading the page or log in again.`,
          { autoClose: false }
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  const categories = [
    { name: "Home", path: `/store/${storeId}` },
    { name: "Sale", path: `/store/${storeId}/products/sale` },
    { name: "Contact Us", path: `/store/${storeId}/contact` },
  ];

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const isButtonDisabled = isAdding || isOutOfStock || isDisabled;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header remains the same... */}
      <header
        className={`relative z-10 border-b transition-all duration-500 ease-in-out ${
          showHeader
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
        style={{
          boxShadow: `0 2px 10px ${hexToRgba(theme.primary, 0.12)}`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo section */}
            <Link
              href={`/store/${storeIdFromBE}`}
              className="flex items-center min-w-0 hover:scale-[1.02] transition-transform duration-200"
            >
              {storeInfoFromBE?.logoUrl === null ||
              storeInfoFromBE?.logoUrl === undefined ? (
                <ShoppingBag
                  className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 transition-colors duration-300 hover:scale-110"
                  style={{ color: theme.primary }}
                />
              ) : (
                <div className="relative group flex-shrink-0">
                  <img
                    src={storeInfoFromBE?.logoUrl}
                    alt="Store Logo"
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain rounded-md border border-gray-200 shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:shadow-md"
                    style={{ backgroundColor: theme?.primary }}
                  />
                  <span className="absolute inset-0 bg-primary opacity-0 rounded-md group-hover:opacity-10 transition-opacity duration-300"></span>
                </div>
              )}
              <div className="flex flex-col ml-2 sm:ml-3 min-w-0 overflow-hidden">
                <span
                  className={`text-sm sm:text-lg md:text-xl font-semibold truncate transition-colors duration-200 ${
                    pathname === `/store/${storeInfoFromBE?.id}`
                      ? "text-primary"
                      : "text-gray-900"
                  }`}
                  style={{
                    color:
                      pathname === `/store/${storeIdFromBE}`
                        ? theme.primary
                        : undefined,
                    opacity: pathname === `/store/${storeIdFromBE}` ? 1 : 0.9,
                  }}
                >
                  {storeName}
                </span>
                <span className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-700 truncate hidden xs:block">
                  {storeInfoFromBE?.description}
                </span>
              </div>
            </Link>

            {/* Centered Navigation */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`relative text-sm font-medium transition-all duration-200 hover:text-primary ${
                    pathname === category.path
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                  style={{
                    color:
                      pathname === category.path ? theme.primary : undefined,
                  }}
                >
                  {category.name}
                  {pathname === category.path && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                  )}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"
                    style={{ backgroundColor: theme.primary }}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <CartButton storeInfoFromBE={storeInfoFromBE} />

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden transition-all duration-300 hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  color: theme.primary,
                }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 animate-spin-in" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen
                ? "max-h-96 py-4 opacity-100"
                : "max-h-0 py-0 opacity-0"
            }`}
            style={{ borderColor: hexToRgba(theme.primary, 0.2) }}
          >
            <div className="flex mb-4"></div>
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition-all duration-200 hover:bg-primary/10 hover:pl-3 ${
                    pathname === category.path
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                  style={{
                    color:
                      pathname === category.path ? theme.primary : undefined,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                  {pathname === category.path && (
                    <span
                      className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images Section */}
            <div className="md:w-1/2 relative group">
              {/* Shadow and rounded container */}
              <div
                className="relative aspect-square overflow-hidden rounded-xl mb-4 border shadow-lg"
                style={{
                  borderColor: theme.secondary,
                  boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px ${theme.primary}20`,
                }}
              >
                {/* Main Image */}
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={productsData?.name || "product image"}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />

                {/* Discount Badge */}
                {productsData?.discount > 0 && (
                  <div
                    className="absolute top-4 right-4 text-white text-sm font-bold px-3 py-1 rounded-full z-10"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {productsData.discount}% OFF
                  </div>
                )}

                {/* Out of Stock Badge */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <Badge
                      className="px-4 py-2 text-base"
                      style={{ backgroundColor: theme.secondary }}
                    >
                      Out of Stock
                    </Badge>
                  </div>
                )}

                {/* Navigation Arrows */}
                {productsData?.images?.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = productsData.images.findIndex(
                          (img) => img.imageUrl === selectedImage
                        );
                        const prevIndex =
                          (currentIndex - 1 + productsData.images.length) %
                          productsData.images.length;
                        setSelectedImage(
                          productsData.images[prevIndex].imageUrl
                        );
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = productsData.images.findIndex(
                          (img) => img.imageUrl === selectedImage
                        );
                        const nextIndex =
                          (currentIndex + 1) % productsData.images.length;
                        setSelectedImage(
                          productsData.images[nextIndex].imageUrl
                        );
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery with improved styling */}
              <div className="grid grid-cols-4 gap-3 mt-6 px-2">
                {productsData?.images?.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 relative group/thumbnail ${
                      selectedImage === image.imageUrl
                        ? "ring-2 ring-offset-2"
                        : "hover:border-gray-300"
                    }`}
                    style={{
                      borderColor:
                        selectedImage === image.imageUrl
                          ? theme.primary
                          : "transparent",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => setSelectedImage(image.imageUrl)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={`${productsData?.name} - Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover w-full h-full hover:opacity-90 transition-opacity duration-200"
                    />
                    {/* Overlay effect on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover/thumbnail:bg-black/10 transition-all duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="md:w-1/2">
              <div className="mb-6">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  {productsData?.name}
                </h1>
                {/* <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>SKU: {productsData?.sku || "N/A"}</span>
                  <span className="mx-2">•</span>
                  <span>{productsData?.category?.name || "Uncategorized"}</span>
                </div> */}
              </div>

              {/* Price Section */}
              <div
                className="mb-6 p-4 rounded-lg"
                style={{ backgroundColor: theme.background }}
              >
                {productsData?.discount > 0 ? (
                  <div className="flex items-baseline">
                    <span
                      className="text-3xl font-bold mr-3"
                      style={{ color: theme.accent }}
                    >
                      ₨{discountedPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₨{productsData.price.toFixed(2)}
                    </span>
                    <span
                      className="ml-auto text-sm font-medium px-2 py-1 rounded"
                      style={{
                        backgroundColor: theme.accent,
                        color: "white",
                      }}
                    >
                      Save ₨
                      {(productsData.price - Number(discountedPrice)).toFixed(
                        2
                      )}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-3xl font-bold"
                    style={{ color: theme.text }}
                  >
                    ₨{productsData?.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.text }}
                >
                  Description
                </h3>
                <p className="text-gray-700" style={{ color: theme.text }}>
                  {productsData?.description}
                </p>
              </div>

              {/* Inventory Status */}
              <div
                className="mb-6 p-4 rounded-lg"
                style={{ backgroundColor: theme.background }}
              >
                {isOutOfStock ? (
                  <div className="flex items-center">
                    <AlertTriangle
                      className="h-5 w-5 mr-2"
                      style={{ color: theme.secondary }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: theme.secondary }}
                    >
                      Out of Stock
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                      <span style={{ color: theme.text }}>
                        In Stock:{" "}
                        <span className="font-medium">
                          {productsData?.stock} available
                        </span>
                      </span>
                    </div>
                    {productsData?.stock < 10 && (
                      <span className="text-sm" style={{ color: theme.text }}>
                        Only {productsData?.stock} left!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div
                className="flex items-center text-sm mb-6 p-3 rounded-lg"
                style={{ backgroundColor: theme.background }}
              >
                <Truck
                  className="h-5 w-5 mr-2"
                  style={{ color: theme.primary }}
                />
                <span style={{ color: theme.text }}>
                  {productsData?.price > 500 ? (
                    <>Free shipping available</>
                  ) : (
                    <>
                      Add ₨{(500 - productsData?.price).toFixed(2)} more for
                      free shipping
                    </>
                  )}
                </span>
              </div>

              {/* Add to Cart Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="w-full sm:w-32">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium"
                    style={{ color: theme.text }}
                  >
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-offset-2 transition-all"
                    style={{
                      borderColor: theme.secondary,
                      backgroundColor: theme.background,
                    }}
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
                    className={clsx(
                      "w-full h-12 rounded-lg font-medium transition-all",
                      isButtonDisabled
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:opacity-90"
                    )}
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    aria-busy={isAdding}
                    aria-disabled={isButtonDisabled}
                    style={{ marginTop: "20px" }}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Adding...
                      </>
                    ) : isOutOfStock ? (
                      "Out of Stock"
                    ) : isDisabled ? (
                      "Maximum quantity added"
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

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList
                className="w-full justify-start border-b"
                style={{ borderColor: theme.secondary }}
              >
                <TabsTrigger
                  value="details"
                  className="px-4 py-2 font-medium"
                  style={{
                    color: theme.text,
                  }}
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-4 py-2 font-medium"
                  style={{
                    color: theme.text,
                  }}
                >
                  Reviews ({productsData?.reviews?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <div className="prose max-w-none" style={{ color: theme.text }}>
                  <h3 style={{ color: theme.text }}>Detailed Description</h3>
                  <p>{productsData?.description}</p>

                  {productsData?.specifications && (
                    <>
                      <h3 style={{ color: theme.text }}>Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {Object.entries(productsData.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="flex border-b pb-2">
                              <span
                                className="font-medium w-1/3"
                                style={{ color: theme.text }}
                              >
                                {key}:
                              </span>
                              <span
                                className="text-gray-600"
                                style={{ color: theme.text }}
                              >
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3
                        className="text-lg font-medium"
                        style={{ color: theme.text }}
                      >
                        Customer Reviews
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < (productsData?.averageRating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span
                          className="ml-2 text-sm"
                          style={{ color: theme.text }}
                        >
                          ({productsData?.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    </div>
                    <Button
                      style={{
                        backgroundColor: theme.primary,
                        color: theme.text,
                      }}
                    >
                      Write a Review
                    </Button>
                  </div>

                  {/* {productsData && productsData?.reviews?.length > 0 ? (
                    <div className="space-y-4">
                      {productsData?.reviews.map((review: any) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-6"
                          style={{
                            borderColor: theme.secondary,
                            backgroundColor: theme.background,
                          }}
                        >
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-4">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span
                              className="font-medium"
                              style={{ color: theme.text }}
                            >
                              {review.user.name}
                            </span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4
                            className="font-medium mb-2"
                            style={{ color: theme.text }}
                          >
                            {review.title}
                          </h4>
                          <p style={{ color: theme.text }}>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : ( */}
                  <div
                    className="border rounded-lg p-6 text-center"
                    style={{
                      borderColor: theme.secondary,
                      backgroundColor: theme.background,
                    }}
                  >
                    <p
                      className="text-gray-500 italic"
                      style={{ color: theme.text }}
                    >
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                  {/* )} */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <StoreFooter
        storeName={storeName}
        location={location}
        storeInfoFromBE={storeInfoFromBE}
      />
      {/* Footer remains the same... */}
    </div>
  );
}

export const StoreFooter = ({ storeName, location, storeInfoFromBE }: any) => {
  const { currentTheme, storePreviewTheme } = useTheme();

  const theme = storePreviewTheme || currentTheme;

  return (
    <footer
      className="border-t bg-opacity-90 py-8 sm:py-12"
      style={{
        backgroundColor: theme.secondary,
        borderColor: `${theme.primary}20`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Us Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: theme.primary }}
                aria-label={`Logo for ${storeName ?? "store"}`}
              >
                {storeName?.charAt(0).toUpperCase() || "S"}
              </div>
              <span className="font-semibold text-xl">
                {storeName ?? "Store Name"}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              {storeInfoFromBE?.description}
            </p>
          </div>

          {/* Customer Service Section */}
          <div className="lg:pl-8">
            <h3
              className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
              style={{ color: theme.primary }}
            >
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { text: "Contact Us", href: "/contact" },
                { text: "FAQs", href: "/faqs" },
                { text: "Shipping Policy", href: "/" },
                { text: "Returns & Refunds", href: "/" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-current mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="lg:pl-8">
            <h3
              className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
              style={{ color: theme.primary }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Terms of Service", href: "/terms" },
                { text: "Our Blog", href: "/blog" },
                { text: "About Us", href: "/about" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-current mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="md:col-span-2 lg:col-span-1 lg:pl-8">
            <h3
              className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
              style={{ color: theme.primary }}
            >
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                </div>

                <div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    {location}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3 text-muted-foreground">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                </div>
                <div>
                  <a
                    href={`tel:+92${storeInfoFromBE?.contactNumber}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +92{storeInfoFromBE?.contactNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: `${theme.primary}20` }}
        >
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} {storeName || "Our Store"}. All rights
            reserved.
          </div>
          <div className="flex space-x-6">
            {[
              { text: "Privacy Policy", href: "/privacy" },
              { text: "Terms of Service", href: "/terms" },
              { text: "Cookie Policy", href: "/cookies" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
