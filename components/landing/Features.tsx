"use client";

import React from "react";
// import { motion } from "framer-motion";
import { itemVariants, viewportOptions } from "@/constants/animations";

interface FeatureCardProps {
  iconClass: string;
  title: string;
  description: string;
  bulletPoints: string[];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconClass,
  title,
  description,
  bulletPoints,
  index,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      custom={index}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Icon with animation */}
      <motion.div
        className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 shadow-md"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.i
          className={`${iconClass} text-white text-2xl`}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
      </motion.div>

      <h3 className="text-2xl font-bold text-neutral-900 mb-4 relative z-10">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 relative z-10">{description}</p>

      <ul className="space-y-2 text-sm text-gray-600 relative z-10">
        {bulletPoints.map((point, idx) => (
          <motion.li
            key={idx}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOptions}
            transition={{ delay: 0.3 + idx * 0.1 }}
          >
            <motion.span
              className="mr-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewportOptions}
              transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
            >
              <i className="fa-solid fa-check text-success-500"></i>
            </motion.span>
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

interface InfrastructureFeatureProps {
  iconClass: string;
  title: string;
  description: string;
}

import { motion } from "framer-motion";

const InfrastructureFeature: React.FC<InfrastructureFeatureProps> = ({
  iconClass,
  title,
  description,
}) => (
  <motion.div
    className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer relative group overflow-hidden"
    variants={itemVariants}
    whileHover={{ scale: 1.03, y: -4 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {/* Animated background gradient */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />

    {/* Icon wrapper */}
    <motion.div
      className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md z-10"
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <i className={`${iconClass} text-white text-lg`} />
    </motion.div>

    {/* Text content */}
    <div className="relative z-10">
      <h4 className="font-semibold text-neutral-900 mb-1">{title}</h4>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-20"
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
        {/* Section Header */}
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
            Everything You Need to{" "}
            <span className="gradient-text">Succeed Online</span>
          </motion.h2>
          <motion.p
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our comprehensive e-commerce platform provides all the tools and
            features you need to build, launch, and scale your online business.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <FeatureCard
            iconClass="fa-solid fa-rocket"
            title="Launch in Minutes"
            description="Deploy a fully-functional online store within hours, not weeks. Our streamlined setup process gets you selling fast."
            bulletPoints={[
              "One-click store deployment",
              "Pre-configured payment gateways",
              "Automated SSL certificates",
            ]}
            index={0}
          />
          <FeatureCard
            iconClass="fa-solid fa-palette"
            title="Beautiful Themes"
            description="Choose from 100+ professionally designed, mobile-responsive themes that convert visitors into customers."
            bulletPoints={[
              "Mobile-first responsive design",
              "Customizable brand colors",
              "Advanced typography options",
            ]}
            index={1}
          />
          <FeatureCard
            iconClass="fa-solid fa-chart-line"
            title="Advanced Analytics"
            description="Make data-driven decisions with comprehensive analytics, real-time reporting, and AI-powered insights."
            bulletPoints={[
              "Real-time sales dashboard",
              "Customer behavior tracking",
              "Conversion optimization",
            ]}
            index={2}
          />
        </motion.div>

        {/* Infrastructure Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="text-3xl font-bold text-neutral-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Enterprise-Grade Infrastructure
            </motion.h3>
            <motion.p
              className="text-lg text-neutral-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Built on cloud-native architecture with enterprise security,
              scalability, and reliability. Handle millions of visitors and
              transactions without breaking a sweat.
            </motion.p>
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              <InfrastructureFeature
                iconClass="fa-solid fa-shield-alt"
                title="Bank-Level Security"
                description="PCI DSS compliant"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-server"
                title="Auto-Scaling"
                description="Handle traffic spikes"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-sync"
                title="Real-time Sync"
                description="Inventory management"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-search"
                title="SEO Optimized"
                description="Rank higher on Google"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
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
              className="relative rounded-2xl shadow-2xl"
              src="/assets/entrprise.png"
              alt="modern server infrastructure dashboard with real-time monitoring, cloud architecture visualization, purple and blue theme"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
