"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants, containerVariants, viewportOptions } from "@/constants/animations";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <motion.li
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
  >
    <a
      href={href}
      className="hover:text-white transition-colors cursor-pointer block"
    >
      {children}
    </a>
  </motion.li>
);

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-neutral-900 text-white py-16 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-5 gap-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white text-lg">🚀</span>
              </motion.div>
              <span className="text-2xl font-bold">ZyloSpace</span>
            </motion.div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              The world's leading e-commerce platform. Build, launch, and scale
              your online business with our comprehensive suite of tools and
              services.
            </p>
            <div className="flex gap-4">
              {[
                { icon: "fa-brands fa-twitter", color: "#1DA1F2" },
                { icon: "fa-brands fa-facebook", color: "#1877F2" },
                { icon: "fa-brands fa-linkedin", color: "#0077B5" },
                { icon: "fa-brands fa-instagram", color: "#E4405F" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.1 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3 text-neutral-400">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="#integrations">Integrations</FooterLink>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-neutral-400">
              <FooterLink href="/contact-us">Contact Support</FooterLink>
              <FooterLink href="/contact-us">Migration Help</FooterLink>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-neutral-400">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-neutral-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-neutral-400 mb-4 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6 }}
            >
              © {new Date().getFullYear()} ZyloSpace. All rights reserved.
            </motion.p>
            <motion.div
              className="flex gap-6 text-sm text-neutral-400"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6 }}
            >
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
