import React, { useEffect, useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

interface AdvantageItemProps {
  iconClass: string;
  title: string;
  description: string;
}

import { motion } from "framer-motion";

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
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="advantage" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The <span className="gradient-text">ZyloSpace</span> Advantage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why leading brands choose ZyloSpace over traditional
            e-commerce platforms. We're not just another solution – we're your
            growth partner.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-slide-left">
            <img
              className="rounded-2xl shadow-xl"
              src="/assets/advantages.png"
              alt="comparison chart showing ZyloSpace vs competitors, modern infographic design, purple and blue gradients"
            />
          </div>
          <div className="space-y-8 animate-slide-right">
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
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
          <div className="grid lg:grid-cols-4 gap-8">
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
        </div>
      </div>
    </section>
  );
};

export default ZyloSpaceAdvantage;
