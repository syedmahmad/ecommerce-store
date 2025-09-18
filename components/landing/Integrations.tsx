import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface IntegrationCategoryProps {
  title: string;
  integrations: { iconClass: string; label: string; iconColorClass: string }[];
}

const IntegrationCategory: React.FC<IntegrationCategoryProps> = ({ title, integrations }) => (
  <div className="text-center">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-4">
      {integrations.map((integration, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover-lift">
          <i className={`${integration.iconClass} text-3xl ${integration.iconColorClass} mb-2`}></i>
          <p className="text-sm text-gray-600">{integration.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const Integrations: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  const paymentGateways = [
    { iconClass: "fa-brands fa-stripe", label: "Stripe", iconColorClass: "text-blue-600" },
    { iconClass: "fa-brands fa-paypal", label: "PayPal", iconColorClass: "text-blue-500" },
    { iconClass: "fa-solid fa-credit-card", label: "Square", iconColorClass: "text-green-600" },
  ];

  const marketingTools = [
    { iconClass: "fa-brands fa-mailchimp", label: "Mailchimp", iconColorClass: "text-yellow-600" },
    { iconClass: "fa-brands fa-google", label: "Google Ads", iconColorClass: "text-red-500" },
    { iconClass: "fa-brands fa-facebook", label: "Facebook Ads", iconColorClass: "text-blue-600" },
  ];

  const shippingIntegrations = [
    { iconClass: "fa-solid fa-shipping-fast", label: "ShipStation", iconColorClass: "text-orange-600" },
    { iconClass: "fa-solid fa-truck", label: "UPS", iconColorClass: "text-brown-600" },
    { iconClass: "fa-solid fa-box", label: "FedEx", iconColorClass: "text-purple-600" },
  ];

  const analyticsIntegrations = [
    { iconClass: "fa-brands fa-google", label: "Google Analytics", iconColorClass: "text-orange-500" },
    { iconClass: "fa-solid fa-chart-bar", label: "Hotjar", iconColorClass: "text-blue-600" },
    { iconClass: "fa-solid fa-eye", label: "Mixpanel", iconColorClass: "text-green-600" },
  ];

  return (
    <section id="integrations" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Seamless <span className="gradient-text">Integrations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with your favorite tools and services. Our extensive integration ecosystem ensures
            your store works perfectly with your existing workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <IntegrationCategory title="Payment Gateways" integrations={paymentGateways} />
          <IntegrationCategory title="Marketing Tools" integrations={marketingTools} />
          <IntegrationCategory title="Shipping" integrations={shippingIntegrations} />
          <IntegrationCategory title="Analytics" integrations={analyticsIntegrations} />
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Plus 200+ more integrations available in our app store</p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            <i className="fa-solid fa-puzzle-piece mr-2"></i>
            Browse All Integrations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Integrations;