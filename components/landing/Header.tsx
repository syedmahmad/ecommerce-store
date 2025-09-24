"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
];

const NewHeader: React.FC = () => {
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
    <header
      className={`fixed top-0 w-full transition-all duration-300 z-50 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <i className="fa-solid fa-rocket text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ZyloSpace
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                className={`relative cursor-pointer font-medium transition-colors ${
                  pathname === link.path
                    ? "text-purple-600"
                    : "text-gray-700 hover:text-purple-600"
                }`}
                onClick={() => router.push(link.path)}
              >
                {link.name}
                {/* underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full transform transition-transform duration-300 ${
                    pathname === link.path
                      ? "scale-x-100 bg-gradient-to-r from-purple-600 to-blue-600"
                      : "scale-x-0 bg-purple-600 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {!isMobile ? (
              <>
                <button
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </button>
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-transform duration-300 hover:scale-105"
                  onClick={() => router.push("/register")}
                >
                  Start Free Trial
                </button>
              </>
            ) : (
              <button
                className="lg:hidden text-gray-700"
                onClick={toggleMobileMenu}
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.path}
              className={`cursor-pointer font-medium transition-colors ${
                pathname === link.path
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
              onClick={() => {
                router.push(link.path);
                toggleMobileMenu();
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            className="w-full text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
            onClick={() => {
              router.push("/login");
              toggleMobileMenu();
            }}
          >
            Sign In
          </button>
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => {
              router.push("/register");
              toggleMobileMenu();
            }}
          >
            Start Free Trial
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NewHeader;
