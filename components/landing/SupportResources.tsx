import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface SupportFeatureProps {
  iconClass: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const SupportFeature: React.FC<SupportFeatureProps> = ({ iconClass, title, description, gradientFrom, gradientTo }) => (
  <div className="flex items-start space-x-4">
    <div className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center flex-shrink-0`}>
      <i className={`${iconClass} text-white`}></i>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SupportResources: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="support" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            World-Class <span className="gradient-text">Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the help you need, when you need it. Our expert support team and comprehensive resources
            ensure your success every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-slide-left">
            <div className="space-y-8">
              <SupportFeature
                iconClass="fa-solid fa-headset"
                title="24/7 Expert Support"
                description="Get instant help from our team of e-commerce experts via chat, email, or phone. We're here whenever you need us."
                gradientFrom="from-purple-500"
                gradientTo="to-blue-500"
              />
              <SupportFeature
                iconClass="fa-solid fa-graduation-cap"
                title="ZyloSpace Academy"
                description="Master e-commerce with our comprehensive learning platform. Video tutorials, guides, and best practices."
                gradientFrom="from-green-500"
                gradientTo="to-teal-500"
              />
              <SupportFeature
                iconClass="fa-solid fa-users"
                title="Community Forum"
                description="Connect with other store owners, share experiences, and learn from the ZyloSpace community."
                gradientFrom="from-orange-500"
                gradientTo="to-red-500"
              />
              <SupportFeature
                iconClass="fa-solid fa-rocket"
                title="Migration Assistance"
                description="Switching from another platform? Our migration experts will handle the entire process for you."
                gradientFrom="from-pink-500"
                gradientTo="to-purple-500"
              />
            </div>
          </div>
          <div className="animate-slide-right">
            <img className="rounded-2xl shadow-2xl" src="/assets/images/470040ed76-17e7ba528b81befc9bdb.png" alt="customer support team helping clients, modern office environment, friendly representatives, purple and blue theme" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-up">
              <div className="text-4xl font-bold gradient-text mb-2">&lt; 2min</div>
              <p className="text-gray-600">Average response time</p>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <p className="text-gray-600">Customer satisfaction rate</p>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">1000+</div>
              <p className="text-gray-600">Help articles & tutorials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportResources;