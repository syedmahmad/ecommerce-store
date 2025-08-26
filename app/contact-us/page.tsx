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
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import MarketingFooter from "@/components/ui/MarkettingFooter";
import { useState } from "react";

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
                        href="tel:+447438463787"
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                      >
                        +44 7438 463787 <ArrowRight className="h-4 w-4" />
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
                        {/* 1141 F Lake City Meadows Phase 1 Lahore{" "} */}
                        Flat 16, wollstonecraft mansions, 6 fielders crescent, Barking. Post code: IG11 0BE
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
              <ContactUsForm />
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

            <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-8">
              {["Pakistan", "London"].map((location, i) => (
                <motion.div
                  key={i}
                  className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 ${
                    i === 0 ? "md:col-start-2" : ""
                  }`}
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
      <MarketingFooter />
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
