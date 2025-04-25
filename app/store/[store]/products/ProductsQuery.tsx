"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";
import { StoreLayout } from "@/components/store-layout";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";

export const ProductsDataPage = () => {
  const storeName = "store";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState(0);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, [userId]);

  const getAllProducts = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId, // don't send th
  });

  const allProducts0 = getAllProducts?.data?.data;
  console.log("allProducts", allProducts0);

  //   Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Leather Backpack",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Accessories",
      description:
        "A stylish and durable leather backpack perfect for daily use.",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 10,
      category: "Electronics",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Electronics",
      description:
        "Feature-rich smartwatch with health tracking and notifications.",
      rating: 4.2,
      inStock: true,
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Clothing",
      description:
        "Comfortable 100% cotton t-shirt available in multiple colors.",
      rating: 4.0,
      inStock: true,
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 15,
      category: "Home & Kitchen",
      description: "Elegant ceramic coffee mug with a comfortable handle.",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 6,
      name: "Fitness Tracker",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Electronics",
      description:
        "Water-resistant fitness tracker with heart rate monitoring.",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 7,
      name: "Stainless Steel Water Bottle",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Home & Kitchen",
      description:
        "Double-walled insulated water bottle that keeps drinks cold for 24 hours.",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 8,
      name: "Wireless Charging Pad",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 20,
      category: "Electronics",
      description:
        "Fast wireless charging pad compatible with all Qi-enabled devices.",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 9,
      name: "Denim Jacket",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Clothing",
      description:
        "Classic denim jacket with a modern fit and durable construction.",
      rating: 4.1,
      inStock: true,
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 10,
      category: "Electronics",
      description:
        "Portable Bluetooth speaker with rich sound and 12-hour battery life.",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 11,
      name: "Yoga Mat",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Sports & Outdoors",
      description:
        "Non-slip yoga mat with alignment lines for proper positioning.",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 12,
      name: "Leather Wallet",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      discount: 0,
      category: "Accessories",
      description: "Slim leather wallet with RFID blocking technology.",
      rating: 4.3,
      inStock: true,
    },
  ];

  // Get unique categories
  const categories: any = [
    ...new Set(allProducts.map((product: any) => product.category)),
  ];

  // Handle category selection
  const handleCategoryChange = (category: any) => {
    setSelectedCategories((prev: any) => {
      if (prev.includes(category)) {
        return prev.filter((c: any) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Apply filters
  useEffect(() => {
    let filtered: any = [...allProducts];

    // Apply search filter
    if (searchTerm && allProducts) {
      filtered = filtered.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedCategories.includes(product?.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter((product: any) => {
      const discountedPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return (
        discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]
      );
    });

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

    setFilteredProducts(filtered);

    // Count active filters
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategories.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    setActiveFilters(count);
  }, [searchTerm, selectedCategories, priceRange, sortOption, allProducts]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortOption("featured");
  };

  return (
    <StoreLayout storeName={storeName}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">
              {allProducts0?.length}{" "}
              {allProducts0?.length === 1 ? "product" : "products"} available
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <Badge
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  {activeFilters}
                </Badge>
              )}
            </Button>

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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Mobile */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-background z-50 md:hidden overflow-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <h3 className="font-medium mb-2">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <Slider
                      defaultValue={[0, 500]}
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category: any) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() =>
                              handleCategoryChange(category)
                            }
                          />
                          <label
                            htmlFor={`category-mobile-${category}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setIsFilterOpen(false)}
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 500]}
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category: any) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {allProducts0?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts0?.map((product: any) => {
                  console.log("...Product In ProductsQuery", product);
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  No products found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};
