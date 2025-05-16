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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function FeatureCard({ title, description, icon }: any) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center space-y-4 rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1.5 hover:border-gray-200"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 text-3xl mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 text-center">
        {title}
      </h3>
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
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBag className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-bold text-gray-900 text-lg">ZyloSpace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            href="/about"
          >
            About
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-gray-300">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Create your online store in minutes
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-lg">
                    No coding required. Upload products, set prices, and start
                    selling today with your own custom store.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  alt="ZyloSpace Dashboard"
                  className="rounded-xl object-cover shadow-xl border border-gray-200"
                  src="/rightImage.png"
                  width={550}
                  height={650}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
                <motion.div key={index} variants={fadeInUp}>
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
              <Link
                href="/register"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </section>

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
                <motion.div key={index} variants={fadeInUp}>
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

        {/* Testimonial Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Entrepreneurs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear what our customers say about ZyloSpace
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "ZyloSpace helped me launch my store in just one afternoon.
                  The interface is so intuitive and the support team is
                  amazing!"
                </p>
                <div className="flex items-center">
                  <div className="font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-500 text-sm ml-auto">
                    Fashion Boutique
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "As someone with no tech background, I was amazed at how easy
                  ZyloSpace made it to create a professional online store."
                </p>
                <div className="flex items-center">
                  <div className="font-medium text-gray-900">Michael Chen</div>
                  <div className="text-gray-500 text-sm ml-auto">
                    Home Goods
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★☆</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "The analytics dashboard gives me exactly the insights I need
                  to grow my business. Highly recommended for small businesses!"
                </p>
                <div className="flex items-center">
                  <div className="font-medium text-gray-900">
                    Emma Rodriguez
                  </div>
                  <div className="text-gray-500 text-sm ml-auto">
                    Artisan Crafts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center">
                <ShoppingBag className="h-6 w-6 mr-2 text-blue-400" />
                <span className="font-bold text-xl">ZyloSpace</span>
              </div>
              <p className="text-gray-400">
                The easiest way to create your online store and start selling
                today.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 ZyloSpace. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <a
                href="mailto:contact@zylospace.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                contact@zylospace.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
