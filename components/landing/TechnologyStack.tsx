import React from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { motion } from "framer-motion";
  
interface TechFeatureProps {
  iconClass: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const TechFeature: React.FC<TechFeatureProps> = ({
  gradientFrom,
  gradientTo,
  iconClass,
  title,
  description,
}) => (
  <div className="flex items-center space-x-4">
    <div
      className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center`}
    >
      <i className={`${iconClass} text-white text-2xl`}></i>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

interface TechIconProps {
  iconClass: string;
  label: string;
  color?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ iconClass, label, color }) => (
  <motion.div
    className="text-center cursor-pointer"
    whileHover={{ scale: 1.2, rotate: 5 }} // 👈 animation on hover
    whileTap={{ scale: 0.95 }} // 👈 nice press effect
    transition={{ type: "spring", stiffness: 300 }}
  >
    <i
      className={`${iconClass} text-4xl mb-2`}
      style={{ color: color || "#9CA3AF" }}
    ></i>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);

const TechnologyStack: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="technology"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Built with{" "}
            <span className="gradient-text">Cutting-Edge Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform leverages the latest technologies to ensure your store
            is fast, secure, and scalable. Experience the future of e-commerce
            today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-slide-left">
            <div className="space-y-8">
              <TechFeature
                iconClass="fa-solid fa-cloud"
                title="Cloud-Native Architecture"
                description="Built on modern cloud infrastructure for maximum reliability and performance."
                gradientFrom="from-purple-500"
                gradientTo="to-blue-500"
              />
              <TechFeature
                iconClass="fa-solid fa-robot"
                title="AI-Powered Features"
                description="Machine learning algorithms optimize your store performance and customer experience."
                gradientFrom="from-green-500"
                gradientTo="to-teal-500"
              />
              <TechFeature
                iconClass="fa-solid fa-shield-alt"
                title="Enterprise Security"
                description="Bank-level encryption and security protocols protect your business and customers."
                gradientFrom="from-orange-500"
                gradientTo="to-red-500"
              />
            </div>
          </div>
          <div className="animate-slide-right">
            <img
              className="rounded-2xl shadow-2xl"
              src="/assets/technology-image.png"
              alt="modern technology stack visualization, cloud infrastructure, AI components, security layers, purple and blue theme"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-6 gap-8 items-center opacity-60">
          <TechIcon
            iconClass="fa-brands fa-aws"
            label="AWS Cloud"
            color="#FF9900"
          />
          <TechIcon
            iconClass="fa-brands fa-docker"
            label="Docker"
            color="#2496ED"
          />
          <TechIcon
            iconClass="fa-brands fa-react"
            label="React"
            color="#61DAFB"
          />
          <TechIcon
            iconClass="fa-brands fa-node-js"
            label="Node.js"
            color="#339933"
          />
          <TechIcon
            iconClass="fa-solid fa-database"
            label="MongoDB"
            color="#47A248"
          />
          <TechIcon
            iconClass="fa-solid fa-lock"
            label="SSL/TLS"
            color="#000000"
          />
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
