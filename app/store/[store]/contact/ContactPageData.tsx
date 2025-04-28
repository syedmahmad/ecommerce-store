import { StoreLayout } from "@/components/store-layout";
import React from "react";

export const ContactPageData = () => {
  const storeName = "Demo Store";

  return (
    <StoreLayout storeName={storeName}>
      <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4 py-12">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Get in Touch
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Have questions or feedback? Fill out the form and we'll get back to
            you soon.
          </p>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </StoreLayout>
  );
};
