import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6">
        {/* Logo */}
        <img src={assets.logo} alt="GenCanvas Logo" className="w-40 rounded-lg shadow-lg" />

        {/* Copyright Text */}
        <p className="text-sm text-gray-300 border-l border-gray-600 pl-6 max-sm:hidden">
          © {new Date().getFullYear()} GenCanvas.dev | All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[
            { src: assets.facebook_icon, alt: 'Facebook' },
            { src: assets.twitter_icon, alt: 'Twitter' },
            { src: assets.instagram_icon, alt: 'Instagram' },
          ].map((icon, index) => (
            <a key={index} href="#" className="transition-transform transform hover:scale-110">
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-10 h-10 p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-500 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
