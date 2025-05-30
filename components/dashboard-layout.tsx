"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminTheme } from "@/context/admin-theme-context";
import { useTheme } from "@/context/theme-context";
import {
  Bell,
  Home,
  Package,
  Palette,
  Settings,
  ShoppingBag,
  Users,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, [userId]);

  // Getting store info to get the store id and pass it to the DashboardLayout so we can get the information
  // about the store and show it in store
  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;
  const storeId = storeInfoFromBE && storeInfoFromBE?.id;

  const pathname = usePathname();
  const { currentTheme, previewTheme } = useAdminTheme();
  const { setStorePreviewTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // Define a constant store name to use throughout the application
  const storeName = storeInfoFromBE && storeInfoFromBE?.name;

  // Use preview theme if available, otherwise use current theme
  const theme = previewTheme || currentTheme;

  // Set active tab based on pathname
  useEffect(() => {
    if (pathname.includes("/dashboard/products")) {
      setActiveTab("products");
    } else if (pathname.includes("/customize-store")) {
      setActiveTab("customize-store");
    } else if (pathname.includes("/dashboard/customers")) {
      setActiveTab("customers");
    } else if (pathname.includes("/dashboard/analytics")) {
      setActiveTab("analytics");
    } else if (pathname.includes("/dashboard/theme")) {
      setActiveTab("theme");
    } else if (pathname.includes("/dashboard/settings")) {
      setActiveTab("settings");
    } else if (pathname.includes("/dashboard/merchants")) {
      setActiveTab("merchants");
    } else {
      setActiveTab("overview");
    }
  }, [pathname]);

  // Sync admin theme with store preview theme when in preview mode
  useEffect(() => {
    if (previewTheme) {
      // Convert admin theme colors to store theme format for preview
      setStorePreviewTheme({
        id: "preview",
        name: "Preview",
        primary: previewTheme.primaryColor,
        secondary: previewTheme.secondaryColor,
        background: previewTheme.backgroundColor,
        text: previewTheme.textColor,
        accent: previewTheme.accentColor,
      });
    } else {
      // Clear store preview theme when not in preview mode
      setStorePreviewTheme(null);
    }
  }, [previewTheme, setStorePreviewTheme]);

  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
  }, [userEmail]);

  // Create CSS variables for the theme
  const themeStyles = {
    "--admin-primary-color": theme.primaryColor,
    "--admin-secondary-color": theme.secondaryColor,
    "--admin-background-color": theme.backgroundColor,
    "--admin-text-color": theme.textColor,
    "--admin-header-color": theme.headerColor,
    "--admin-sidebar-color": theme.sidebarColor,
    "--admin-accent-color": theme.accentColor,
    "--admin-border-color": theme.borderColor,
  } as React.CSSProperties;

  const navItems = [
    { id: "overview", label: "Overview", icon: Home, href: "/dashboard" },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      id: "customize-store",
      label: "Customize Store",
      icon: Users,
      href: "/dashboard/customize-store",
    },
    // { id: "orders", label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
    // { id: "customers", label: "Customers", icon: Users, href: "/dashboard/customers" },
    // { id: "analytics", label: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { id: "theme", label: "Theme", icon: Palette, href: "/dashboard/theme" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      id: "merchants",
      label: "View Merchants",
      icon: Users,
      href: "/dashboard/merchants",
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (item.id === "merchants") {
      return userEmail === "devm.ahmad@gmail.com"; // Only show 'View Merchants' for specific email
    }
    return true; // Show all other items
  });

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        ...themeStyles,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <header
        className="sticky top-0 z-10 flex h-16 items-center gap-4 px-4 sm:px-6 border-b"
        style={{
          backgroundColor: theme.headerColor,
          borderColor: theme.borderColor,
        }}
      >
        <Link
          className="flex items-center gap-2 font-semibold"
          href="/dashboard"
        >
          <ShoppingBag
            className="h-6 w-6"
            style={{ color: theme.primaryColor }}
          />
          <span className="hidden sm:inline">ZyloSpace</span>
        </Link>

        <nav className="hidden flex-1 md:flex">
          {filteredNavItems.map((item) => (
            <Link
              key={item.id}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              href={item.href}
              style={{
                color: activeTab === item.id ? theme.primaryColor : undefined,
              }}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex"
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Link href={`/store/${storeId}`} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              style={{
                borderColor: theme.borderColor,
                color: theme.textColor,
              }}
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">View Store</span>
              <span className="sm:hidden">Store</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 mt-16 bg-background md:hidden"
          style={{
            backgroundColor: theme.backgroundColor,
          }}
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  activeTab === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: activeTab === item.id ? theme.primaryColor : undefined,
                }}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}
