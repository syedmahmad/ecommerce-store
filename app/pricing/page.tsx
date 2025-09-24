"use client";
import React from "react";
import NewHeader from "@/components/landing/Header";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Launch your store instantly",
      "Basic customizable themes",
      "Fast hosting",
      "SEO optimised",
      "Mobile-responsive design",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Enterprise", // Sounds more premium than "Custom"
    price: "Tailored Pricing", // More professional than "Quotation"
    features: [
      "Dedicated account manager",
      "Fully custom theme & branding",
      "Multi-store & wholesale support",
      "Enterprise-grade security & SLA",
      "Custom payment solutions",
      "Priority 24/7 support (1-hour response)",
    ],
    cta: "Get a Custom Quote →", // More action-oriented
    highlight: true, // Should be highlighted to draw attention
  },
  // {
  //   name: "Pro",
  //   price: "$19/mo",
  //   features: [
  //     "Everything in Starter",
  //     "Advanced theme customization",
  //     "SEO tools & analytics",
  //     "Email & chat support",
  //   ],
  //   cta: "Upgrade to Pro",
  //   highlight: true,
  // },
  // {
  //   name: "Business",
  //   price: "$49/mo",
  //   features: [
  //     "Everything in Pro",
  //     "Multi-store support",
  //     "Priority 24/7 support",
  //     "Custom domain + branding",
  //   ],
  //   cta: "Go Business",
  //   highlight: false,
  // },
];

const PricingPage = () => {
  return (
    <>
      <NewHeader />
      <div className="bg-white text-gray-900 min-h-screen mt-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you're just starting or scaling up, we’ve got a plan for
              you. No hidden fees. Cancel anytime.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`md:col-span-2 rounded-2xl p-8 shadow-md border transition hover:shadow-xl hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50"
                    : "bg-white border-gray-200"
                } ${idx === 0 ? "md:col-start-2" : ""}`}
              >
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-6 text-gray-900">
                  {plan.price}
                </p>
                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={
                    plan.name === "Enterprise" ? "/contact-us" : "/register"
                  }
                  className={`inline-block w-full text-center px-4 py-3 rounded-xl font-medium transition ${
                    plan.highlight
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-gray-600 text-sm">
            <p>
              Need help choosing a plan?{" "}
              <a
                href="/contact-us"
                className="text-purple-600 hover:text-blue-600 underline transition"
              >
                Contact our team
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;
