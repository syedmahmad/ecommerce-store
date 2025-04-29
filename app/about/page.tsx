import React from "react";
import Header from "../_common/Header";

const AboutPage = () => {
  return (
    <>
      <Header />

      <div className="bg-white min-h-screen text-gray-800">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We're on a mission to make online business accessible to everyone —
            no tech experience needed. Our platform empowers entrepreneurs to
            launch beautiful, customizable stores in just minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We believe that everyone should have the tools to bring their
                business idea to life. Our mission is to simplify the journey of
                starting and growing an online store, offering a no-code
                platform that’s fast, flexible, and secure.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a world where anyone — from small business owners to
                creators — can build their online presence without barriers.
                We’re building a future where e-commerce is effortless,
                inclusive, and empowering.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow text-center mb-16">
            <h3 className="text-xl font-semibold mb-2">
              What Makes Us Different?
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From drag-and-drop customization to lightning-fast hosting and
              built-in security, our platform is designed for ease without
              sacrificing performance.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to launch your store?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our growing community and take your business online today.
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
