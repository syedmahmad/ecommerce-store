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
    color: "from-amber-500 to-amber-600",
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
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Consultancy",
    description:
      "With a team of seasoned consultants and industry experts, we offer strategic insights, innovative solutions, and practical guidance to help you navigate complex challenges.",
    color: "from-yellow-500 to-yellow-600",
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white mt-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With a decade of tech expertise, We craft tailored solutions that
              solve real business challenges. We build custom applications
              designed to scale with your growth-because your success is our
              mission.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                // @ts-ignore
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                  <div
                    className={`h-2 bg-gradient-to-r ${service.color}`}
                  ></div>
                  <div className="p-6">
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${service.color} text-white mb-4`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
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
