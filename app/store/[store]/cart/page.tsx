"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage({ params }) {
  const storeName = params?.store || "demo-store"
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate coupon application
    setTimeout(() => {
      setIsApplyingCoupon(false)
      toast({
        title: "Invalid coupon code",
        description: "The coupon code you entered is invalid or has expired.",
        variant: "destructive",
      })
      setCouponCode("")
    }, 1000)
  }

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    // Navigate to checkout
    window.location.href = `/store/${storeName}/checkout`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/store/${storeName}`} className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl capitalize">{storeName.replace(/-/g, " ")}</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href={`/store/${storeName}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">Your Cart</h1>
          </div>

          {items.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h2>
                    <div className="space-y-4">
                      {items.map((item) => {
                        const discountedPrice = item.discount
                          ? (item.price * (1 - item.discount / 100)).toFixed(2)
                          : item.price.toFixed(2)

                        // Check if item has inventory issues
                        const hasInventoryIssue = item.inventory !== undefined && item.quantity > item.inventory

                        return (
                          <div
                            key={item.id}
                            className={`flex flex-col sm:flex-row items-start sm:items-center py-4 border-b ${
                              hasInventoryIssue ? "bg-red-50" : ""
                            }`}
                          >
                            <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Unit Price: ${discountedPrice}
                                {item.discount > 0 && (
                                  <span className="text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                                )}
                              </p>
                              {hasInventoryIssue && (
                                <p className="text-red-600 text-sm mt-1">
                                  Only {item.inventory} in stock. Quantity will be adjusted at checkout.
                                </p>
                              )}
                              {item.inventory !== undefined && item.inventory <= 5 && item.inventory > 0 && (
                                <p className="text-amber-600 text-sm mt-1">Only {item.inventory} left in stock!</p>
                              )}
                            </div>
                            <div className="flex items-center mt-4 sm:mt-0">
                              <div className="flex items-center border rounded-md mr-4">
                                <button
                                  className="px-2 py-1"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button
                                  className={`px-2 py-1 ${item.inventory !== undefined && item.quantity >= item.inventory ? "opacity-50 cursor-not-allowed" : ""}`}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.inventory !== undefined && item.quantity >= item.inventory}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="text-right min-w-[80px]">
                                <div className="font-medium">
                                  ${(Number.parseFloat(discountedPrice) * item.quantity).toFixed(2)}
                                </div>
                                <button
                                  className="text-red-500 text-sm flex items-center mt-1"
                                  onClick={() => removeItem(item.id)}
                                  aria-label="Remove item"
                                >
                                  <Trash className="h-3 w-3 mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex items-center">
                      <Input
                        placeholder="Discount code"
                        className="mr-2"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link href={`/store/${storeName}`}>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} {storeName.replace(/-/g, " ")}. All rights reserved.
            </p>
            <p className="mt-1">Powered by StoreBuilder</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
