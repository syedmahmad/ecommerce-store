"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, ShoppingCart, Star } from "lucide-react"
import type { ThemeConfig } from "@/context/theme-context"

interface ThemePreviewProps {
  theme: ThemeConfig
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const [activeTab, setActiveTab] = useState("home")

  const themeStyles = {
    "--primary-color": theme.primaryColor,
    "--secondary-color": theme.secondaryColor,
    "--background-color": theme.backgroundColor,
    "--text-color": theme.textColor,
    "--accent-color": theme.accentColor,
    "--header-color": theme.headerColor || theme.backgroundColor,
    "--nav-color": theme.navColor || theme.secondaryColor,
    "--button-text-color": theme.buttonTextColor || "#ffffff",
  } as React.CSSProperties

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm"
      style={{ ...themeStyles, backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      {/* Header */}
      <div
        className="border-b px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: theme.headerColor || theme.backgroundColor }}
      >
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" style={{ color: theme.primaryColor }} />
          <span className="font-bold text-sm">Store Name</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xs font-medium hidden sm:flex space-x-3" style={{ color: theme.textColor }}>
            <span className={activeTab === "home" ? "font-bold" : ""}>Home</span>
            <span className={activeTab === "products" ? "font-bold" : ""}>Products</span>
          </div>
          <div className="relative">
            <ShoppingCart className="h-4 w-4" style={{ color: theme.primaryColor }} />
            <span
              className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full h-3 w-3 flex items-center justify-center"
              style={{ backgroundColor: theme.primaryColor, color: theme.buttonTextColor || "#ffffff" }}
            >
              2
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-md overflow-hidden h-24">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center p-4">
            <div>
              <Badge className="mb-1 text-[10px]" style={{ backgroundColor: theme.accentColor, color: "#ffffff" }}>
                New
              </Badge>
              <h3 className="text-sm font-bold text-white">Welcome to our store</h3>
              <p className="text-[10px] text-white/90">Discover amazing products</p>
            </div>
          </div>
          <div className="h-full w-full bg-gray-200"></div>
        </div>

        {/* Products */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold">Featured Products</h3>
            <span className="text-[10px]" style={{ color: theme.primaryColor }}>
              View all
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-md overflow-hidden" style={{ borderColor: theme.secondaryColor }}>
                <div className="h-16 bg-gray-200"></div>
                <div className="p-2">
                  <h4 className="text-[10px] font-medium">Product {i}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] font-bold">${(19.99 * i).toFixed(2)}</span>
                    <button
                      className="text-[8px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: theme.primaryColor, color: theme.buttonTextColor || "#ffffff" }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="rounded-md p-2 text-[10px]" style={{ backgroundColor: theme.secondaryColor }}>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-2 w-2 mr-0.5"
                fill={i < 5 ? theme.accentColor : "none"}
                style={{ color: theme.accentColor }}
              />
            ))}
          </div>
          <p className="italic text-[8px]">"Great products and fast shipping. Will shop again!"</p>
          <div className="flex items-center mt-1">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-1"></div>
            <span className="text-[8px] font-medium">Happy Customer</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t px-3 py-2 text-center text-[8px]"
        style={{ backgroundColor: theme.secondaryColor, borderColor: theme.backgroundColor }}
      >
        <p>© 2025 Store Name. All rights reserved.</p>
      </div>
    </div>
  )
}
