"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { StoreLayout } from "@/components/store-layout";
import { Badge } from "@/components/ui/badge";
// import { ArrowRight, Star } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { WhyShopWithUsStoreFrontUI } from "./_components/WhyShopWithUsStore";
import { OurCustomerStoreFront } from "./_components/OurCustomerStoreFront";
import { useRouter } from "next/navigation";
// import { SubscribeToNewLetter } from "./_components/NewLetter";

export default function StorePage({ params }: any) {
  // Get the store name from params or use a default
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  let storeName = "Store";
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
        storeName = user.name;
      }
    }
  }, [userId]);

  const getAllProductsData = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const featuredProducts = getAllProductsData?.data?.data;

  const { currentTheme } = useTheme();

  const getSaleProductInfo = useQuery({
    queryKey: ["sale-product"],
    queryFn: async () => {
      const endpoint = `sale-product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const saleData = getSaleProductInfo?.data?.data;

  // Sample categories
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Electronics",
  //     image: "/placeholder.svg?height=200&width=200",
  //     count: 24,
  //   },
  //   {
  //     id: 2,
  //     name: "Clothing",
  //     image: "/placeholder.svg?height=200&width=200",
  //     count: 18,
  //   },
  //   {
  //     id: 3,
  //     name: "Home & Kitchen",
  //     image: "/placeholder.svg?height=200&width=200",
  //     count: 32,
  //   },
  //   {
  //     id: 4,
  //     name: "Beauty",
  //     image: "/placeholder.svg?height=200&width=200",
  //     count: 15,
  //   },
  // ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Customer",
      content:
        "I absolutely love the products from this store! The quality is exceptional and the customer service is outstanding.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Customer",
      content:
        "Fast shipping and the products are exactly as described. Will definitely be shopping here again!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Customer",
      content:
        "Great selection of products at reasonable prices. The checkout process was smooth and hassle-free.",
      rating: 4,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const getBannerInfoData = useQuery({
    queryKey: ["banner-info"],
    queryFn: async () => {
      const endpoint = `customise-store-banner?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const bannerData = getBannerInfoData?.data?.data;

  const handleButtonClick = () => {
    if (featuredProducts && featuredProducts.length > 0) {
      router.push(`/store/${storeName}/products`);
    }
  };

  return (
    <StoreLayout storeName={storeName}>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="relative h-[500px] w-full">
          <Image
            src={
              bannerData?.imageUrl || "/placeholder.svg?height=500&width=1200"
            }
            alt="Store banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <Badge
                className="mb-4"
                style={{ backgroundColor: currentTheme.accent }}
              >
                New Collection
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {bannerData?.title || "Welcome to Our Store"}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                {bannerData?.description ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* <Link href={`/store/${storeName}/products`}> */}
                <Button
                  size="lg"
                  onClick={handleButtonClick}
                  disabled={featuredProducts && featuredProducts?.length === 0}
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  {bannerData?.buttonText || "Show Now"}
                </Button>
                {/* </Link> */}
                {/* <Link href={`/store/${storeName}/categories`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                  >
                    Browse Categories
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">
                Browse our most popular categories
              </p>
            </div>
            <Link
              href={`/store/${storeName}/categories`}
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:underline"
              style={{ color: currentTheme.primary }}
            >
              View All Categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/store/${storeName}/categories/${category.id}`}
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-xl font-bold text-center mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {category.count} Products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section
        className="py-16 bg-opacity-5"
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                {featuredProducts && featuredProducts?.length
                  ? "Our handpicked selection of premium products"
                  : "You can add products from dashboard."}
              </p>
            </div>
            {/* <Link
              href={`/store/${storeName}/products`}
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:underline"
              style={{ color: currentTheme.primary }}
            >
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts?.length
              ? featuredProducts.map((product: any) => {
                  if (product.status === 1) {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        storeName={storeName}
                      />
                    );
                  } else {
                    return (
                      <div>
                        <p className="text-red-500">
                          Product are there but not active. Go to the dashboard
                          and mark product as active.
                        </p>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      {saleData?.campaigns?.length && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
              <div className="relative h-[300px] w-full">
                <Image
                  src={
                    saleData?.campaigns[0]?.bannerImageUrl ||
                    "/placeholder.svg?height=300&width=1200"
                  }
                  alt="Promotional banner"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="w-full max-w-xl mx-auto px-4 md:ml-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {saleData?.campaigns[0]?.title || "Sale Section"}
                  </h2>
                  <p className="text-lg text-white/90 mb-6">
                    {saleData?.campaigns[0]?.description || ""}
                  </p>
                  <Link href={`/store/${storeName}/products/sale`}>
                    <Button
                      size="lg"
                      className="backdrop-blur-sm bg-[var(--accent-color)/70] hover:bg-[var(--accent-color)] text-white font-semibold px-6 py-3 rounded-xl shadow-lg border border-white/20 transition duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      View the Sale
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <WhyShopWithUsStoreFrontUI />

      {/* Testimonials */}
      <OurCustomerStoreFront />
      {/* Newsletter */}
      {/* <SubscribeToNewLetter /> */}
    </StoreLayout>
  );
}
