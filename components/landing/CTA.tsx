import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useRouter } from "next/navigation";

const CTA: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  const router = useRouter();
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
    >
      {/* Faint grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Business?
          </h2>
          <p className="text-xl lg:text-2xl text-purple-100 mb-12 leading-relaxed">
            Join thousands of successful entrepreneurs who chose ZyloSpace.
            Start your 14-day free trial today and see why we’re the #1 choice
            for online stores.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full font-bold text-xl shadow-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:shadow-[0_0_25px_rgba(180,150,255,0.5)] transition"
              onClick={() => router.push("/register")}
            >
              <i className="fa-solid fa-rocket mr-3"></i>
              Start Your Free Trial
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full font-bold text-xl border-2 border-purple-200 text-white hover:bg-white hover:text-purple-900 transition"
              onClick={() => router.push("/contact-us")}
            >
              <i className="fa-solid fa-calendar mr-3"></i>
              Schedule a Demo
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-purple-200 text-base">
            {[
              "14-day free trial",
              "No credit card required",
              "Setup in 5 minutes",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white/10 px-4 py-2 rounded-full"
              >
                <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "-4s" }}
      ></div>
    </section>
  );
};

export default CTA;
