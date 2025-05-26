"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartButton } from "@/components/cart-button";
import { useTheme } from "@/context/theme-context";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";

export function StoreLayoutWrapper({ children, storeId }: any) {
  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentTheme, storePreviewTheme } = useTheme();

  const storeName = storeInfoFromBE && storeInfoFromBE?.name;

  const storeIdFromBE = storeInfoFromBE && storeInfoFromBE?.id;

  const ownerInfo = storeInfoFromBE?.owner;

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  const categories = [
    { name: "Home", path: `/store/${storeId}` },
    { name: "Sale", path: `/store/${storeId}/products/sale` },
    { name: "Contact Us", path: `/store/${storeId}/contact` },
    // May be we'll add in future...
    // { name: "New Arrivals", path: `/store/${storeId}/categories/new` },
    // { name: "Best Sellers", path: `/store/${storeId}/categories/best` },
    // { name: "Sale", path: `/store/${storeId}/categories/sale` },
  ];

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  console.log("storeInfoFromBE?.logoUrl", storeInfoFromBE);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Header */}
      <header
        className={`relative z-10 border-b transition-all duration-500 ease-in-out ${showHeader
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full"
          }`}
        style={{
          boxShadow: `0 2px 10px ${hexToRgba(theme.primary, 0.12)}`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <Link
              href={`/store/${storeIdFromBE}`}
              className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200"
            >
              {storeInfoFromBE?.logoUrl === null ||
                storeInfoFromBE?.logoUrl === undefined ? (
                <ShoppingBag
                  className="h-6 w-6 transition-colors duration-300 hover:scale-110"
                  style={{ color: theme.primary }}
                />
              ) : (
                <div className="relative group">
                  <img
                    src={storeInfoFromBE?.logoUrl}
                    alt="Store Logo"
                    className="h-12 w-12 object-contain rounded-md border border-gray-200 shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:shadow-md"
                    style={{ backgroundColor: theme?.primary }}
                  />
                  <span className="absolute inset-0 bg-primary opacity-0 rounded-md group-hover:opacity-10 transition-opacity duration-300"></span>
                </div>
              )}
              <div className="flex flex-col">
                <span
                  className={`text-xl font-semibold transition-colors duration-200 ${pathname === `/store/${storeInfoFromBE?.id}`
                    ? "text-primary"
                    : "text-gray-900"
                    }`}
                  style={{
                    color:
                      pathname === `/store/${storeIdFromBE}`
                        ? theme.primary
                        : undefined,
                    opacity: pathname === `/store/${storeIdFromBE}` ? 1 : 0.9,
                  }}
                >
                  {storeName}
                </span>
                <span className="text-sm text-gray-500 mt-1 transition-colors duration-200 hover:text-gray-700">
                  {storeInfoFromBE?.description}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with hover effects */}
            <nav className="hidden md:flex space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`relative text-sm font-medium transition-all duration-200 hover:text-primary ${pathname === category.path
                    ? "text-primary"
                    : "text-gray-700"
                    }`}
                  style={{
                    color:
                      pathname === category.path ? theme.primary : undefined,
                  }}
                >
                  {category.name}
                  {pathname === category.path && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                  )}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"
                    style={{ backgroundColor: theme.primary }}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Search and Cart with animations */}
            <div className="flex items-center space-x-4">
              {/* <div className="hidden md:flex relative group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] pl-8 transition-all duration-300 focus:w-[250px] focus:ring-2"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: hexToRgba(theme.primary, 0.2),
                    ...({
                      "--tw-ring-color": hexToRgba(theme.primary, 0.25),
                    } as React.CSSProperties),
                  }}
                />
              </div> */}

              <CartButton storeInfoFromBE={storeInfoFromBE} />

              {/* Mobile Menu Button with animation */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden transition-all duration-300 hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  color: theme.primary,
                }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 animate-spin-in" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu with slide-down animation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen
              ? "max-h-96 py-4 opacity-100"
              : "max-h-0 py-0 opacity-0"
              }`}
            style={{ borderColor: hexToRgba(theme.primary, 0.2) }}
          >
            <div className="flex mb-4">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full transition-all duration-300 focus:ring-2"
                style={{
                  backgroundColor: theme.background,
                  borderColor: hexToRgba(theme.primary, 0.2),
                  ...({
                    "--tw-ring-color": hexToRgba(theme.primary, 0.25),
                  } as React.CSSProperties),
                }}
              />
            </div>
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition-all duration-200 hover:bg-primary/10 hover:pl-3 ${pathname === category.path
                    ? "text-primary"
                    : "text-gray-700"
                    }`}
                  style={{
                    color:
                      pathname === category.path ? theme.primary : undefined,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                  {pathname === category.path && (
                    <span
                      className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer
        className="border-t bg-opacity-90 py-12"
        style={{
          backgroundColor: theme.secondary,
          borderColor: `${theme.primary}20`,
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            {/* About Us Section */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-full mr-4 flex items-center justify-center text-white font-bold text-base shadow-sm"
                  style={{ backgroundColor: theme.primary }}
                  aria-label={`Logo for ${storeName ?? "store"}`}
                >
                  {storeName?.charAt(0).toUpperCase() || "S"}
                </div>
                <span className="font-semibold text-lg sm:text-xl truncate max-w-[200px]">
                  {storeName ?? "Store Name"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                We provide high-quality products at affordable prices.
              </p>

              {/* TODO: Enable social links in future */}
              {/* <div className="flex space-x-3 mt-5">
              {[
                { name: "Facebook", icon: "📘" },
                { name: "Twitter", icon: "🐦" },
                { name: "Instagram", icon: "📸" },
              ].map(({ name, icon }, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  aria-label={`Visit our ${name}`}
                >
                  <span aria-hidden>{icon}</span>
                  <span>{name}</span>
                </Link>
              ))}
            </div> */}
            </div>

            {/* Customer Service Section */}
            <div className="col-span-6 md:col-span-4 lg:col-span-3">
              <h3
                className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
                style={{ color: theme.primary }}
              >
                Customer Service
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Contact Us",
                  "FAQs",
                  "Shipping Policy",
                  "Returns & Refunds",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 flex items-center"
                    >
                      <span className="w-1 h-1 rounded-full bg-current mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="col-span-6 md:col-span-4 lg:col-span-3">
              <h3
                className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
                style={{ color: theme.primary }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {["Privacy Policy", "Terms of Service", "Blog"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 flex items-center"
                      >
                        <span className="w-1 h-1 rounded-full bg-current mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info (using existing content) */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <h3
                className="font-semibold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5"
                style={{ color: theme.primary }}
              >
                Get In Touch
              </h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <p className="flex items-center">
                  <span className="mr-2">📧</span>
                  {ownerInfo?.email}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>{" "}
                  {storeInfoFromBE?.contactNumber}
                </p>
              </div>
            </div>
          </div>

          <div
            className="mt-16 pt-6 border-t flex flex-col md:flex-row justify-between items-center"
            style={{ borderColor: `${theme.primary}20` }}
          >
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {["Privacy", "Terms", "Cookies"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

{
  /* <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Subscribe to receive updates on new products and special
                promotions.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}33`,
                  }}
                />
                <Button
                  className="rounded-l-none"
                  style={{ backgroundColor: theme.primary, color: "#ffffff" }}
                >
                  Subscribe
                </Button>
              </div>
            </div> */
}
