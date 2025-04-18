"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { useTheme } from "@/context/theme-context"
import { Loader2 } from "lucide-react"

export function ProductCard({ product, storeName }: any) {
  const { toast } = useToast()
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const { currentTheme, storePreviewTheme } = useTheme()

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme

  const handleAddToCart = () => {
    // Check if product is in stock
    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "Sorry, this product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        discount: product.discount,
        inventory: product.inventory,
      })

      setIsAdding(false)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }, 600)
  }

  const discountedPrice =
    product.discount > 0 ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2)

  const isOutOfStock = product.stock <= 0
  const lowStock = product.inventory !== undefined && product.inventory <= 5 && product.inventory > 0

  console.log('product',product)
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link href={`/store/${storeName}/product/${product.id}`} className="relative block">
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
        <Link href={`/store/${storeName}/product/${product.id}`}>
          <h3 className="font-medium text-lg hover:underline">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-2">
          {product.discount > 0 ? (
            <>
              <span className="font-bold">${discountedPrice}</span>
              <span className="text-gray-500 line-through ml-2 text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        {!isOutOfStock && (
          <p className={`text-xs mt-1 ${lowStock ? "text-amber-600 font-medium" : "text-green-600"}`}>
            {lowStock ? `Only ${product.inventory} left!` : `In stock: ${product.stock}`}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAdding || isOutOfStock}
          style={{
            backgroundColor: isOutOfStock ? "#d1d5db" : theme.primary,
            color: "#ffffff",
          }}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isOutOfStock ? (
            "Out of Stock"
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
