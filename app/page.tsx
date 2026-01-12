"use client";

import React from "react";
import { motion } from "framer-motion";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SuccessStories from "@/components/landing/SuccessStories";
import SupportResources from "@/components/landing/SupportResources";
import TechnologyStack from "@/components/landing/TechnologyStack";
import TemplatesShowcase from "@/components/landing/TemplatesShowcase";
import ZyloSpaceAdvantage from "@/components/landing/ZyloSpaceAdvantage";
import { fadeInVariants, viewportOptions } from "@/constants/animations";

const Home: React.FC = () => {
  return (
    <div className="w-full relative bg-white flex flex-col min-h-screen">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary gradient blob */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary gradient blob */}
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Additional floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0 0', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <Header />
      
      <main className="flex-grow overflow-y-auto">
        {/* Hero Section - No wrapper needed, handles its own animations */}
        <Hero />

        {/* Features Section - Enhanced with slide up */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <Features />
        </motion.section>

        {/* ZyloSpace Advantage - Slide from left */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <ZyloSpaceAdvantage />
        </motion.section>

        {/* Templates Showcase - Scale in */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <TemplatesShowcase />
        </motion.section>

        {/* Technology Stack - Slide from right */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <TechnologyStack />
        </motion.section>

        {/* Success Stories - Fade in */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <SuccessStories />
        </motion.section>

        {/* Support Resources - Slide up */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <SupportResources />
        </motion.section>

        {/* CTA - Enhanced animation */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInVariants}
        >
          <CTA />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
