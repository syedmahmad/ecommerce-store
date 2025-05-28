'use client'
import React from "react";
import Header from "../_common/Header";
import MarketingHeader from "@/components/ui/MarkettingHeader";

const FeaturesPage = () => {
  return (
    <>
    <MarketingHeader />
      <div className="bg-white min-h-screen text-gray-800">
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

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Start your business journey today
            </h2>
            <p className="text-gray-600 mb-6">
              Join hundreds of entrepreneurs building stores without writing a
              single line of code.
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started Free
            </a>
          </div>
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
  <div className="border rounded-2xl p-6 shadow hover:shadow-md transition bg-white">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeaturesPage;
