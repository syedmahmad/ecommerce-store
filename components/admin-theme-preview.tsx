"use client"

import type React from "react"
import { Home, Package, ShoppingBag, Bell, Settings } from "lucide-react"
import type { AdminThemeConfig } from "@/context/admin-theme-context"

interface AdminThemePreviewProps {
  theme: AdminThemeConfig
}

export function AdminThemePreview({ theme }: AdminThemePreviewProps) {
  const themeStyles = {
    "--admin-primary-color": theme.primaryColor,
    "--admin-secondary-color": theme.secondaryColor,
    "--admin-background-color": theme.backgroundColor,
    "--admin-text-color": theme.textColor,
    "--admin-header-color": theme.headerColor,
    "--admin-sidebar-color": theme.sidebarColor,
    "--admin-accent-color": theme.accentColor,
    "--admin-border-color": theme.borderColor,
  } as React.CSSProperties

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm"
      style={{
        ...themeStyles,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        borderColor: theme.borderColor,
      }}
    >
      {/* Header */}
      <div
        className="border-b px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: theme.headerColor, borderColor: theme.borderColor }}
      >
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-4 w-4" style={{ color: theme.primaryColor }} />
          <span className="font-bold text-xs">StoreBuilder</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="rounded-md p-1" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
            <Bell className="h-3 w-3" />
          </div>
          <div className="rounded-md p-1" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
            <Settings className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-48">
        {/* Sidebar */}
        <div
          className="w-1/4 p-2 border-r"
          style={{ backgroundColor: theme.sidebarColor, borderColor: theme.borderColor }}
        >
          <div className="space-y-2">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px]"
              style={{ backgroundColor: theme.primaryColor, color: "#ffffff" }}
            >
              <Home className="h-2 w-2" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px]">
              <Package className="h-2 w-2" />
              <span>Products</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px]">
              <Settings className="h-2 w-2" />
              <span>Settings</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-bold">Dashboard</div>
              <div
                className="text-[8px] px-2 py-1 rounded-md"
                style={{ backgroundColor: theme.primaryColor, color: "#ffffff" }}
              >
                New Product
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-md border" style={{ borderColor: theme.borderColor }}>
                <div className="text-[8px] text-muted-foreground">Sales</div>
                <div className="text-[10px] font-bold">$12,345</div>
              </div>
              <div className="p-2 rounded-md border" style={{ borderColor: theme.borderColor }}>
                <div className="text-[8px] text-muted-foreground">Orders</div>
                <div className="text-[10px] font-bold">123</div>
              </div>
            </div>

            <div className="p-2 rounded-md border" style={{ borderColor: theme.borderColor }}>
              <div className="text-[8px] font-bold mb-1">Recent Orders</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px]">
                  <span>Order #1234</span>
                  <span style={{ color: theme.accentColor }}>$99.99</span>
                </div>
                <div className="flex justify-between text-[7px]">
                  <span>Order #1235</span>
                  <span style={{ color: theme.accentColor }}>$149.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
