"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import NewHeader from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function CareersPage() {
  return (
    <>
      <NewHeader />
      <CareerMetaData />
      <Footer />
    </>
  );
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const CareerMetaData = () => {
  return (
    <div className="min-h-screen bg-white mt-20">
      <Head>
        <title>Join Our Team - Senior Full Stack Developer</title>
        <meta
          name="description"
          content="We're hiring a Senior Full Stack Developer with 6+ years experience in Node, Nest, React, Next.js and Relay Modern"
        />
      </Head>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="show"
        className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <motion.h1
                    variants={slideUp}
                    className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                  >
                    <span className="block">Join Our</span>
                    <span className="block text-indigo-200">
                      Engineering Team
                    </span>
                  </motion.h1>
                  <motion.p
                    variants={slideUp}
                    className="mt-3 text-base text-indigo-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  >
                    We're looking for a talented Senior Full Stack Developer to
                    help us build the future of web applications.
                  </motion.p>
                  <motion.div
                    variants={slideUp}
                    className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  >
                    <div className="rounded-md shadow">
                      <Link
                        href="#apply"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Description */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.p
              variants={item}
              className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
            >
              Current Opening
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Senior Full Stack Developer
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
            >
              6+ years experience with Node, Nest, React, Next.js and Relay
              Modern
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <motion.div variants={item}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  About the Role
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  We're looking for an experienced Full Stack Developer to join
                  our growing engineering team. You'll work on building and
                  scaling our web applications, implementing new features, and
                  improving performance.
                </p>
              </motion.div>
              <motion.div variants={item}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Location
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Remote or in our beautiful offices in [Your Location]. We
                  offer flexible work arrangements to suit your lifestyle.
                </p>
              </motion.div>
            </div>

            <motion.div variants={item} className="mt-12">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Key Responsibilities
              </h3>
              <ul className="mt-4 list-disc list-inside text-base text-gray-500 space-y-2">
                <li>
                  Design and implement scalable backend services using Node.js
                  and NestJS
                </li>
                <li>
                  Develop responsive, performant frontend applications with
                  React, Next.js and Relay Modern
                </li>
                <li>
                  Collaborate with product managers and designers to deliver
                  exceptional user experiences
                </li>
                <li>Mentor junior developers and promote best practices</li>
                <li>Optimize applications for maximum speed and scalability</li>
                <li>Implement automated testing and CI/CD pipelines</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="mt-12">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Requirements
              </h3>
              <ul className="mt-4 list-disc list-inside text-base text-gray-500 space-y-2">
                <li>
                  6+ years of professional software development experience
                </li>
                <li>Expertise in Node.js and modern JavaScript/TypeScript</li>
                <li>Strong experience with NestJS framework</li>
                <li>Proficiency in React, Next.js and Relay Modern</li>
                <li>Experience with GraphQL APIs and state management</li>
                <li>Knowledge of database systems (SQL and NoSQL)</li>
                <li>Familiarity with cloud platforms (AWS, GCP, or Azure)</li>
                <li>Excellent problem-solving and communication skills</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="mt-12">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Nice to Have
              </h3>
              <ul className="mt-4 list-disc list-inside text-base text-gray-500 space-y-2">
                <li>Experience with microservices architecture</li>
                <li>Knowledge of containerization (Docker, Kubernetes)</li>
                <li>Contributions to open source projects</li>
                <li>Experience with performance optimization techniques</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="mt-12">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                What We Offer
              </h3>
              <ul className="mt-4 list-disc list-inside text-base text-gray-500 space-y-2">
                <li>Competitive salary and equity options</li>
                <li>Flexible work arrangements</li>
                <li>Professional development budget</li>
                <li>Health, dental, and vision insurance</li>
                <li>Generous vacation policy</li>
                <li>Latest tech equipment</li>
                <li>Dynamic, inclusive company culture</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Application Form */}
      <motion.div
        id="apply"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={container} className="lg:text-center">
            <motion.p
              variants={item}
              className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
            >
              Apply Now
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Ready to join our team?
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
            >
              We're excited to hear from you. Please fill out the form below and
              we'll get back to you soon.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 sm:mt-12"
          >
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <motion.div variants={item}>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                  />
                </div>
              </motion.div>
              <motion.div variants={item}>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                  />
                </div>
              </motion.div>
              <motion.div variants={item} className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                  />
                </div>
              </motion.div>
              <motion.div variants={item} className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                  />
                </div>
              </motion.div>
              <motion.div variants={item} className="sm:col-span-2">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition duration-300">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={item} className="sm:col-span-2">
                <label
                  htmlFor="cover-letter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Letter
                </label>
                <div className="mt-1">
                  <textarea
                    id="cover-letter"
                    name="cover-letter"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                    defaultValue={""}
                  />
                </div>
              </motion.div>
              <motion.div variants={item} className="sm:col-span-2">
                <label
                  htmlFor="portfolio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Portfolio/GitHub/LinkedIn (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="portfolio"
                    id="portfolio"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition duration-300"
                  />
                </div>
              </motion.div>
              <motion.div
                variants={item}
                className="sm:col-span-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Submit Application
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      {/* <motion.footer
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </motion.footer> */}
    </div>
  );
};
