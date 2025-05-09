"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

function FeatureCard({ title, description, icon }: any) {
  return (
    <div
      className="flex flex-col items-center space-y-3 rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
      data-aos="zoom-in"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <p className="text-gray-600 text-center text-sm">{description}</p>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
    });
  }, []);

  const features = [
    {
      title: "Easy Product Management",
      description:
        "Upload photos, set prices, and manage inventory with a simple interface.",
      icon: "🛒",
    },
    {
      title: "Secure Checkout",
      description:
        "Built-in payment processing with a secure and streamlined checkout experience.",
      icon: "🔒",
    },
    {
      title: "Mobile Friendly",
      description:
        "Manage your store and products from any device, including smartphones and tablets.",
      icon: "📱",
    },
    {
      title: "Custom Domain",
      description:
        "Get your own subdomain or connect your custom domain for a professional look.",
      icon: "🌐",
    },
    {
      title: "Order Notifications",
      description:
        "Get notified instantly when customers place orders on your store.",
      icon: "🔔",
    },
    {
      title: "Sales Analytics",
      description:
        "Simple analytics to track your sales, popular products, and customer behavior.",
      icon: "📊",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBag className="h-6 w-6 mr-2" />
          <span className="font-bold">StoreBuilder</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div
                className="flex flex-col justify-center space-y-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create your online store in minutes
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    No coding required. Upload products, set prices, and start
                    selling today with your own custom store.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div
                className="flex justify-end"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <img
                  alt="Store Builder Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                  src="/rightImage.png"
                  width={550}
                  height={650}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
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
                  Join hundreds of entrepreneurs building stores without writing
                  a single line of code.
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
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="px-4 md:px-6">
            <div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              data-aos="fade-up"
            >
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                  Features designed for non-technical users
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 md:text-lg">
                  Everything you need to create and manage your online store
                  without any coding knowledge.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
