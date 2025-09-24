"use client";
import NewHeader from "@/components/landing/Header";
import React from "react";
import { motion } from "framer-motion";

const FeaturesPage = () => {
  return (
    <>
      <NewHeader />
      <div className="bg-white min-h-screen text-gray-800 mt-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-6">
            Launch Your Online Store in Minutes
          </h1>
          <p className="text-center text-lg text-gray-600 mb-12">
            No coding required. Just sign up, choose a theme, and go live.
          </p>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="One-Click Store Setup"
              description="Sign up and get your store online instantly. No technical skills needed."
              icon="🛍️"
            />
            <FeatureCard
              title="Beautiful, Customizable Themes"
              description="Pick from a variety of modern themes and customize them any time."
              icon="🎨"
            />
            <FeatureCard
              title="Secure and Fast Hosting"
              description="Your store is protected and optimized for speed, giving customers a smooth experience."
              icon="⚡"
            />
            <FeatureCard
              title="Mobile-Ready Design"
              description="Looks stunning on any device – phones, tablets, or desktops."
              icon="📱"
            />
            <FeatureCard
              title="Built-in SEO Tools"
              description="Improve your visibility on Google and attract more customers organically."
              icon="🔍"
            />
            <FeatureCard
              title="24/7 Support"
              description="Need help? Our team is always here to assist you whenever you need it."
              icon="🛎️"
            />
          </div>
          <section className="relative mt-20 text-center py-16 px-6 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl shadow-lg overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-indigo-100 uppercase tracking-wide text-sm mb-3">
                🚀 Get Started Today
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start your business journey today
              </h2>
              <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
                Join hundreds of entrepreneurs building stores without writing a
                single line of code.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 rounded-xl font-semibold text-white shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition"
                >
                  Get Started Free
                </motion.a>
                <a
                  href="/pricing"
                  className="inline-block px-8 py-4 rounded-xl font-medium border-2 border-white text-white hover:bg-white/10 transition"
                >
                  View Pricing
                </a>
              </div>
            </motion.div>
          </section>
        </section>
      </div>
    </>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <motion.div
    className="relative border rounded-2xl p-8 shadow-md bg-white cursor-pointer group overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -5 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {/* Glow background on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />

    {/* Icon */}
    <div className="relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
      <span className="text-3xl text-white">{icon}</span>
    </div>

    {/* Content */}
    <h3 className="relative text-xl font-semibold mb-3 text-gray-900">
      {title}
    </h3>
    <p className="relative text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default FeaturesPage;
