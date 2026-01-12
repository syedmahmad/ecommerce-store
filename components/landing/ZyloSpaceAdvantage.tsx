"use client";

import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, viewportOptions } from "@/constants/animations";

interface AdvantageItemProps {
  iconClass: string;
  title: string;
  description: string;
}

const AdvantageItem: React.FC<AdvantageItemProps> = ({
  iconClass,
  title,
  description,
}) => (
  <motion.div
    className="flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -5 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {/* Icon wrapper */}
    <motion.div
      className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.i
        className={`${iconClass} text-white text-lg`}
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.6 } }}
      />
    </motion.div>

    {/* Text content */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

interface MetricCardProps {
  iconClass: string;
  value: string;
  label: string;
  delay: string;
}

// import { motion } from "framer-motion";

const MetricCard: React.FC<MetricCardProps> = ({
  iconClass,
  value,
  label,
  delay,
}) => {
  return (
    <motion.div
      className="text-center p-6 rounded-2xl bg-white shadow-md cursor-pointer relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.6, delay: parseFloat(delay), ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Gradient glow border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        <i className={`${iconClass} text-3xl text-white`} />
      </motion.div>

      {/* Text */}
      <h4 className="text-xl font-bold text-gray-900 mb-2 relative z-10">
        {value}
      </h4>
      <p className="text-gray-600 relative z-10">{label}</p>
    </motion.div>
  );
};

const ZyloSpaceAdvantage: React.FC = () => {
  return (
    <section id="advantage" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The <span className="gradient-text">ZyloSpace</span> Advantage
          </motion.h2>
          <motion.p
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover why leading brands choose ZyloSpace over traditional
            e-commerce platforms. We're not just another solution – we're your
            growth partner.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl blur-2xl opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img
              className="relative rounded-2xl shadow-xl"
              src="/assets/advantages.png"
              alt="comparison chart showing ZyloSpace vs competitors, modern infographic design, purple and blue gradients"
            />
          </motion.div>
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <AdvantageItem
              iconClass="fa-solid fa-bolt"
              title="Lightning-Fast Setup"
              description="While others take weeks, we get you live in hours. Our AI-powered setup wizard handles the technical complexity."
            />
            <AdvantageItem
              iconClass="fa-solid fa-code"
              title="Zero Coding Required"
              description="Build professional stores with our visual editor. No HTML, CSS, or JavaScript knowledge needed."
            />
            <AdvantageItem
              iconClass="fa-solid fa-expand-arrows-alt"
              title="Unlimited Scalability"
              description="From startup to enterprise. Our platform grows with you, handling millions of products and customers."
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
            animate={{
              backgroundPosition: ['0 0', '30px 30px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            <MetricCard
              iconClass="fa-solid fa-clock"
              value="< 2min"
              label="Average response time"
              delay="0s"
            />
            <MetricCard
              iconClass="fa-solid fa-mobile-alt"
              value="Mobile-First"
              label="Optimized for mobile commerce"
              delay="0.1s"
            />
            <MetricCard
              iconClass="fa-solid fa-globe"
              value="Global Reach"
              label="Multi-currency & multi-language"
              delay="0.2s"
            />
            <MetricCard
              iconClass="fa-solid fa-headset"
              value="24/7 Support"
              label="Expert help when you need it"
              delay="0.3s"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ZyloSpaceAdvantage;
