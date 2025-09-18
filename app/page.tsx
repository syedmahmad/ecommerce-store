'use client';
import CTA from '@/components/landing/CTA';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Integrations from '@/components/landing/Integrations';
import Pricing from '@/components/landing/Pricing';
import SuccessStories from '@/components/landing/SuccessStories';
import SupportResources from '@/components/landing/SupportResources';
import TechnologyStack from '@/components/landing/TechnologyStack';
import TemplatesShowcase from '@/components/landing/TemplatesShowcase';
import TrustIndicators from '@/components/landing/TrustIndicators';
import ZyloSpaceAdvantage from '@/components/landing/ZyloSpaceAdvantage';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="w-full relative bg-carbon-100 flex flex-col">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Hero />
        {/* <TrustIndicators /> */}
        <Features />
        <ZyloSpaceAdvantage />
        <TemplatesShowcase />
        <Pricing />
        <TechnologyStack />
        <SuccessStories />
        {/* <Integrations /> */}
        <SupportResources />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;