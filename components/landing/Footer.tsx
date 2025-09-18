import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <a href={href} className="hover:text-white transition-colors cursor-pointer">
      {children}
    </a>
  </li>
);

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-rocket text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold">ZyloSpace</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The world's leading e-commerce platform. Build, launch, and scale your online business
              with our comprehensive suite of tools and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3 text-gray-400">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#templates">Templates</FooterLink>
              <FooterLink href="#integrations">Integrations</FooterLink>
              <FooterLink href="#">API Documentation</FooterLink>
              <FooterLink href="#">System Status</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Community</FooterLink>
              <FooterLink href="#support">Contact Support</FooterLink>
              <FooterLink href="#">Migration Help</FooterLink>
              <FooterLink href="#">ZyloSpace Academy</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
              <FooterLink href="#">Partners</FooterLink>
              <FooterLink href="#">Investors</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} ZyloSpace. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;