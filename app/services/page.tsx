"use client";
import NewHeader from "@/components/landing/Header";
import { motion } from "framer-motion";
import {
  Laptop2,
  Smartphone,
  Shield,
  Lightbulb,
  Code2,
  Globe2,
  ShoppingCart,
  RefreshCw,
  Settings2,
} from "lucide-react";

const services = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Store Setup",
    description:
      "Launch your e-commerce presence rapidly with our expert store configuration service. Simply provide your store details, product catalog, and requirements, and our specialized team will have your fully functional store operational within hours. We handle platform setup, product listings, payment integration, and initial optimization so you can start selling immediately.",
    color: "from-blue-500 to-indigo-500",
  },
  // {
  //   icon: <Laptop2 className="w-8 h-8" />,
  //   title: "Web Development",
  //   description:
  //     "At ZyloSpace, we specialize in crafting cutting-edge web solutions tailored to your unique needs. Our expertise spans a wide range of technologies, including React.js, Next.js, Python development, and more.",
  //   color: "from-blue-500 to-blue-600",
  // },
  // {
  //   icon: <Smartphone className="w-8 h-8" />,
  //   title: "Mobile Development",
  //   description:
  //     "Whether you seek native, hybrid, or cross-platform solutions, we possess the expertise and capabilities to transform your concept into a high-performance mobile application.",
  //   color: "from-purple-500 to-purple-600",
  // },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Assurance",
    description:
      "Our commitment to quality is unwavering. We adhere to a comprehensive software testing process that is meticulously executed at every phase to guarantee stable and dependable releases.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Consultancy",
    description:
      "With a team of seasoned consultants and industry experts, we offer strategic insights, innovative solutions, and practical guidance to help you navigate complex challenges.",
    color: "from-green-500 to-emerald-500",
  },
  // {
  //   icon: <Code2 className="w-8 h-8" />,
  //   title: "Engineering",
  //   description:
  //     "We provide range of solutions that leverage advanced technologies to transform and optimise engineering processes.",
  //   color: "from-red-500 to-red-600",
  // },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "Technology",
    description:
      "ZyloSpace offers transformative solutions for businesses worldwide which harness cutting-edge technologies like AI, ML, cloud computing, and data analytics.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Platform Migration",
    description:
      "Seamlessly transition your existing store to our platform without downtime or data loss. Our migration experts handle everything - product data, customer accounts, order history, and SEO preservation - ensuring a smooth switch with optimized performance.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: <Settings2 className="w-8 h-8" />,
    title: "Enterprise Customization",
    description:
      "For businesses needing tailored e-commerce solutions, we develop custom features, integrations, and workflows that extend our SaaS platform's capabilities to meet your unique operational requirements and business processes.",
    color: "from-rose-500 to-rose-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const OurServices = () => {
  return (
    <div>
      <NewHeader />
      <section
        id="services"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white mt-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              With a decade of tech expertise, we craft tailored solutions that
              solve real business challenges. We build custom applications
              designed to scale with your growth — because your success is our
              mission.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group"
              >
                <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-transparent group-hover:bg-white">
                  {/* Gradient Glow Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-full w-full bg-white rounded-2xl"></div>
                  </div>

                  <div className="relative p-8">
                    {/* Icon Bubble */}
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110`}
                    >
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
