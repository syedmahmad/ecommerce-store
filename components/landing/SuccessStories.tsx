import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface TestimonialCardProps {
  avatarSrc: string;
  avatarAlt: string;
  name: string;
  title: string;
  quote: string;
  delay: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatarSrc, avatarAlt, name, title, quote, delay }) => {
  // @ts-ignore
  const cardRef = useScrollAnimation<HTMLDivElement>();
  return (
    // @ts-ignore
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 hover-lift animate-fade-up" style={{ animationDelay: delay }} ref={cardRef}>
      <div className="flex items-center mb-6">
        <img src={avatarSrc} alt={avatarAlt} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center text-sm text-gray-600">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fa-solid fa-star text-yellow-500 mr-1"></i>
        ))}
        <span>5.0</span>
      </div>
    </div>
  );
};

const SuccessStories: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="success-stories" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Success Stories from Real <span className="gradient-text">Customers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours have transformed their online presence and achieved remarkable growth with ZyloSpace.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <TestimonialCard
            avatarSrc="/assets/images/avatars/avatar-5.jpg"
            avatarAlt="Sarah"
            name="Sarah Johnson"
            title="Founder, StyleCraft Boutique"
            quote="ZyloSpace helped us launch our online store in just 3 hours. We went from zero to $50K in monthly sales within 6 months. The platform is incredibly user-friendly."
            delay="0s"
          />
          <TestimonialCard
            avatarSrc="/assets/images/avatars/avatar-3.jpg"
            avatarAlt="Mike"
            name="Mike Chen"
            title="CEO, TechGear Pro"
            quote="The scalability is amazing. We started small and now process over 10,000 orders monthly. The analytics help us make data-driven decisions every day."
            delay="0.1s"
          />
          <TestimonialCard
            avatarSrc="/assets/images/avatars/avatar-7.jpg"
            avatarAlt="Emma"
            name="Emma Rodriguez"
            title="Owner, Home & Garden Co."
            quote="Moving from our old platform to ZyloSpace was seamless. The customer support team guided us through everything. Our conversion rate increased by 40%."
            delay="0.2s"
          />
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Join 50,000+ Successful Businesses</h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start your success story today. Launch your online store and join thousands of entrepreneurs who chose ZyloSpace.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <i className="fa-solid fa-rocket mr-2"></i>
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;