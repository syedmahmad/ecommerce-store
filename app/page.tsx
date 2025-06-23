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
  Github,
  MessageSquare,
  Settings,
  Rocket,
  Cloud,
  Globe,
  Smartphone,
  PenTool,
  Cpu,
  Shield,
  CreditCard,
  Database,
  ShoppingCart,
  Check,
  Code,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import MarketingHeader from "@/components/ui/MarkettingHeader";

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
    <>
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
          <motion.div
            className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-100 blur-3xl opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, 40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>

        <MarketingHeader />
        <main className="flex-1">
          {/* Hero Section with dual offerings */}
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
                    <motion.h2
                      className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Comprehensive Digital Solutions for Modern Businesses */}
                      {/* Launch Your E-Commerce Store in Minutes—No Code Needed */}
                      Launch a pro store today and start selling online
                    </motion.h2>
                    <motion.p
                      className="max-w-[600px] text-gray-600 md:text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Today’s the day! Launch your dream store today and start selling fast—no coding needed. Prefer hands-off? Our experts build it for you.
                      {/* ZyloSpace offers a dual approach to digital transformation: 
                      our instant e-commerce platform for rapid online presence 
                      and bespoke software development for tailored business solutions. 
                      Enterprise-grade technology made accessible. */}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-wrap gap-4"
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
                          Launch Your Store
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                            }}
                          >
                            <ShoppingCart className="ml-2 h-5 w-5" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/services">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="lg"
                          variant="outline"
                          className="px-8 py-6 text-lg border-2 border-gray-800 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
                        >
                          Explore Custom Solutions
                          {/* Build My Store Now */}
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                              delay: 0.3,
                            }}
                          >
                            <Code className="ml-2 h-5 w-5" />
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
                    alt="ZyloSpace Solutions"
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

          {/* Dual Offerings Section */}
          <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Integrated Digital Ecosystem
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  From turnkey e-commerce to enterprise-grade custom development, 
                  we provide end-to-end digital solutions to power your business growth
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Store Builder Card */}
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-all"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.15)",
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                      <ShoppingBag className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      ZyloSpace Commerce Platform
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Our industry-leading e-commerce solution enables businesses 
                    to deploy a fully-functional online store within hours. 
                    Designed for growth with enterprise capabilities.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Enterprise-grade store infrastructure",
                      "Pre-built responsive themes",
                      // "PCI-compliant payment processing",
                      "Real-time inventory synchronization",
                      "Advanced SEO optimization",
                      "Omnichannel retail capabilities",
                      "State of the art technology"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Software Services Card */}
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-blue-50 mr-4">
                      <Code className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Bespoke Software Development
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Our engineering team delivers custom digital solutions 
                    tailored to your unique business requirements. 
                    From concept to deployment, we transform ideas into 
                    scalable, secure, and high-performance applications.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      {
                        name: "E-commerce Systems",
                        icon: <CreditCard className="h-5 w-5" />,
                      },
                      {
                        name: "SaaS Platforms",
                        icon: <Cloud className="h-5 w-5" />,
                      },
                      {
                        name: "UX/UI Design",
                        icon: <PenTool className="h-5 w-5" />,
                      },
                      {
                        name: "API Integration",
                        icon: <Cpu className="h-5 w-5" />,
                      },
                      {
                        name: "Quality Assurance",
                        icon: <Shield className="h-5 w-5" />,
                      },
                      {
                        name: "Web Applications",
                        icon: <Globe className="h-5 w-5" />,
                      },
                      {
                        name: "Mobile Solutions",
                        icon: <Smartphone className="h-5 w-5" />,
                      },
                      {
                        name: "Cloud Architecture",
                        icon: <Database className="h-5 w-5" />,
                      },
                    ].map((service, i) => (
                      <div
                        key={i}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50"
                      >
                        <span className="text-blue-500 mr-2">
                          {service.icon}
                        </span>
                        <span className="text-gray-700 text-sm">
                          {service.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link href="/services">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center text-blue-600 font-medium"
                    >
                      Discover our development services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Link>
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
                  The ZyloSpace Advantage
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                  Combining the agility of SaaS products with the precision of 
                  custom engineering to deliver exceptional value
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
                    title: "Rapid Deployment",
                    description:
                      "Launch enterprise-ready solutions in minutes, not months, with our e-commerce platform.",
                    icon: "⚡",
                    color: "bg-purple-100",
                    borderColor: "border-purple-200",
                  },
                  {
                    title: "Tailored Solutions",
                    description:
                      "Custom-built applications designed specifically for your operational requirements.",
                    icon: "🛠️",
                    color: "bg-blue-100",
                    borderColor: "border-blue-200",
                  },
                  {
                    title: "Technical Excellence",
                    description:
                      "Architected by industry veterans with decades of combined experience.",
                    icon: "👨‍💻",
                    color: "bg-green-100",
                    borderColor: "border-green-200",
                  },
                  {
                    title: "Cross-Platform",
                    description:
                      "Flawless experience across all devices and operating systems.",
                    icon: "📱",
                    color: "bg-red-100",
                    borderColor: "border-red-200",
                  },
                  {
                    title: "Enterprise Scalability",
                    description:
                      "Solutions that grow with your business from startup to enterprise.",
                    icon: "📈",
                    color: "bg-yellow-100",
                    borderColor: "border-yellow-200",
                  },
                  {
                    title: "Dedicated Support",
                    description:
                      "24/7 technical assistance with guaranteed response times.",
                    icon: "🛎️",
                    color: "bg-indigo-100",
                    borderColor: "border-indigo-200",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`h-full p-6 rounded-xl border ${feature.color} ${feature.borderColor} transition-all duration-300 hover:border-opacity-50`}
                    >
                      <div
                        className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center text-3xl mb-5`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      <motion.div
                        className="w-8 h-1 rounded-full mt-4"
                        initial={{ backgroundColor: "#e2e8f0" }}
                        whileHover={{
                          width: 48,
                          backgroundColor: feature.borderColor
                            .replace("border-", "bg-")
                            .replace("-200", "-500"),
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
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
                  Ready to transform your digital strategy?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Whether you need an immediate e-commerce presence or 
                  sophisticated custom software, our solutions deliver measurable results.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/register">
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
                      }}
                    >
                      Begin Your Commerce Journey
                    </motion.div>
                  </Link>
                  <Link href="/contact-us">
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        boxShadow: `0 10px 25px -5px rgba(0,0,0,0.1)`,
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg bg-white border-2 border-gray-800"
                    >
                      Schedule Technical Consultation
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Proven Methodology
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  From initial concept to final deployment, our structured 
                  approach ensures successful digital transformation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "1. Discovery & Strategy",
                    description:
                      "Comprehensive needs assessment to align technology with your business objectives.",
                    icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
                    color: "bg-indigo-100",
                  },
                  {
                    title: "2. Solution Architecture",
                    description:
                      "Custom development or platform configuration based on your requirements.",
                    icon: <Settings className="h-8 w-8 text-blue-600" />,
                    color: "bg-blue-100",
                  },
                  {
                    title: "3. Deployment & Growth",
                    description:
                      "Seamless implementation followed by continuous optimization and scaling.",
                    icon: <Rocket className="h-8 w-8 text-green-600" />,
                    color: "bg-green-100",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-8 rounded-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div
                      className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          {/* <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Trusted by Industry Leaders
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Organizations worldwide leverage ZyloSpace solutions to drive 
                  digital innovation and business growth
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    rating: "★★★★★",
                    quote:
                      "ZyloSpace's commerce platform reduced our time-to-market by 80% while providing enterprise capabilities we couldn't find elsewhere at this price point.",
                    name: "Sarah Johnson",
                    business: "Global Retail Chain",
                    type: "store",
                  },
                  {
                    rating: "★★★★★",
                    quote:
                      "Their custom development team delivered a complex inventory management system that integrated seamlessly with our legacy ERP, saving us $250k annually in operational costs.",
                    name: "Michael Chen",
                    business: "Manufacturing Conglomerate",
                    type: "software",
                  },
                  {
                    rating: "★★★★☆",
                    quote:
                      "The combination of their e-commerce platform and custom API development gave us the perfect hybrid solution for our multi-brand retail operation.",
                    name: "Emma Rodriguez",
                    business: "Luxury Goods Group",
                    type: "both",
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
                      <div className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {testimonial.type === "store"
                          ? "Commerce Platform"
                          : testimonial.type === "software"
                          ? "Custom Development"
                          : "Integrated Solution"}
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
          </section> */}

          {/* CTA Section */}
          <section className="w-full py-20 bg-gradient-to-r from-indigo-500 to-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Accelerate Your Digital Transformation?
                </h2>
                <p className="text-indigo-100 max-w-2xl mx-auto mb-8 text-lg">
                  Whether you need rapid e-commerce deployment or sophisticated 
                  custom software, our team delivers exceptional results
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-xl bg-white text-indigo-600 hover:bg-gray-50"
                    >
                      Start Free Platform Trial
                    </motion.div>
                  </Link>
                  <Link href="/contact-us">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-xl bg-transparent border-2 border-white text-white hover:bg-white/10"
                    >
                      Consult with Our Architects
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="flex items-center">
                  <motion.div whileHover={{ rotate: 15 }}>
                    <Code className="h-6 w-6 mr-2 text-indigo-300" />
                  </motion.div>
                  <span className="font-bold text-xl">ZyloSpace</span>
                </div>
                <p className="text-gray-400">
                  Comprehensive digital solutions for businesses of all sizes.
                </p>
                <div className="flex space-x-4">
                  {[Twitter, Facebook, Instagram, Linkedin, Github].map(
                    (Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ y: -3, color: "#a5b4fc" }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    )
                  )}
                </div>
              </div>

              {/* Store Builder Links */}
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
                  Commerce Platform
                </h3>
                <ul className="space-y-3">
                  {[
                    "Features",
                    "Pricing",
                    "Templates",
                    "Case Studies",
                    "Integrations",
                  ].map((item, j) => (
                    <motion.li key={j} whileHover={{ x: 5 }}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
                  Development Services
                </h3>
                <ul className="space-y-3">
                  {[
                    "Web Applications",
                    "Mobile Solutions",
                    "UI/UX Design",
                    "API Development",
                    "Quality Assurance",
                    "Technical Consulting",
                  ].map((item, j) => (
                    <motion.li key={j} whileHover={{ x: 5 }}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
                  Enterprise
                </h3>
                <ul className="space-y-3">
                  {[
                    "About Us",
                    "Leadership",
                    "Careers",
                    "Press",
                    "Contact",
                    "Legal",
                  ].map((item, j) => (
                    <motion.li key={j} whileHover={{ x: 5 }}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-400 text-sm">
                © 2025 ZyloSpace Technologies. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <motion.div
                  className="flex items-center space-x-2"
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
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a
                    href="tel:+92334 9998990"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    +92334 9998990
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}