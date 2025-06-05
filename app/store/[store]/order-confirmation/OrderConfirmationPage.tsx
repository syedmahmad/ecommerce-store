"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { CheckCircle, Home, Phone, Package, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderConfirmationPage({ storeId }: any) {
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

  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
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
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been received and is
                being processed.
              </p>

              {/* Delivery Status Section */}
              <div className="w-full mb-8">
                <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {/* Road */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-400">
                    <div
                      className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, transparent 50%, #fbbf24 50%)",
                        backgroundSize: "20px 100%",
                      }}
                    />
                  </div>

                  {/* Moving Delivery Bike */}
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{
                      x: "100%",
                      transition: {
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                      },
                    }}
                    className="absolute bottom-4 left-0"
                  >
                    <div className="flex items-end">
                      {/* Bike */}
                      <div className="relative">
                        {/* Wheel 1 */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-4 border-gray-700 rounded-full absolute -top-4 left-0"
                        />

                        {/* Bike frame */}
                        <div className="w-16 h-6 bg-gray-800 rounded-full" />

                        {/* Wheel 2 */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-4 border-gray-700 rounded-full absolute -top-4 right-0"
                        />
                      </div>

                      {/* Delivery Box */}
                      <div className="ml-2 mb-1">
                        <div className="w-8 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <h3 className="font-medium text-lg mb-2">
                  Your order is on the way!
                </h3>
                <p className="text-gray-600 text-sm">
                  Our delivery team has received your order and will be
                  delivering it soon.
                </p>
              </div>

              <div className="bg-gray-50 w-full p-6 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order Number</p>
                    <p className="font-medium">
                      #{Math.floor(Math.random() * 1000000)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium">Cash on Delivery</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Time</p>
                    <p className="font-medium">30-45 minutes</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-8">
                You'll receive a call from our delivery agent when they're
                nearby. Please have the exact amount ready for cash payment upon
                delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/store/${storeIdFromBE}`}>
                  <Button variant="outline" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Shop
                  </Button>
                </Link>
                <Button variant="secondary">
                  <Phone className="mr-2 h-4 w-4" 
                  />
                   +92{storeInfoFromBE?.contactNumber}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} {storeName?.replace(/-/g, " ")}. All
              rights reserved.
            </p>
            <p className="mt-1">Powered by StoreBuilder</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
