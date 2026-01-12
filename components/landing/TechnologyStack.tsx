"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants, viewportOptions } from "@/constants/animations";

interface TechFeatureProps {
  iconClass: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const TechFeature: React.FC<TechFeatureProps> = ({
  gradientFrom,
  gradientTo,
  iconClass,
  title,
  description,
}) => (
  <motion.div
    className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -3 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {/* Icon wrapper */}
    <motion.div
      className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-md`}
      whileHover={{ rotate: 8, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
    >
      <i className={`${iconClass} text-white text-2xl`} />
    </motion.div>

    {/* Text */}
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

interface TechIconProps {
  iconClass: string;
  label: string;
  color?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ iconClass, label, color }) => (
  <motion.div
    className="text-center cursor-pointer"
    variants={itemVariants}
    whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.i
      className={`${iconClass} text-4xl mb-2`}
      style={{ color: color || "#9CA3AF" }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    ></motion.i>
    <p className="text-sm text-neutral-600">{label}</p>
  </motion.div>
);

const TechnologyStack: React.FC = () => {
  return (
    <section
      id="technology"
      className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-secondary-200 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
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
            Built with{" "}
            <span className="gradient-text">Cutting-Edge Technology</span>
          </motion.h2>
          <motion.p
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our platform leverages the latest technologies to ensure your store
            is fast, secure, and scalable. Experience the future of e-commerce
            today.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <TechFeature
              iconClass="fa-solid fa-cloud"
              title="Cloud-Native Architecture"
              description="Built on modern cloud infrastructure for maximum reliability and performance."
              gradientFrom="from-primary-500"
              gradientTo="to-secondary-500"
            />
            <TechFeature
              iconClass="fa-solid fa-robot"
              title="AI-Powered Features"
              description="Machine learning algorithms optimize your store performance and customer experience."
              gradientFrom="from-green-500"
              gradientTo="to-teal-500"
            />
            <TechFeature
              iconClass="fa-solid fa-shield-alt"
              title="Enterprise Security"
              description="Bank-level encryption and security protocols protect your business and customers."
              gradientFrom="from-orange-500"
              gradientTo="to-red-500"
            />
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
              src="/assets/technology-image.png"
              alt="modern technology stack visualization, cloud infrastructure, AI components, security layers, purple and blue theme"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-6 gap-8 items-center opacity-60"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 0.6,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <TechIcon
            iconClass="fa-brands fa-aws"
            label="AWS Cloud"
            color="#FF9900"
          />
          <TechIcon
            iconClass="fa-brands fa-docker"
            label="Docker"
            color="#2496ED"
          />
          <TechIcon
            iconClass="fa-brands fa-react"
            label="React"
            color="#61DAFB"
          />
          <TechIcon
            iconClass="fa-brands fa-node-js"
            label="Node.js"
            color="#339933"
          />
          <TechIcon
            iconClass="fa-solid fa-database"
            label="MongoDB"
            color="#47A248"
          />
          <TechIcon
            iconClass="fa-solid fa-lock"
            label="SSL/TLS"
            color="#000000"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
