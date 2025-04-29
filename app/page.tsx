"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true, // animate only once
      offset: 120, // adjust how far from viewport before triggering
    });
  }, []);

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
                  {/* <Link href="/demo">
                    <Button variant="outline" size="lg">
                      View Demo
                    </Button>
                  </Link> */}
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
              {[
                {
                  icon: (
                    <>
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </>
                  ),
                  title: "Easy Product Management",
                  desc: "Upload photos, set prices, and manage inventory with a simple interface.",
                },
                {
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />,
                  title: "Secure Checkout",
                  desc: "Built-in payment processing with a secure and streamlined checkout experience.",
                },
                {
                  icon: (
                    <>
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </>
                  ),
                  title: "Mobile Friendly",
                  desc: "Manage your store and products from any device, including smartphones and tablets.",
                },
                {
                  icon: (
                    <>
                      <path d="M20 7h-9" />
                      <path d="M14 17H5" />
                      <circle cx="17" cy="17" r="3" />
                      <circle cx="7" cy="7" r="3" />
                    </>
                  ),
                  title: "Custom Domain",
                  desc: "Get your own subdomain or connect your custom domain for a professional look.",
                },
                {
                  icon: (
                    <>
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </>
                  ),
                  title: "Order Notifications",
                  desc: "Get notified instantly when customers place orders on your store.",
                },
                {
                  icon: (
                    <>
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </>
                  ),
                  title: "Sales Analytics",
                  desc: "Simple analytics to track your sales, popular products, and customer behavior.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-3 rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-delay={`${100 * (i + 1)}`}
                >
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/register"
                className="inline-block rounded-md bg-primary px-6 py-3 text-white font-semibold hover:bg-primary-dark transition"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">
          © 2025 StoreBuilder. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
