"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import { ArrowLeft, Loader2, ShoppingBag, Truck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";

export default function CheckoutPage({ storeId }: any) {
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

  const router = useRouter();
  const { toast } = useToast();
  const { items, subtotal, clearCart } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const [showRiderAnimation, setShowRiderAnimation] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    // Check inventory levels
    const inventoryIssues = items.filter(
      (item) => item.inventory !== undefined && item.quantity > item.inventory
    );

    if (inventoryIssues.length > 0) {
      const itemNames = inventoryIssues.map((item) => item.name).join(", ");
      toast({
        title: "Inventory changed",
        description: `Some items in your cart are no longer available in the requested quantity: ${itemNames}. Please update your cart.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setShowRiderAnimation(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push(`/store/${storeIdFromBE}/order-confirmation`);
    }, 20000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/store/${storeIdFromBE}`}
            className="flex items-center space-x-2"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl capitalize">
              {storeName?.replace(/-/g, " ")}
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href={`/store/${storeIdFromBE}/cart`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">Checkout</h1>
          </div>

          {items.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="bg-white rounded-lg shadow-sm">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-4">
                            Payment Method
                          </h2>
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <Truck className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Cash on Delivery</h3>
                              <p className="text-sm text-gray-600">
                                Pay with cash when your order is delivered
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold mb-4">
                            Order Notes
                          </h2>
                          <textarea
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            placeholder="Any special instructions for your order?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="bg-white rounded-lg shadow-sm sticky top-24">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        {items.map((item) => {
                          const discountedPrice = item.discount
                            ? (item.price * (1 - item.discount / 100)).toFixed(
                                2
                              )
                            : item.price.toFixed(2);

                          return (
                            <div
                              key={item.id}
                              className="flex items-center py-3 border-b"
                            >
                              <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-4 border">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  // fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">
                                  {item.name}
                                </h3>
                                <p className="text-gray-600 text-xs">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                {/* <span className="font-medium">
                                  $
                                  {(
                                    Number.parseFloat(discountedPrice) *
                                    item.quantity
                                  ).toFixed(2)}

                                  
                                </span> */}
                                <span>
                                  Rs{" "}
                                  {(
                                    Number.parseFloat(discountedPrice) *
                                    item.quantity
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          );
                        })}

                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span>RS{subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span>
                              {shipping === 0
                                ? "Free"
                                : `RS ${shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total</span>
                              <span>RS{total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-6 py-6 text-lg"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            `Place Order - RS ${total.toFixed(2)}`
                          )}
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          By placing your order, you agree to our Terms of
                          Service and Privacy Policy.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                You need to add products to your cart before checking out.
              </p>
              <Link href={`/store/${storeName}`}>
                <Button>Shop Now</Button>
              </Link>
            </div>
          )}
        </div>
        {/*  */}
        {showRiderAnimation && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md text-center">
              <h3 className="text-xl font-bold mb-4">
                Your order is on the way!
              </h3>
              <div className="relative h-48 w-full mb-6">
                <Image
                  src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHRiNmE1ZDNkcTQyOHFpZGoyZHA1ZWg4YTBmem41MWp1OGlrZmdjcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tr59wB3LBVrBLW9kn0/giphy.gif"
                  alt="Rider on the way"
                  fill
                  className="object-contain"
                  unoptimized // If using GIF
                />
              </div>
              <p className="text-gray-600 mb-4">
                Our delivery rider is coming to you with your order.
              </p>
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} {storeName?.replace(/-/g, " ")}. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
