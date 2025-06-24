import React from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Code,
} from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function MarketingFooter() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <motion.div whileHover={{ rotate: 15 }}>
                <Code className="h-6 w-6 mr-2 text-indigo-300" />
              </motion.div>
              <span className="font-bold text-xl">ZyloSpace</span>
            </div>
            <p className="text-gray-400">
              Comprehensive digital solutions for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, color: "text-blue-400" },
                { icon: Facebook, color: "text-blue-500" },
                { icon: Instagram, color: "text-pink-500" },
                { icon: Linkedin, color: "text-blue-300" },
                { icon: Github, color: "text-gray-300" },
              ].map(({ icon: Icon, color }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`${color} hover:text-white transition-colors`}
                  whileHover={{ y: -3 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Careers"].map((item, j) => (
                <motion.li key={j} whileHover={{ x: 5 }}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
              Development Services
            </h3>
            <ul className="space-y-3">
              {[
                "Web Applications",
                "UI/UX Design",
                "API Development",
                "Quality Assurance",
                "Technical Consulting",
              ].map((item, j) => (
                <motion.li key={j} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <a
                  href="mailto:contact@zylospace.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@zylospace.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <a
                  href="tel:+18005551234"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +92334 9998990
                </a>
              </motion.li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1141+F+Lake+City+Meadows+Phase+1+Lahore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start cursor-pointer mt-3"
                >
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400 hover:text-white transition-colors">
                    1141 F Lake City Meadows Phase 1 Lahore
                  </span>
                </motion.li>
              </a>
            </ul>
          </div>
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 ZyloSpace. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
