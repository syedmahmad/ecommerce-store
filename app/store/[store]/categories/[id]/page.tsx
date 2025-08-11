"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import StoreLayout from "@/components/store-layout";
import { ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { useParams } from "next/navigation";

export default function CategoryPage({ params }: any) {
  const getParams = useParams();
  const storeId = getParams.store;

  const storeName = params.store || "demo-store";
  const categoryId = Number(params.id) || 1;
  const [sortOption, setSortOption] = useState("featured");
  const [products, setProducts] = useState([]);

  const queryClient = useQueryClient();
  // const reFetch = () => {
  //   // fetch again so UI update automatically.
  //   queryClient.invalidateQueries({ queryKey: ["get-product"] });
  // };

  const productsDataQuery = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?domain=${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const productsData = productsDataQuery?.data?.data;

  useEffect(() => {
    if (productsData.length) {
      setProducts(productsData);
    }
  }, [productsData]);

  // Sample categories with products
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "The latest gadgets and tech accessories",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 24,
    },
    {
      id: 2,
      name: "Clothing",
      description: "Stylish apparel for every occasion",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 18,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Everything you need for your home",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 32,
    },
    {
      id: 4,
      name: "Accessories",
      description: "Complete your look with our accessories",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 15,
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      description: "Gear up for your active lifestyle",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 21,
    },
  ];

  // Sample products data
  // const allProducts = [
  //   {
  //     id: 1,
  //     name: "Leather Backpack",
  //     price: 79.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 4,
  //     description: "A stylish and durable leather backpack perfect for daily use.",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     name: "Wireless Headphones",
  //     price: 129.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 10,
  //     categoryId: 1,
  //     description: "Premium noise-cancelling wireless headphones with long battery life.",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 3,
  //     name: "Smart Watch",
  //     price: 199.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 1,
  //     description: "Feature-rich smartwatch with health tracking and notifications.",
  //     rating: 4.2,
  //   },
  //   {
  //     id: 4,
  //     name: "Cotton T-Shirt",
  //     price: 24.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 2,
  //     description: "Comfortable 100% cotton t-shirt available in multiple colors.",
  //     rating: 4.0,
  //   },
  //   {
  //     id: 5,
  //     name: "Ceramic Coffee Mug",
  //     price: 14.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 15,
  //     categoryId: 3,
  //     description: "Elegant ceramic coffee mug with a comfortable handle.",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 6,
  //     name: "Fitness Tracker",
  //     price: 89.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 1,
  //     description: "Water-resistant fitness tracker with heart rate monitoring.",
  //     rating: 4.3,
  //   },
  //   {
  //     id: 7,
  //     name: "Stainless Steel Water Bottle",
  //     price: 29.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 3,
  //     description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours.",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 8,
  //     name: "Wireless Charging Pad",
  //     price: 39.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 20,
  //     categoryId: 1,
  //     description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
  //     rating: 4.4,
  //   },
  //   {
  //     id: 9,
  //     name: "Denim Jacket",
  //     price: 59.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 2,
  //     description: "Classic denim jacket with a modern fit and durable construction.",
  //     rating: 4.1,
  //   },
  //   {
  //     id: 10,
  //     name: "Bluetooth Speaker",
  //     price: 49.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 10,
  //     categoryId: 1,
  //     description: "Portable Bluetooth speaker with rich sound and 12-hour battery life.",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 11,
  //     name: "Yoga Mat",
  //     price: 34.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 5,
  //     description: "Non-slip yoga mat with alignment lines for proper positioning.",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 12,
  //     name: "Leather Wallet",
  //     price: 44.99,
  //     image: "/placeholder.svg?height=300&width=300",
  //     discount: 0,
  //     categoryId: 4,
  //     description: "Slim leather wallet with RFID blocking technology.",
  //     rating: 4.3,
  //   },
  // ]

  // Get current category
  const category = categories.find((c) => c.id === categoryId) || categories[0];

  // Filter products by category and apply sorting
  useEffect(() => {
    const filtered: any = productsData.filter(
      (product: any) => product.categoryId === categoryId
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a: any, b: any) => {
          const aPrice = a.discount
            ? a.price * (1 - a.discount / 100)
            : a.price;
          const bPrice = b.discount
            ? b.price * (1 - b.discount / 100)
            : b.price;
          return aPrice - bPrice;
        });
        break;
      case "price-high-low":
        filtered.sort((a: any, b: any) => {
          const aPrice = a.discount
            ? a.price * (1 - a.discount / 100)
            : a.price;
          const bPrice = b.discount
            ? b.price * (1 - b.discount / 100)
            : b.price;
          return bPrice - aPrice;
        });
        break;
      case "newest":
        // In a real app, you would sort by date
        filtered.sort((a: any, b: any) => b.id - a.id);
        break;
      case "rating":
        filtered.sort((a: any, b: any) => b.rating - a.rating);
        break;
      default:
        // Featured - no specific sort
        break;
    }

    // setProducts(filtered);
  }, [categoryId, sortOption]);

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href={`/store/${storeName}/categories`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Categories
            </Button>
          </Link>

          <div className="relative rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <div className="relative h-[250px] w-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full max-w-xl mx-4 md:mx-12">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {category.name}
                </h1>
                <p className="text-white/90 mb-4">{category.description}</p>
                <p className="text-white/80">{products.length} products</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{category.name} Products</h2>
            <div className="relative">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              console.log("....Product in category page", product);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  storeName={storeName}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              There are no products in this category yet.
            </p>
            <Link href={`/store/${storeName}/products`}>
              <Button>Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
