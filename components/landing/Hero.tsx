"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  slideUpVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants,
  buttonVariants,
  containerVariants,
  itemVariants,
  viewportOptions,
} from "@/constants/animations";

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 pt-24 pb-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-200 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ⭐
              </motion.span>
              #1 E-commerce Platform of 2024
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-900 leading-tight mb-6"
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Dream Store
              </span>{" "}
              In Minutes
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Launch your e-commerce empire with our industry-leading platform.
              No coding required. Enterprise-grade infrastructure. Unlimited
              growth potential.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start mb-10"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 overflow-hidden"
                onClick={() => router.push("/register")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  Start Building Now
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-sm text-neutral-600"
            >
              {[
                "14-day free trial",
                "No credit card required",
                "Cancel anytime",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                    className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRightVariants}
            className="relative"
          >
            {/* Floating background blobs */}
            <motion.div
              className="absolute -top-8 -right-8 w-72 h-72 bg-primary-300 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary-300 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Main Image */}
            <motion.div
              variants={scaleVariants}
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                <img
                  className="w-full h-auto"
                  src="/assets/hero-image.png"
                  alt="Modern e-commerce dashboard interface with purple and blue gradient, sleek design, multiple store analytics, clean UI"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
