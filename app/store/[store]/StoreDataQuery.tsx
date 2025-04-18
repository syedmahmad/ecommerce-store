"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { StoreLayout } from "@/components/store-layout";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import React, {useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";

const queryClient = new QueryClient();

export default function StorePage({ params }: any) {
  // Get the store name from params or use a default

  const [userId, setUserId] = useState<string | null>(null);

  let storeName = "Store"
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

  //   const queryClient = useQueryClient();
  //   //   const reFetch = () => {
  //   //     // fetch again so UI update automatically.
  //   //     queryClient.invalidateQueries({ queryKey: ["get-product"] });
  //   //   };

  const getSenderQuery = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const featuredProducts = getSenderQuery?.data?.data;

  const { currentTheme } = useTheme();

  // Sample products for the store
  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Leather Backpack",
  //     price: 79.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     inventory: 24,
  //   },
  //   {
  //     id: 2,
  //     name: "Wireless Headphones",
  //     price: 129.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 10,
  //     inventory: 15,
  //   },
  //   {
  //     id: 3,
  //     name: "Smart Watch",
  //     price: 199.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     inventory: 0, // Out of stock
  //   },
  //   {
  //     id: 4,
  //     name: "Cotton T-Shirt",
  //     price: 24.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     inventory: 50,
  //   },
  // ];

  // Sample categories
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
      count: 24,
    },
    {
      id: 2,
      name: "Clothing",
      image: "/placeholder.svg?height=200&width=200",
      count: 18,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "/placeholder.svg?height=200&width=200",
      count: 32,
    },
    {
      id: 4,
      name: "Beauty",
      image: "/placeholder.svg?height=200&width=200",
      count: 15,
    },
  ];

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

  return (
    <StoreLayout storeName={storeName}>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="relative h-[500px] w-full">
          <Image
            src="/placeholder.svg?height=500&width=1200"
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
                Welcome to {storeName.replace(/-/g, " ")}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Discover our curated collection of premium products designed for
                your lifestyle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/store/${storeName}/products`}>
                  <Button
                    size="lg"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link href={`/store/${storeName}/categories`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                  >
                    Browse Categories
                  </Button>
                </Link>
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
            {featuredProducts && featuredProducts?.length && featuredProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                storeName={storeName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
            <div className="relative h-[300px] w-full">
              <Image
                src="/placeholder.svg?height=300&width=1200"
                alt="Promotional banner"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full max-w-xl mx-auto px-4 md:ml-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Summer Sale
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Get up to 40% off on selected items. Limited time offer!
                </p>
                <Link href={`/store/${storeName}/products?sale=true`}>
                  <Button
                    size="lg"
                    style={{ backgroundColor: "var(--accent-color)" }}
                  >
                    Shop the Sale
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-16 bg-opacity-5"
        style={{ backgroundColor: "var(--secondary-color)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience for our
              customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders over $50. We deliver to your
                doorstep.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Your payment information is processed securely. We never store
                your details.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our customer support team is available 24/7 to help with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

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
