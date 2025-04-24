"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { StoreLayout } from "@/components/store-layout";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import React, { useState, useEffect } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { WhyShopWithUsStoreFrontUI } from "./_components/WhyShopWithUsStore";

const queryClient = new QueryClient();

export default function StorePage({ params }: any) {
  // Get the store name from params or use a default

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


  

  return (
    <StoreLayout storeName={storeName}>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="relative h-[500px] w-full">
          <Image
            src={bannerData?.imageUrl || "/placeholder.svg?height=500&width=1200"}
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
              {bannerData?.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/store/${storeName}/products`}>
                  <Button
                    size="lg"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    {bannerData?.buttonText}
                  </Button>
                </Link>
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
                Our handpicked selection of premium products
              </p>
            </div>
            <Link
              href={`/store/${storeName}/products`}
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:underline"
              style={{ color: currentTheme.primary }}
            >
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts &&
              featuredProducts?.length &&
              featuredProducts.map((product: any) => {
                if (product.status === 1 ) {
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
              })}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      {saleData?.campaigns?.length && (<section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
            <div className="relative h-[300px] w-full">
              <Image
                src={saleData?.campaigns[0]?.bannerImageUrl || "/placeholder.svg?height=300&width=1200"}
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
                <Link href={`/store/${storeName}/products?sale=true`}>
                  <Button
                    size="lg"
                    style={{ backgroundColor: "var(--accent-color)" }}
                  >
                    View the Sale
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>)}

      {/* Features */}
      < WhyShopWithUsStoreFrontUI />

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to
              say about their shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-opacity-5 p-6 rounded-lg"
                style={{ backgroundColor: "var(--secondary-color)" }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 mr-1"
                      fill={
                        i < testimonial.rating ? "var(--accent-color)" : "none"
                      }
                      style={{ color: "var(--accent-color)" }}
                    />
                  ))}
                </div>
                <p className="mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-16 bg-opacity-10"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6 opacity-80">
              Subscribe to our newsletter to receive updates on new products,
              special offers, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--primary-color)",
                  color: "var(--text-color)",
                }}
              />
              <Button style={{ backgroundColor: "var(--primary-color)" }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
