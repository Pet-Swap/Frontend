import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import  AboutDialog  from '../components/Accueil/AboutDialog';
const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" className="text-gray-600 hover:text-gray-900">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" className="text-gray-600 hover:text-gray-900">
            <FaInstagram size={20} />
          </a>
        </div>
        {/* Liens complémentaires */}
        <div className="flex items-center space-x-4">
          <AboutDialog />
          <p>Version 0.1</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
