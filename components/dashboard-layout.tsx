"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminTheme } from "@/context/admin-theme-context";
import { useTheme } from "@/context/theme-context";
import {
  Home,
  Package,
  Palette,
  Settings,
  Users,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentTheme, previewTheme } = useAdminTheme();
  const { setStorePreviewTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("");

  // Get user data from localStorage
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user?.id || null);
        setUserEmail(user?.email || null);
      }
    }
  }, []);

  // Fetch store info
  const { data: storeInfo } = useQuery({
    queryKey: ["store-info", userId],
    queryFn: async () => {
      const endpoint: any = `store/${userId}`;
      const response = await GET(endpoint);
      return response ? response.data : undefined;
    },
    enabled: !!userId,
  });

  const storeId = storeInfo?.id;
  const storeName = storeInfo?.name;

  const domain = storeInfo?.domain;

  const subdomain = domain && domain?.split(".")[0];

  // Set active tab based on current path
  useEffect(() => {
    const tabRoutes: Record<string, string> = {
      "/dashboard/products": "products",
      "/dashboard/customize-store": "customize",
      "/dashboard/customers": "customers",
      "/dashboard/analytics": "analytics",
      "/dashboard/theme": "theme",
      "/dashboard/settings": "settings",
      "/dashboard/merchants": "merchants",
    };

    const currentTab =
      Object.entries(tabRoutes).find(([path]) =>
        pathname.startsWith(path)
      )?.[1] || "overview";

    setActiveTab(currentTab);
  }, [pathname]);

  // Sync theme preview with store
  useEffect(() => {
    if (previewTheme) {
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
      setStorePreviewTheme(null);
    }
  }, [previewTheme, setStorePreviewTheme]);

  // Navigation items with simplified descriptions
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Home,
      href: "/dashboard",
      description: "Store summary at a glance",
    },
    {
      id: "products",
      label: "Manage Products",
      icon: Package,
      href: "/dashboard/products",
      description: "Add and manage products",
    },
    {
      id: "customize",
      label: "Customize Store",
      icon: Users,
      href: "/dashboard/customize-store",
      description: "Edit your store’s header, banners, and layout sections",
    },
    {
      id: "theme",
      label: "Theme",
      icon: Palette,
      href: "/dashboard/theme",
      description: "Change colors and style of your store",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      description: "Account and preferences",
    },
    {
      id: "merchants",
      label: "Merchants",
      icon: Users,
      href: "/dashboard/merchants",
      description: "View the list of merchants.",
      adminOnly: true,
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || userEmail === "devm.ahmad@gmail.com"
  );

  // Apply theme styles
  const themeStyles = {
    "--admin-primary-color":
      previewTheme?.primaryColor || currentTheme.primaryColor,
    "--admin-secondary-color":
      previewTheme?.secondaryColor || currentTheme.secondaryColor,
    "--admin-background-color":
      previewTheme?.backgroundColor || currentTheme.backgroundColor,
    "--admin-text-color": previewTheme?.textColor || currentTheme.textColor,
    "--admin-header-color":
      previewTheme?.headerColor || currentTheme.headerColor,
    "--admin-sidebar-color":
      previewTheme?.sidebarColor || currentTheme.sidebarColor,
    "--admin-accent-color":
      previewTheme?.accentColor || currentTheme.accentColor,
    "--admin-border-color":
      previewTheme?.borderColor || currentTheme.borderColor,
  } as React.CSSProperties;

  const theme = previewTheme || currentTheme;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        ...themeStyles,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 
               backdrop-blur-md bg-black/60 border-b border-white/10 shadow-md"
      >
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3">
          <i className="fa-solid fa-rocket text-white text-base sm:text-lg"></i>
          <div>
            <span className="text-base sm:text-lg font-bold text-white drop-shadow-sm tracking-tight block">
              ZyloSpace
            </span>
            <span className="text-[10px] sm:text-xs text-gray-300 hidden sm:block">
              Admin Panel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-6 space-x-4 sm:space-x-6">
          {filteredNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`relative px-1.5 py-0.5 text-sm font-semibold transition ${
                activeTab === item.id
                  ? "text-violet-300 drop-shadow-[0_0_6px_rgba(139,92,246,0.7)]"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.9)]"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {subdomain && storeId && (
            <Link
              href={getStoreUrl(subdomain, storeId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border border-violet-400/50 
                     text-white bg-violet-500/20 backdrop-blur-sm 
                     hover:bg-violet-500/30 transition shadow-[0_0_10px_rgba(139,92,246,0.4)]"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Store
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            className="md:hidden rounded-full p-2 border border-violet-400/40 
                 hover:bg-violet-500/20 transition shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 right-0 z-20 md:hidden overflow-y-auto 
                   bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-xl shadow-xl"
          >
            <nav className="flex flex-col p-4 space-y-2">
              <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                Menu
              </h3>
              {filteredNavItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className="h-5 w-5 flex-shrink-0"
                      strokeWidth={activeTab === item.id ? 2.5 : 2}
                    />
                    <div className="flex-1">
                      <div>{item.label}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {item.description}
                      </div>
                    </div>
                    {activeTab === item.id && (
                      <span
                        className="ml-auto h-2 w-2 rounded-full bg-white"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-3 sm:p-4 md:p-6"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        {children}
      </motion.main>
    </div>
  );
}

// lib/store-url.ts
// export function getStoreUrl(subdomain: string, storeId: string) {
//   if (process.env.NODE_ENV === "development") {
//     return `http://${subdomain}${storeId}.localhost:3001`;
//   }
//   return `http://${subdomain}${storeId}.zylospace.com`;
// }

export function getStoreUrl(subdomain: string, storeId?: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://${subdomain}.localhost:3001`; // Removes storeId from visible URL
  }
  return `http://${subdomain}.zylospace.com`; // User-friendly URL
}
