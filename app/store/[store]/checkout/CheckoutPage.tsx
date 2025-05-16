"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  ShoppingBag,
  Truck,
} from "lucide-react";
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
  //   const storeName = params?.store || "demo-store";

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    notes: "",
  });

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Basic validation
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    // Check inventory levels before proceeding
    const inventoryIssues = items.filter(
      (item) => item.inventory !== undefined && item.quantity > item.inventory
    );

    if (inventoryIssues.length > 0) {
      // There are inventory issues
      const itemNames = inventoryIssues.map((item) => item.name).join(", ");
      toast({
        title: "Inventory changed",
        description: `Some items in your cart are no longer available in the requested quantity: ${itemNames}. Please update your cart.`,
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    // Add card fields if payment method is card
    if (paymentMethod === "card") {
      requiredFields.push("cardNumber", "cardName", "cardExpiry", "cardCvc");
    }

    const missingFields = requiredFields.filter(
      (field: any) => !formData[field]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Process order
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);

      // Update inventory after successful order
      // In a real app, this would be handled by the backend
      // Here we're just simulating the inventory update
      items.forEach((item) => {
        if (item.inventory !== undefined) {
          // This would be a server-side update in a real app
          console.log(
            `Updating inventory for ${item.name}: ${item.inventory} - ${
              item.quantity
            } = ${item.inventory - item.quantity}`
          );
        }
      });

      clearCart();

      // Redirect to order confirmation
      router.push(`/store/${storeName}/order-confirmation`);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/store/${storeName}`}
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
                <div className="md:col-span-2 space-y-8">
                  {/* Shipping Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Shipping Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">
                            Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State/Province{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">
                            ZIP/Postal Code{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Payment Method
                      </h2>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label
                            htmlFor="payment-card"
                            className="flex items-center cursor-pointer"
                          >
                            <CreditCard className="mr-2 h-5 w-5" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="cod" id="payment-cod" />
                          <Label
                            htmlFor="payment-cod"
                            className="flex items-center cursor-pointer"
                          >
                            <Truck className="mr-2 h-5 w-5" />
                            Cash on Delivery
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "card" && (
                        <div className="mt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">
                              Card Number{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">
                              Name on Card{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">
                                Expiry Date{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/YY"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc">
                                CVC <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="cardCvc"
                                name="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Order Notes */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Notes
                      </h2>
                      <div className="space-y-2">
                        <Label htmlFor="notes">
                          Additional Information (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Special instructions for delivery or any other notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="sticky top-24">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">
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
                              className="flex items-center py-2"
                            >
                              <div className="relative h-16 w-16 rounded overflow-hidden mr-4">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
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
                                <span className="font-medium">
                                  $
                                  {(
                                    Number.parseFloat(discountedPrice) *
                                    item.quantity
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          );
                        })}

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>
                              {shipping === 0
                                ? "Free"
                                : `$${shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            `Place Order - $${total.toFixed(2)}`
                          )}
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-2">
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
