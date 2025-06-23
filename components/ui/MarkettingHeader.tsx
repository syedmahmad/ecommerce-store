"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "./button";

export default function MarketingHeader() {
  //   const router = useRouter();
  const pathname = usePathname();
  const colors = {
    primary: "#4f46e5", // More vibrant indigo
    secondary: "#10b981", // Emerald green
    accent: "#f59e0b", // Amber
    dark: "#1e293b", // Dark slate
    light: "#f8fafc", // Lightest slate
  };

  const navItems = ["Features", "Pricing", "About", "Services", "Contact-Us"];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  /**
   * Checks if the given nav item corresponds to the current route.
   * @param item - The nav item name
   * @returns boolean indicating if nav item is active
   */
  const isActive = (item: string) => {
    return pathname === `/${item.toLowerCase()}`;
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link className="flex items-center justify-center" href="/">
          <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
            <img
              src="/zylospacelogo.jpeg"
              alt="logo"
              className="h-16 w-auto mr-2 object-contain "
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
          {navItems.map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className={`text-sm font-medium transition-colors ${
                  isActive(item)
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                href={`/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Buttons - hidden on mobile */}
        <div className="hidden md:flex ml-4 gap-2">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-gray-300">
                Login
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/register">
              <Button
                size="sm"
                style={{ backgroundColor: colors.primary }}
                className="hover:bg-indigo-700"
              >
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button - shown only on mobile */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isDrawerOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <button
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={toggleDrawer}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  className={`text-lg font-medium transition-colors ${
                    isActive(item)
                      ? "text-indigo-600 border-l-4 border-indigo-600 pl-2"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  href={`/${item.toLowerCase()}`}
                  onClick={toggleDrawer}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto mb-8 flex flex-col space-y-4">
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login" onClick={toggleDrawer}>
                <Button variant="outline" className="w-full border-gray-300">
                  Login
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
              <Link href="/register" onClick={toggleDrawer}>
                <Button
                  className="w-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
