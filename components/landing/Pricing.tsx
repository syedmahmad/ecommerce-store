import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface PricingCardProps {
  plan: string;
  description: string;
  price: string;
  priceSuffix: string;
  billedAnnually: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonClass: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, description, price, priceSuffix, billedAnnually, features, isPopular = false, buttonText, buttonClass }) => {
  // @ts-ignore
  const cardRef = useScrollAnimation<HTMLDivElement>();
  return (
    // @ts-ignore
    <div className={`rounded-2xl p-8 hover-lift animate-fade-up ${isPopular ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white relative' : 'bg-white border-2 border-gray-200'}`} ref={cardRef} style={{ animationDelay: isPopular ? '0.1s' : '0s' }}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{plan}</h3>
        <p className={`${isPopular ? 'text-purple-100' : 'text-gray-600'} mb-4`}>{description}</p>
        <div className="text-4xl font-bold mb-2">
          {price}
          <span className={`${isPopular ? 'text-lg text-purple-200' : 'text-lg text-gray-600'}`}>{priceSuffix}</span>
        </div>
        <p className={`${isPopular ? 'text-sm text-purple-200' : 'text-sm text-gray-600'}`}>{billedAnnually}</p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <i className={`fa-solid fa-check ${isPopular ? 'text-green-400' : 'text-green-500'} mr-3`}></i>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-full font-semibold transition-colors ${buttonClass}`}>
        {buttonText}
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="pricing" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the plan that fits your business size and scale as you grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <PricingCard
            plan="Starter"
            description="Perfect for new businesses"
            price="$29"
            priceSuffix="/month"
            billedAnnually="Billed annually"
            features={[
              "Up to 1,000 products",
              "2% transaction fee",
              "Basic analytics",
              "Email support",
              "SSL certificate",
            ]}
            buttonText="Start Free Trial"
            buttonClass="bg-gray-100 text-gray-900 hover:bg-gray-200"
          />
          <PricingCard
            plan="Growth"
            description="For growing businesses"
            price="$79"
            priceSuffix="/month"
            billedAnnually="Billed annually"
            features={[
              "Up to 10,000 products",
              "1.5% transaction fee",
              "Advanced analytics",
              "Priority support",
              "Custom domain",
              "Abandoned cart recovery",
            ]}
            isPopular={true}
            buttonText="Start Free Trial"
            buttonClass="bg-white text-purple-600 hover:bg-gray-100"
          />
          <PricingCard
            plan="Enterprise"
            description="For large-scale operations"
            price="$299"
            priceSuffix="/month"
            billedAnnually="Billed annually"
            features={[
              "Unlimited products",
              "1% transaction fee",
              "Full analytics suite",
              "24/7 phone support",
              "API access",
              "White-label options",
            ]}
            buttonText="Contact Sales"
            buttonClass="bg-gray-100 text-gray-900 hover:bg-gray-200"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">All plans include 14-day free trial • No setup fees • Cancel anytime</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            <i className="fa-solid fa-calculator mr-2"></i>
            Calculate your savings vs competitors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;