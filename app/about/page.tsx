"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Zap,
  Code,
  Store,
  Smartphone,
  Globe,
  Shield,
  Users,
  Cpu,
  Database,
  Cloud,
  Server,
} from "lucide-react";
import MarketingHeader from "@/components/ui/MarkettingHeader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutPage = () => {
  const storeFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Setup",
      description: "Launch your online store literally with just one click",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "No-Code Platform",
      description: "Build visually without any technical skills",
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "Beautiful Templates",
      description: "Professionally designed templates that convert",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Perfect on every device automatically",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Built-In Security",
      description: "PCI-compliant payments and automatic updates",
    },
  ];

  const softwareServices = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Custom Development",
      description: "Tailored software solutions for your unique needs",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Enterprise Systems",
      description: "Scalable solutions for large organizations",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Solutions",
      description: "Secure, scalable cloud infrastructure",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "DevOps Services",
      description: "Streamlined deployment and operations",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Teams",
      description: "Expert developers working as your extended team",
    },
  ];

  return (
    <>
      <MarketingHeader />
      <div className="bg-white text-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Rocket className="w-4 h-4 mr-2" /> The easiest way to sell online
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Powering Businesses with{" "}
              <span className="text-indigo-600">Technology</span>
            </h1>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ZyloSpace offers two ways to help your business: our revolutionary
              one-click store builder for entrepreneurs, and custom software
              development services for businesses needing tailored solutions.
            </p>
          </motion.div>
        </section>

        {/* Store Builder Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Store Builder Platform
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The simplest way to launch your online store - no technical skills
              needed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:border-indigo-300 transition-all"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Click to Create
              </h3>
              <p className="text-gray-600">
                Start selling in seconds with our one-click store creation
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:border-indigo-300 transition-all"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Customize Visually
              </h3>
              <p className="text-gray-600">
                Drag and drop your way to a perfect store with no coding
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:border-indigo-300 transition-all"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Start Selling
              </h3>
              <p className="text-gray-600">
                Accept payments and manage orders immediately
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20"
          >
            {storeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center hover:border-indigo-300 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mb-20">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-indigo-700 transition"
            >
              Launch Your Store Now
            </motion.a>
            <p className="mt-4 text-gray-500 text-md font-bold">
              No credit card required. Try it free—build your store in minutes!
            </p>
          </div>
        </section>

        {/* Software Services Section */}
        {/* <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Custom Software Services
              </h2>
              <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                For businesses needing tailored solutions beyond our store
                builder platform
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
            >
              {softwareServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center hover:border-indigo-300 transition-all"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/services"
                className="inline-block bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md hover:bg-indigo-50 transition"
              >
                Explore Our Software Services
              </motion.a>
            </div>
          </div>
        </section> */}

        {/* Unified CTA */}
        {/* <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-10 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Whether you need a simple store or custom enterprise software,
              ZyloSpace has the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/register"
                className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Start Your Store
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact-us"
                className="inline-block bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
              >
                Talk to Our Experts
              </motion.a>
            </div>
          </motion.div>
        </section> */}
      </div>
    </>
  );
};

export default AboutPage;
