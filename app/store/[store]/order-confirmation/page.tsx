"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"

export default function OrderConfirmationPage({ params }) {
  const storeName = params?.store || "demo-store"
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

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
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>

              <div className="bg-gray-50 w-full p-6 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order Number</p>
                    <p className="font-medium">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">customer@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium">Credit Card / Cash on Delivery</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-8">
                We've sent a confirmation email with all the details of your order. If you have any questions, please
                contact our customer support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/store/${storeName}`}>
                  <Button variant="outline" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Shop
                  </Button>
                </Link>
                <Link href={`/store/${storeName}/account/orders`}>
                  <Button>View Order Status</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
