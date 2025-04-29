import React from "react";
import Header from "../_common/Header";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Launch your store instantly",
      "Basic customizable themes",
      "Secure & fast hosting",
      "Mobile-responsive design",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: [
      "Everything in Starter",
      "Advanced theme customization",
      "SEO tools & analytics",
      "Email & chat support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$49/mo",
    features: [
      "Everything in Pro",
      "Multi-store support",
      "Priority 24/7 support",
      "Custom domain + branding",
    ],
    cta: "Go Business",
    highlight: false,
  },
];

const PricingPage = () => {
  return (
    <>
      <Header />
      <div className="bg-white text-gray-800 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Whether you're just starting or scaling up, we’ve got a plan for
            you. No hidden fees. Cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-8 shadow-md transition ${
                  plan.highlight
                    ? "border-blue-600 shadow-lg bg-blue-50"
                    : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/register"
                  className={`inline-block w-full text-center px-4 py-3 rounded-lg font-medium ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 text-gray-600 text-sm">
            <p>
              Need help choosing a plan?{" "}
              <a href="/contact" className="text-blue-600 underline">
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
