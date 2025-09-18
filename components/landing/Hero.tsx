import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (heroRef.current) {
  //       const scrolled = window.pageYOffset;
  //       heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section id="hero" className="pt-24 pb-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden h-[800px]" ref={heroRef}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="fa-solid fa-star mr-2"></i>
              #1 E-commerce Platform of 2024
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Build Your
              <span className="gradient-text"> Dream Store</span>
              in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Launch your e-commerce empire with our industry-leading platform. No coding required.
              Enterprise-grade infrastructure. Unlimited growth potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-custom">
                <i className="fa-solid fa-rocket mr-2"></i>
                Start Building Now
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-300">
                <i className="fa-solid fa-play mr-2"></i>
                Watch Demo
              </button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <i className="fa-solid fa-check text-green-500 mr-2"></i>
                14-day free trial
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-check text-green-500 mr-2"></i>
                No credit card required
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-check text-green-500 mr-2"></i>
                Cancel anytime
              </div>
            </div>
          </div>
          <div className="animate-slide-right">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>
              <img className="relative z-10 rounded-2xl shadow-2xl hover-lift" src="/assets/hero-image.png" alt="modern e-commerce dashboard interface with purple and blue gradient, sleek design, multiple store analytics, clean UI" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;