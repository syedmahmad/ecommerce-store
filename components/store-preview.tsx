"use client";

import { ShoppingBag, Search, ShoppingCart, Menu } from "lucide-react";

interface StorePreviewProps {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export function StorePreview({ theme }: StorePreviewProps) {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Store Header */}
      <div
        className="p-3 border-b flex items-center justify-between"
        style={{
          backgroundColor: theme.secondary,
          borderColor: theme.primary + "33", // Add transparency
        }}
      >
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-4 w-4" style={{ color: theme.primary }} />
          <span className="font-bold text-xs">My Store</span>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-3 w-3" />
          <ShoppingCart className="h-3 w-3" />
          <Menu className="h-3 w-3" />
        </div>
      </div>

      {/* Store Content */}
      <div className="p-3 space-y-3">
        {/* Hero */}
        <div
          className="rounded-md p-3 flex items-center justify-center"
          style={{ backgroundColor: theme.primary + "22" }} // Add transparency
        >
          <div>
            <div
              className="text-[10px] font-bold"
              style={{ color: theme.primary }}
            >
              <p className="text-center"> Welcome to our store </p>
            </div>
            <div className="text-[8px]">Discover amazing products</div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-md p-2 border"
              style={{ borderColor: theme.primary + "33" }} // Add transparency
            >
              <div
                className="h-10 rounded-md mb-1"
                style={{ backgroundColor: theme.secondary }}
              ></div>
              <div className="text-[8px] font-medium">Product {i}</div>
              <div className="text-[7px]" style={{ color: theme.accent }}>
                $19.99
              </div>
              <div
                className="mt-1 rounded-sm text-[6px] p-1 text-center text-white"
                style={{ backgroundColor: theme.primary }}
              >
                Add to Cart
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="rounded-md p-2 mt-2 text-center text-[7px]"
          style={{ backgroundColor: theme.secondary }}
        >
          © 2023 My Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}
