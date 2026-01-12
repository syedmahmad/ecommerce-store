"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { containerVariants, itemVariants, buttonVariants, viewportOptions } from "@/constants/animations";

const CTA: React.FC = () => {
  const router = useRouter();
  
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
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
        
        {/* Floating animated blobs */}
        {[
          { top: "20%", left: "10%", size: 32, delay: 0 },
          { top: "60%", right: "10%", size: 40, delay: 2 },
          { top: "50%", left: "25%", size: 24, delay: 4 },
          { top: "10%", right: "30%", size: 28, delay: 1 },
          { bottom: "20%", left: "50%", size: 36, delay: 3 },
        ].map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute w-${blob.size} h-${blob.size} bg-primary-400 rounded-full opacity-20 blur-2xl`}
            style={{
              top: blob.top,
              left: blob.left,
              right: blob.right,
              bottom: blob.bottom,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Ready to{" "}
            <motion.span
              className="bg-gradient-to-r from-primary-300 via-secondary-300 to-primary-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Transform
            </motion.span>{" "}
            Your Business?
          </motion.h2>
          
          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-primary-100 mb-12 leading-relaxed"
          >
            Join thousands of successful entrepreneurs who chose ZyloSpace.
            Start your 14-day free trial today and see why we're the #1 choice
            for online stores.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative px-10 py-5 rounded-full font-bold text-xl shadow-2xl bg-gradient-to-r from-primary-400 to-secondary-400 text-white overflow-hidden"
              onClick={() => router.push("/register")}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <span className="relative z-10 flex items-center gap-3">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
                Start Your Free Trial
              </span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-10 py-5 rounded-full font-bold text-xl border-2 border-primary-200 text-white hover:bg-white hover:text-primary-900 transition-all relative overflow-hidden group"
              onClick={() => router.push("/contact-us")}
            >
              <motion.span
                className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                initial={false}
              />
              <span className="relative z-10 flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  📅
                </motion.span>
                Schedule a Demo
              </span>
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-6 text-primary-200 text-base"
          >
            {[
              "14-day free trial",
              "No credit card required",
              "Setup in 5 minutes",
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <i className="fa-solid fa-check-circle text-success-400"></i>
                </motion.span>
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
