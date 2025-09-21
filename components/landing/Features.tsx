import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface FeatureCardProps {
  iconClass: string;
  title: string;
  description: string;
  bulletPoints: string[];
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconClass, title, description, bulletPoints, delay }) => {
  const cardRef = useScrollAnimation();
  return (
    // @ts-ignore
    <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift animate-fade-up" style={{ animationDelay: delay }} ref={cardRef}>
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
        <i className={`${iconClass} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 text-sm text-gray-600">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-center">
            <i className="fa-solid fa-check text-green-500 mr-2"></i>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface InfrastructureFeatureProps {
  iconClass: string;
  title: string;
  description: string;
}

const InfrastructureFeature: React.FC<InfrastructureFeatureProps> = ({ iconClass, title, description }) => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
      <i className={`${iconClass} text-purple-600`}></i>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const Features: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="gradient-text"> Succeed Online</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive e-commerce platform provides all the tools and features you need to build,
            launch, and scale your online business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            iconClass="fa-solid fa-rocket"
            title="Launch in Minutes"
            description="Deploy a fully-functional online store within hours, not weeks. Our streamlined setup process gets you selling fast."
            bulletPoints={["One-click store deployment", "Pre-configured payment gateways", "Automated SSL certificates"]}
            delay="0s"
          />
          <FeatureCard
            iconClass="fa-solid fa-palette"
            title="Beautiful Themes"
            description="Choose from 100+ professionally designed, mobile-responsive themes that convert visitors into customers."
            bulletPoints={["Mobile-first responsive design", "Customizable brand colors", "Advanced typography options"]}
            delay="0.1s"
          />
          <FeatureCard
            iconClass="fa-solid fa-chart-line"
            title="Advanced Analytics"
            description="Make data-driven decisions with comprehensive analytics, real-time reporting, and AI-powered insights."
            bulletPoints={["Real-time sales dashboard", "Customer behavior tracking", "Conversion optimization"]}
            delay="0.2s"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Enterprise-Grade Infrastructure</h3>
            <p className="text-lg text-gray-600 mb-8">
              Built on cloud-native architecture with enterprise security, scalability, and reliability.
              Handle millions of visitors and transactions without breaking a sweat.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <InfrastructureFeature
                iconClass="fa-solid fa-shield-alt"
                title="Bank-Level Security"
                description="PCI DSS compliant"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-server"
                title="Auto-Scaling"
                description="Handle traffic spikes"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-sync"
                title="Real-time Sync"
                description="Inventory management"
              />
              <InfrastructureFeature
                iconClass="fa-solid fa-search"
                title="SEO Optimized"
                description="Rank higher on Google"
              />
            </div>
          </div>
          <div className="animate-slide-right">
            <img className="rounded-2xl shadow-2xl" src="/assets/entrprise.png" alt="modern server infrastructure dashboard with real-time monitoring, cloud architecture visualization, purple and blue theme" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;