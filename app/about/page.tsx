import React from "react";
import Header from "../_common/Header";

const AboutPage = () => {
  return (
    <>
      <Header />

      <div className="bg-white text-gray-800 min-h-screen">
        <section className="bg-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-blue-700 mb-6">About Us</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We're on a mission to make online business accessible to everyone
              — no tech experience needed. Our platform empowers entrepreneurs
              to launch beautiful, customizable stores in just minutes.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20 space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that everyone should have the tools to bring their
                business idea to life. Our mission is to simplify the journey of
                starting and growing an online store, offering a no-code
                platform that’s fast, flexible, and secure.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where anyone — from small business owners to
                creators — can build their online presence without barriers.
                We’re building a future where e-commerce is effortless,
                inclusive, and empowering.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-10 text-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              What Makes Us Different?
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              From easy customization to lightning-fast hosting and built-in
              security, our platform is designed for ease without sacrificing
              performance.
            </p>
          </div>

          <div className="text-center pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">
              Ready to launch your store?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our growing community and take your business online today.
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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
