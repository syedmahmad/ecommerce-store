"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTheme } from "@/context/theme-context";

export function CartButton({ storeInfoFromBE }: any) {
  // const { storeName, id } = storeInfoFromBE;
  const id = storeInfoFromBE && storeInfoFromBE?.id;
  const { cart } = useCart();
  const { currentTheme, storePreviewTheme } = useTheme();

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  // Calculate total items in cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href={`/store/${id}/cart`}>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        style={{ borderColor: `${theme.primary}33` }}
      >
        <ShoppingCart className="h-5 w-5" style={{ color: theme.primary }} />
        {itemCount > 0 && (
          <span
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-[10px] flex items-center justify-center text-white"
            style={{ backgroundColor: theme.accent }}
          >
            {itemCount}
          </span>
        )}
        <span className="sr-only">View cart</span>
      </Button>
    </Link>
  );
}
