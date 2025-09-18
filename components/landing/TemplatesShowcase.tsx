import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface TemplateCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  variations: string;
  delay: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ imageSrc, imageAlt, title, description, variations, delay }) => {
  // @ts-ignore
  const cardRef = useScrollAnimation<HTMLDivElement>();
  return (
    // @ts-ignore
    <div className="bg-white/10 glass-effect rounded-2xl p-6 hover-lift animate-fade-up" style={{ animationDelay: delay }} ref={cardRef}>
      <img className="rounded-xl mb-6" src={imageSrc} alt={imageAlt} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{variations} variations</span>
        {/* <button className="text-purple-400 hover:text-purple-300">
          <i className="fa-solid fa-arrow-right"></i>
        </button> */}
      </div>
    </div>
  );
};

const TemplatesShowcase: React.FC = () => {
  // @ts-ignore
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="templates" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Stunning Templates for Every Industry
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our curated collection of professional templates. Each one is optimized for
            conversions and designed by world-class designers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <TemplateCard
            imageSrc="/assets/template1.png"
            imageAlt="modern fashion e-commerce template, clean design, purple accents, product showcase"
            title="Fashion & Apparel"
            description="Perfect for clothing brands and fashion retailers"
            variations="12"
            delay="0s"
          />
          <TemplateCard
            imageSrc="/assets/template2.png"
            imageAlt="electronics e-commerce template, tech-focused design, blue gradients, product grid"
            title="Electronics & Tech"
            description="Showcase gadgets and technology products"
            variations="8"
            delay="0.1s"
          />
          <TemplateCard
            imageSrc="/assets/template3.png"
            imageAlt="home decor e-commerce template, elegant design, warm colors, lifestyle products"
            title="Home & Lifestyle"
            description="Beautiful templates for home goods and decor"
            variations="15"
            delay="0.2s"
          />
        </div>

        <div className="text-center">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <i className="fa-solid fa-eye mr-2"></i>
            View All 100+ Templates
          </button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;