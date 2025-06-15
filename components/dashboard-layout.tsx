"use client";

import React from "react";
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
      {/* Header with subtle animation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-10 flex h-16 items-center gap-4 px-4 sm:px-6 border-b"
        style={{
          backgroundColor: theme.headerColor,
          borderColor: theme.borderColor,
        }}
      >
        <Link
          className="flex items-center gap-2 font-semibold"
          href="/dashboard"
          aria-label="Dashboard Home"
        >
          <ShoppingBag
            className="h-6 w-6"
            style={{ color: theme.primaryColor }}
          />
          <span className="hidden sm:inline">ZyloSpace</span>
          {/* {storeName && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              className="hidden md:inline text-sm font-normal ml-2"
            >
              {storeName}
            </motion.span>
          )} */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 md:flex ml-6">
          <ul className="flex items-center gap-1">
            {filteredNavItems.map((item) => (
              <li key={item.id}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
                          activeTab === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                        }`}
                        href={item.href}
                        style={{
                          color:
                            activeTab === item.id
                              ? theme.primaryColor
                              : undefined,
                        }}
                      >
                        <item.icon
                          className="h-4 w-4"
                          strokeWidth={activeTab === item.id ? 2.5 : 2}
                        />
                        <span className="hidden sm:inline">{item.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-sm">
                      {item.description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* {storeId && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/store/${storeId}`} target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-accent/50"
                      style={{
                        borderColor: theme.borderColor,
                        color: theme.textColor,
                      }}
                      aria-label="View live store"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="hidden sm:inline">View Store</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Open your live store in a new tab
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}


{storeId && (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link 
          href={getStoreUrl(storeId)} 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-accent/50"
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
            aria-label="View live store"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">View Store</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        Open {getStoreUrl(storeId)} in new tab
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden hover:bg-accent/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu with smooth animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 mt-16 bg-background/95 backdrop-blur-sm md:hidden overflow-y-auto"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <nav className="flex flex-col p-4 space-y-1">
              <h3 className="px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Menu
              </h3>
              {filteredNavItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/20"
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
                        className="ml-auto h-2 w-2 rounded-full bg-primary"
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

      {/* Main Content with fade-in animation */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-4 sm:p-6"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        {children}
      </motion.main>
    </div>
  );
}


// lib/store-url.ts
export function getStoreUrl(storeId: string) {
  if (process.env.NODE_ENV === 'development') {
    return `http://store${storeId}.localhost:3000`;
  }
  return `https://store${storeId}.zylospace.com`;
}