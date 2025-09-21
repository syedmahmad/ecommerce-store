import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      id="header"
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold gradient-text">ZyloSpace</span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <a
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={() => {
                router.push("/features");
              }}
            >
              Features
            </a>
            <a
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              Pricing
            </a>
            {/* <a
              href="#templates"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
            >
              Templates
            </a> */}
            <a
              // href="#enterprise"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={() => {
                router.push("/services");
              }}
            >
              Services
            </a>
            {/* <a
              href="#resources"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
            >
              Resources
            </a> */}
            {/* <a
              href="#support"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
            >
              Support
            </a> */}
          </nav>

          <div className="flex items-center space-x-4">
            {!isMobile ? (
              <>
                <button
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Sign In
                </button>
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    toggleMobileMenu();
                    router.push("/register");
                  }}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md py-4 px-6 border-b border-gray-100">
          <nav className="flex flex-col items-center space-y-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Pricing
            </a>
            <a
              href="#templates"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Templates
            </a>
            <a
              href="#enterprise"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Enterprise
            </a>
            <a
              href="#resources"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Resources
            </a>
            <a
              href="#support"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Support
            </a>
            <button
              className="w-full text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Sign In
            </button>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={toggleMobileMenu}
            >
              Start Free Trial
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NewHeader;
