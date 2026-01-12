"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants, itemVariants, containerVariants } from "@/constants/animations";

const navLinks = [
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full transition-all duration-300 z-50 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-neutral-900/5"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/40 transition-shadow"
            >
              <span className="text-white text-lg">🚀</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
              ZyloSpace
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`relative cursor-pointer font-medium transition-colors text-sm ${
                  pathname === link.path
                    ? "text-primary-600"
                    : "text-neutral-700 hover:text-primary-600"
                }`}
                onClick={() => router.push(link.path)}
              >
                {link.name}
                {/* Animated underline */}
                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                  initial={{ scaleX: pathname === link.path ? 1 : 0 }}
                  animate={{ scaleX: pathname === link.path ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {!isMobile ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors text-sm"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/40 transition-all"
                  onClick={() => router.push("/register")}
                >
                  Start Free Trial
                </motion.button>
              </>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="lg:hidden text-neutral-700 p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fa-solid fa-bars text-xl"></i>
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-100 overflow-hidden"
          >
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-4 py-6 px-6"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.path}
                  variants={itemVariants}
                  className={`cursor-pointer font-medium transition-colors text-base ${
                    pathname === link.path
                      ? "text-primary-600"
                      : "text-neutral-700 hover:text-primary-600"
                  }`}
                  onClick={() => {
                    router.push(link.path);
                    toggleMobileMenu();
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                className="w-full text-neutral-700 hover:text-primary-600 font-medium transition-colors py-2 text-base"
                onClick={() => {
                  router.push("/login");
                  toggleMobileMenu();
                }}
              >
                Sign In
              </motion.button>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/40 transition-all text-base"
                onClick={() => {
                  router.push("/register");
                  toggleMobileMenu();
                }}
              >
                Start Free Trial
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
