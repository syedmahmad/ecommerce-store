"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Updated color scheme
const colors = {
  primary: "#4f46e5", // More vibrant indigo
  secondary: "#10b981", // Emerald green
  accent: "#f59e0b", // Amber
  dark: "#1e293b", // Dark slate
  light: "#f8fafc", // Lightest slate
};

function FeatureCard({ title, description, icon }: any) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center space-y-4 rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:border-transparent"
      whileHover={{
        scale: 1.03,
        borderColor: colors.primary,
        boxShadow: `0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 text-3xl mb-2"
        whileHover={{
          rotate: 10,
          scale: 1.1,
          background: `linear-gradient(to bottom right, ${colors.primary}20, ${colors.primary}10)`,
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 text-center">{title}</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home() {
  useEffect(() => {
    const initAnimations = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 800,
        once: true,
        offset: 120,
        easing: "ease-out-cubic",
      });
    };
    initAnimations();
  }, []);

  const features = [
    {
      title: "Easy Product Management",
      description:
        "Upload photos, set prices, and manage inventory with a simple interface.",
      icon: "🛒",
    },
    {
      title: "Secure Checkout",
      description:
        "Built-in payment processing with a secure and streamlined checkout experience.",
      icon: "🔒",
    },
    {
      title: "Mobile Friendly",
      description:
        "Manage your store and products from any device, including smartphones and tablets.",
      icon: "📱",
    },
    {
      title: "Custom Domain",
      description:
        "Get your own subdomain or connect your custom domain for a professional look.",
      icon: "🌐",
    },
    {
      title: "Order Notifications",
      description:
        "Get notified instantly when customers place orders on your store.",
      icon: "🔔",
    },
    {
      title: "Sales Analytics",
      description:
        "Simple analytics to track your sales, popular products, and customer behavior.",
      icon: "📊",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Animated background elements */}
      <motion.div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-indigo-100 blur-3xl opacity-20"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-20"
          animate={{
            y: [0, -60, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link className="flex items-center justify-center" href="/">
          <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
            <ShoppingBag
              className="h-6 w-6 mr-2"
              style={{ color: colors.primary }}
            />
          </motion.div>
          <span className="font-bold text-gray-900 text-lg">ZyloSpace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["Features", "Pricing", "About"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                href={`/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="ml-4 flex gap-2">
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
      </header>

      <main className="flex-1">
        {/* Hero Section with enhanced animations */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white/50" />
          </div>

          <div className="px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="space-y-4">
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Create your online store in minutes
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-600 md:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    No coding required. Upload products, set prices, and start
                    selling today with your own custom store.
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Link href="/register">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        size="lg"
                        style={{ backgroundColor: colors.primary }}
                        className="px-8 py-6 text-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
                      >
                        Get Started
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                          }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 0.77, 0.47, 0.97],
                  delay: 0.3,
                }}
              >
                <motion.img
                  alt="ZyloSpace Dashboard"
                  className="rounded-xl object-cover shadow-2xl border-2 border-white/20"
                  src="/rightImage.png"
                  width={550}
                  height={650}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 25px 50px -12px rgba(79, 70, 229, 0.25)`,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with gradient background */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Launch Your Online Store in Minutes
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                No coding required. Just sign up, choose a theme, and go live.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                {
                  title: "One-Click Store Setup",
                  description:
                    "Sign up and get your store online instantly. No technical skills needed.",
                  icon: "🛍️",
                },
                {
                  title: "Beautiful, Customizable Themes",
                  description:
                    "Pick from a variety of modern themes and customize them any time.",
                  icon: "🎨",
                },
                {
                  title: "Secure and Fast Hosting",
                  description:
                    "Your store is protected and optimized for speed, giving customers a smooth experience.",
                  icon: "⚡",
                },
                {
                  title: "Mobile-Ready Design",
                  description:
                    "Looks stunning on any device – phones, tablets, or desktops.",
                  icon: "📱",
                },
                {
                  title: "Built-in SEO Tools",
                  description:
                    "Improve your visibility on Google and attract more customers organically.",
                  icon: "🔍",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Need help? Our team is always here to assist you whenever you need it.",
                  icon: "🛎️",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Start your business journey today
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join hundreds of entrepreneurs building stores without writing a
                single line of code.
              </p>
              <Link href="/register">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Get Started Free
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="px-4 md:px-6 max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
                  Features designed for non-technical users
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 md:text-lg">
                  Everything you need to create and manage your online store
                  without any coding knowledge.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section with enhanced design */}
        <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Entrepreneurs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear what our customers say about ZyloSpace
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  rating: "★★★★★",
                  quote:
                    "ZyloSpace helped me launch my store in just one afternoon. The interface is so intuitive and the support team is amazing!",
                  name: "Sarah Johnson",
                  business: "Fashion Boutique",
                },
                {
                  rating: "★★★★★",
                  quote:
                    "As someone with no tech background, I was amazed at how easy ZyloSpace made it to create a professional online store.",
                  name: "Michael Chen",
                  business: "Home Goods",
                },
                {
                  rating: "★★★★☆",
                  quote:
                    "The analytics dashboard gives me exactly the insights I need to grow my business. Highly recommended for small businesses!",
                  name: "Emma Rodriguez",
                  business: "Artisan Crafts",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:border-indigo-200 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: `0 10px 25px -5px rgba(79, 70, 229, 0.1)`,
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">
                      {testimonial.rating}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-sm ml-auto">
                      {testimonial.business}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer with gradient */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center">
                <motion.div whileHover={{ rotate: 15 }}>
                  <ShoppingBag className="h-6 w-6 mr-2 text-indigo-300" />
                </motion.div>
                <span className="font-bold text-xl">ZyloSpace</span>
              </div>
              <p className="text-gray-400">
                The easiest way to create your online store and start selling
                today.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Facebook, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -3, color: "#a5b4fc" }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            {["Product", "Resources", "Company"].map((section, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
                  {section}
                </h3>
                <ul className="space-y-3">
                  {["Features", "Pricing", "Templates", "Integrations"].map(
                    (item, j) => (
                      <motion.li key={j} whileHover={{ x: 5 }}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {item}
                        </a>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
          <motion.div
            className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm">
              © 2023 ZyloSpace. All rights reserved.
            </p>
            <motion.div
              className="mt-4 md:mt-0 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="h-5 w-5 text-gray-400" />
              <a
                href="mailto:contact@zylospace.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                contact@zylospace.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
