import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const TrustIndicators: React.FC = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section id="trust-indicators" className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-gray-600 font-medium mb-8">Trusted by 50,000+ businesses worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-shopify text-4xl text-gray-400"></i>
            </div>
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-amazon text-4xl text-gray-400"></i>
            </div>
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-stripe text-4xl text-gray-400"></i>
            </div>
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-paypal text-4xl text-gray-400"></i>
            </div>
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-google text-4xl text-gray-400"></i>
            </div>
            <div className="flex items-center justify-center">
              <i className="fa-brands fa-microsoft text-4xl text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-up">
            <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
            <p className="text-gray-600">Active Stores</p>
          </div>
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold gradient-text mb-2">$2B+</div>
            <p className="text-gray-600">Sales Processed</p>
          </div>
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
            <p className="text-gray-600">Uptime SLA</p>
          </div>
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
            <p className="text-gray-600">Expert Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;