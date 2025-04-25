"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartButton } from "@/components/cart-button";
import { useTheme } from "@/context/theme-context";

export function StoreLayout({ children, storeName = "My Store" }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentTheme, storePreviewTheme } = useTheme();

  // Use preview theme if available, otherwise use current theme
  const theme = storePreviewTheme || currentTheme;

  const categories = [
    { name: "Home", path: `/store/${storeName}` },
    { name: "Sale", path: `/store/${storeName}/products/sale` },
    { name: "Contact Us", path: `/store/${storeName}contact` },

    // { name: "New Arrivals", path: `/store/${storeName}/categories/new` },
    // { name: "Best Sellers", path: `/store/${storeName}/categories/best` },
    // { name: "Sale", path: `/store/${storeName}/categories/sale` },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: theme.secondary,
          borderColor: `${theme.primary}33`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={`/store/${storeName}`}
              className="flex items-center space-x-2"
            >
              <ShoppingBag
                className="h-6 w-6"
                style={{ color: theme.primary }}
              />
              <span className="font-bold text-lg">{storeName}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === category.path ? "text-primary" : ""
                  }`}
                  style={{
                    color:
                      pathname === category.path ? theme.primary : undefined,
                  }}
                  // @ts-ignore
                  className="hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] pl-8"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}33`,
                  }}
                />
              </div>

              <CartButton storeName={storeName} />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className="md:hidden py-4 border-t"
              style={{ borderColor: `${theme.primary}33` }}
            >
              <div className="flex mb-4">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}33`,
                  }}
                />
              </div>
              <nav className="flex flex-col space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === category.path ? "text-primary" : ""
                    }`}
                    style={{
                      color:
                        pathname === category.path ? theme.primary : undefined,
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer
        className="border-t py-6"
        style={{
          backgroundColor: theme.secondary,
          borderColor: `${theme.primary}33`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                We provide high-quality products at affordable prices.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                    // style={{ "&:hover": { color: theme.primary } }}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
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
            </div>
          </div>
          <div
            className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground"
            style={{ borderColor: `${theme.primary}33` }}
          >
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
