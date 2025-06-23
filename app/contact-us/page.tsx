"use client";
import MarketingHeader from "@/components/ui/MarkettingHeader";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Code,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ContactUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Subtle animated background elements */}
      <motion.div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-indigo-50 blur-3xl opacity-30"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-30"
          animate={{
            y: [0, -60, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <MarketingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36 relative overflow-hidden bg-gradient-to-b from-indigo-50/30 to-white">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/assets/texture.png')] opacity-5" />
          </div>

          <div className="px-4 md:px-6 max-w-7xl mx-auto">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                variants={fadeInUp}
              >
                Let's Build Something Great Together
              </motion.h1>
              <motion.p
                className="max-w-2xl mx-auto text-gray-600 md:text-xl mt-6"
                variants={fadeInUp}
              >
                Our team of experts is ready to discuss your project and provide
                tailored solutions to meet your business needs.
              </motion.p>
              <motion.div
                className="mt-8 flex justify-center gap-4"
                variants={fadeInUp}
              >
                <Link href="#contact-form">
                  <Button className="px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                    Contact Us <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                  >
                    Our Services <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Can We Help?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Whether you're looking for a consultation, project estimate, or
                just have questions, we're here to help.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Connect With Us
                  </h2>
                  <p className="text-gray-600">
                    We value every inquiry and strive to respond within 24
                    hours. Choose the most convenient way to reach our team.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Contact Card - Email */}
                  <motion.div
                    className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors border border-gray-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-indigo-100 rounded-lg mr-4 text-indigo-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Email Us
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Ideal for detailed inquiries and project briefs
                      </p>
                      <a
                        href="mailto:contact@zylospace.com"
                        className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                      >
                        contact@zylospace.com <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Contact Card - Phone */}
                  <motion.div
                    className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-blue-100 rounded-lg mr-4 text-blue-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Call Us
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Speak directly with our solutions team
                      </p>
                      <a
                        href="tel:+923349998990"
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                      >
                        +92 (334) 999-8990 <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Contact Card - Location */}
                  <motion.div
                    className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-purple-100 rounded-lg mr-4 text-purple-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Visit Our Office
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Schedule an in-person consultation
                      </p>
                      <div className="text-gray-800 inline-flex items-center gap-1">
                        1141 F Lake City Meadows Phase 1 Lahore{" "}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Hours */}
                  <motion.div
                    className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-green-100 rounded-lg mr-4 text-green-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Business Hours
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-gray-600">
                        <div>Monday - Friday</div>
                        <div className="font-medium">9:00 AM - 5:00 PM</div>
                        <div>Saturday</div>
                        <div className="font-medium">10:00 AM - 2:00 PM</div>
                        <div>Sunday</div>
                        <div className="font-medium">Closed</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                id="contact-form"
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you promptly.
                  </p>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a service</option>
                      <option value="store">Online Store Builder</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="saas">SaaS Development</option>
                      <option value="design">UI/UX Design</option>
                      <option value="api">API Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 text-gray-400">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, timeline, and budget..."
                        className="pl-10 min-h-[150px]"
                        required
                      />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Mail className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Our Global Headquarters
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit our office or schedule a meeting with our executive team
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
            >
              {/* Replace with your actual map embed */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('/assets/map-placeholder.jpg')] bg-cover bg-center opacity-80"></div>
                <div className="relative z-10 text-center p-8 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                  <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ZyloSpace HQ
                  </h3>
                  <p className="text-gray-700 mb-1">1141 F-Block Streat</p>
                  <p className="text-gray-700">Lake City Meadows Phase 1 Lahore</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-8">
              {["Pakistan", "London"].map((location, i) => (
                <motion.div
                  key={i}
                  className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 ${i === 0 ? "md:col-start-2" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {location} Office
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Our {location} team specializes in local market solutions
                    and regional partnerships.
                  </p>
                  <Button
                    variant="link"
                    className="text-indigo-600 p-0 h-auto hover:underline flex items-center gap-1"
                  >
                    Contact {location} Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-indigo-100 mb-8 text-lg max-w-3xl mx-auto">
                Schedule a free consultation with our experts to discuss your
                project requirements and discover how we can help you achieve
                your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="#contact-form">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-xl bg-white text-indigo-600 hover:bg-gray-50 gap-2"
                  >
                    Get Started <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
                <Link href="/pricing">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-xl bg-transparent border-2 border-white text-white hover:bg-white/10 gap-2"
                  >
                    View Pricing <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                {["About Us", "Careers", "Case Studies", "Press"].map(
                  (item, j) => (
                    <motion.li key={j} whileHover={{ x: 5 }}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  "Blog",
                  "Documentation",
                  "Webinars",
                  "Community",
                  "Help Center",
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
                    +1 (800) 555-1234
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">123 Tech Street, SF</span>
                </motion.li>
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
    </div>
  );
};

export default ContactUsPage;
