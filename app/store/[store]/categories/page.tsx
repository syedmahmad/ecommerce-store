import Image from "next/image";
import Link from "next/link";
import StoreLayout from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage({ params }: any) {
  const storeName = params.store || "demo-store";

  // Sample categories with products
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "The latest gadgets and tech accessories",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 24,
      featured: true,
      products: [
        {
          id: 2,
          name: "Wireless Headphones",
          price: 129.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 3,
          name: "Smart Watch",
          price: 199.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 6,
          name: "Fitness Tracker",
          price: 89.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Clothing",
      description: "Stylish apparel for every occasion",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 18,
      featured: true,
      products: [
        {
          id: 4,
          name: "Cotton T-Shirt",
          price: 24.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 9,
          name: "Denim Jacket",
          price: 59.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Everything you need for your home",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 32,
      featured: true,
      products: [
        {
          id: 5,
          name: "Ceramic Coffee Mug",
          price: 14.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 7,
          name: "Stainless Steel Water Bottle",
          price: 29.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 4,
      name: "Accessories",
      description: "Complete your look with our accessories",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 15,
      featured: false,
      products: [
        {
          id: 1,
          name: "Leather Backpack",
          price: 79.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 12,
          name: "Leather Wallet",
          price: 44.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      description: "Gear up for your active lifestyle",
      image: "/placeholder.svg?height=300&width=600",
      productCount: 21,
      featured: false,
      products: [
        {
          id: 11,
          name: "Yoga Mat",
          price: 34.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
  ];

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>

        {/* Featured Categories */}
        <div className="space-y-16">
          {categories
            .filter((cat) => cat.featured)
            .map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="w-full max-w-xl mx-4 md:mx-12">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h2>
                      <p className="text-white/90 mb-4">
                        {category.description}
                      </p>
                      <p className="text-white/80 mb-6">
                        {category.productCount} products
                      </p>
                      <Link
                        href={`/store/${storeName}/categories/${category.id}`}
                      >
                        <Button
                          style={{ backgroundColor: "var(--primary-color)" }}
                        >
                          Shop {category.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {category.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/store/${storeName}/product/${product.id}`}
                    >
                      <div className="group rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                        <div className="aspect-square relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="mt-1">
                            {new Intl.NumberFormat("en-PK", {
                              style: "currency",
                              currency: "PKR",
                            }).format(product.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link href={`/store/${storeName}/categories/${category.id}`}>
                    <div className="rounded-lg border border-dashed h-full flex flex-col items-center justify-center p-6 hover:border-primary transition-colors">
                      <h3 className="font-medium text-center mb-2">
                        View All {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        Browse all {category.productCount} products
                      </p>
                      <ArrowRight
                        className="h-6 w-6"
                        style={{ color: "var(--primary-color)" }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Other Categories */}
        <h2 className="text-2xl font-bold mt-16 mb-6">More Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories
            .filter((cat) => !cat.featured)
            .map((category) => (
              <Link
                key={category.id}
                href={`/store/${storeName}/categories/${category.id}`}
              >
                <div className="group relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-xl font-bold text-center mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90 text-center mb-2">
                      {category.description}
                    </p>
                    <p className="text-sm opacity-80">
                      {category.productCount} Products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </StoreLayout>
  );
}
