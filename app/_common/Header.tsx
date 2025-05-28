// components/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBag className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-bold text-lg">StoreBuilder</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium underline-offset-4 transition-colors ${isActive
                    ? "text-blue-600 underline"
                    : "text-gray-700 hover:underline"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button - shown only on mobile */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu - shown when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMenu}
                  className={`py-3 px-2 text-base font-medium border-b border-gray-100 ${isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;