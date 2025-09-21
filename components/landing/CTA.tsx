import React from "react";
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
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-up">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl lg:text-2xl text-purple-100 mb-12 leading-relaxed">
            Join thousands of successful entrepreneurs who chose ZyloSpace.
            Start your 14-day free trial today and see why we're the #1 choice
            for online stores.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              className="bg-white text-purple-900 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-custom"
              onClick={() => {
                router.push("/register");
              }}
            >
              <i className="fa-solid fa-rocket mr-3"></i>
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300">
              <i className="fa-solid fa-calendar mr-3"></i>
              Schedule a Demo
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-purple-200">
            <div className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
              14-day free trial
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
              No credit card required
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
              Setup in 5 minutes
            </div>
          </div>
        </div>
      </div>

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
