"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants, cardHoverVariants, viewportOptions } from "@/constants/animations";

interface TemplateCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  variations: string;
  index: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  variations,
  index,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      custom={index}
      className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 overflow-hidden border border-white/20 hover:border-white/40 transition-all"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
      
      {/* Image with hover effect */}
      <motion.div
        className="relative rounded-xl mb-6 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img className="w-full h-auto" src={imageSrc} alt={imageAlt} />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      </motion.div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-primary-200 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <motion.span
            className="text-sm text-primary-300"
            whileHover={{ scale: 1.1 }}
          >
            {variations} variations
          </motion.span>
          <motion.div
            className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TemplatesShowcase: React.FC = () => {
  return (
    <section
      id="templates"
      className="py-20 bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 text-white relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stunning Templates for Every Industry
          </motion.h2>
          <motion.p
            className="text-xl text-primary-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose from our curated collection of professional templates. Each
            one is optimized for conversions and designed by world-class
            designers.
          </motion.p>
        </motion.div>

        {/* Template Cards Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
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
          <TemplateCard
            imageSrc="/assets/template1.png"
            imageAlt="modern fashion e-commerce template, clean design, purple accents, product showcase"
            title="Fashion & Apparel"
            description="Perfect for clothing brands and fashion retailers"
            variations="12"
            index={0}
          />
          <TemplateCard
            imageSrc="/assets/template2.png"
            imageAlt="electronics e-commerce template, tech-focused design, blue gradients, product grid"
            title="Electronics & Tech"
            description="Showcase gadgets and technology products"
            variations="8"
            index={1}
          />
          <TemplateCard
            imageSrc="/assets/template3.png"
            imageAlt="home decor e-commerce template, elegant design, warm colors, lifestyle products"
            title="Home & Lifestyle"
            description="Beautiful templates for home goods and decor"
            variations="15"
            index={2}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;
