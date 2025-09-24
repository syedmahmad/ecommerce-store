"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import NewHeader from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

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

      <NewHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36 relative overflow-hidden bg-gradient-to-b from-indigo-50/30 to-white">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/assets/texture.png')] opacity-5" />
          </div>

          <div className="relative px-4 md:px-6 max-w-7xl mx-auto py-20">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

            <motion.div
              className="text-center relative z-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent"
                variants={fadeInUp}
              >
                Let’s Build Something <br className="hidden sm:block" />
                <span className="gradient-text">Great Together</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                className="max-w-2xl mx-auto text-gray-600 md:text-xl mt-6 leading-relaxed"
                variants={fadeInUp}
              >
                Our team of experts is ready to discuss your project and provide
                tailored solutions to help your business grow.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                variants={fadeInUp}
              >
                <Link href="#contact-form">
                  <Button className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 flex items-center gap-2 rounded-full">
                    Contact Us <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-2 rounded-full"
                  >
                    Our Services <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                className="mt-8 text-sm text-gray-500 flex justify-center items-center gap-6"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-green-500"></i>
                  Trusted by 500+ businesses
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-award text-yellow-500"></i>
                  Award-winning solutions
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Heading */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-6">
                How Can We Help?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether you're looking for a consultation, project estimate, or
                just have questions, our team is here to help you every step of
                the way.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-gray-600">
                    We value every inquiry and usually reply within{" "}
                    <span className="font-medium text-gray-900">
                      a few hours
                    </span>
                    . Choose the way that works best for you.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Contact Card - Email */}
                  <motion.div
                    className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-indigo-300 transition-all"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl mr-4 text-indigo-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email Us
                      </h4>
                      <p className="text-gray-600 mb-2 text-sm">
                        Perfect for detailed inquiries & project briefs
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
                    className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-blue-300 transition-all"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl mr-4 text-blue-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Call Us
                      </h4>
                      <p className="text-gray-600 mb-2 text-sm">
                        Speak directly with our solutions team
                      </p>
                      <a
                        href="tel:+447438463787"
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                      >
                        +44 7438 463787 <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Contact Card - Location */}
                  <motion.div
                    className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-purple-300 transition-all"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl mr-4 text-purple-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Visit Our Office
                      </h4>
                      <p className="text-gray-600 mb-2 text-sm">
                        Schedule an in-person consultation
                      </p>
                      <div className="text-gray-800 font-medium inline-flex items-center gap-1">
                        1141 F Lake City Meadows Phase 1 Lahore
                      </div>
                    </div>
                  </motion.div>

                  {/* Hours */}
                  <motion.div
                    className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-green-300 transition-all"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-3 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl mr-4 text-green-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Business Hours
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Fill out the form and we’ll get back to you as soon as
                  possible.
                </p>
                <ContactUsForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-t border-b border-gray-200">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            {/* Section Heading */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
                Our Global Headquarters
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Visit our offices or schedule a meeting with our executive team
                — we’re here worldwide to support your growth.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                🌍 Serving clients across 20+ countries
              </p>
            </motion.div>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-[16/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d293.5299935226838!2d74.3980872115754!3d31.442754635920792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190700747a58a5%3A0x90b32ad25139b4e1!2sFoodie%20Moodie%20Lake%20City%20Meadows%20Branch!5e0!3m2!1sen!2s!4v1754915915159!5m2!1sen!2s"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Location Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {["Pakistan", "London"].map((location, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl text-indigo-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900">
                      {location} Office
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Our {location} team specializes in local market solutions
                    and building strong regional partnerships.
                  </p>
                  <Button
                    variant="link"
                    className="text-indigo-600 p-0 h-auto hover:underline flex items-center gap-1 font-medium"
                  >
                    Contact {location} Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden">
          {/* Background accents */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-indigo-200 uppercase tracking-wide text-sm mb-2">
                Let’s Work Together
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-indigo-100 mb-8 text-lg max-w-3xl mx-auto">
                Schedule a free consultation with our experts to discuss your
                project requirements and discover how we can help you achieve
                your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-2xl bg-white text-indigo-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] gap-2"
                  >
                    Get Started <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
                <Link href="/pricing">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300 border-2 border-white text-white hover:bg-white/10 gap-2"
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
      <Footer />
    </div>
  );
};

export default ContactUsPage;

export const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    console.log("Form submitted:", formData);
    // try {
    //   const response = await axios.post("/api/send-email", formData);
    //   setSubmitStatus({
    //     success: true,
    //     message: "Message sent successfully! We will get back to you soon.",
    //   });
    //   // Reset form after successful submission
    //   setFormData({
    //     name: "",
    //     email: "",
    //     subject: "",
    //     service: "",
    //     message: "",
    //   });
    // } catch (error) {
    //   setSubmitStatus({
    //     success: false,
    //     message: "Failed to send message. Please try again later.",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
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
      {/* TODO: Will think on it... */}
      {/* 
      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitStatus.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )} */}

      <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
            value={formData.subject}
            onChange={handleChange}
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
            value={formData.service}
            onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Mail className="h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
