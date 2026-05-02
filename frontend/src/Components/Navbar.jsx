/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const handleScroll = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-gray-800">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-purple-500/20">
            N
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Neuro<span className="text-purple-400">Palette</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <a 
              href="#about-us" 
              onClick={(e) => handleScroll(e, 'about-us')}
              className="text-sm font-medium text-gray-300 hover:text-white transition duration-300"
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#contact-us" 
              onClick={(e) => handleScroll(e, 'contact-us')}
              className="text-sm font-medium text-gray-300 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
          </li>
          <li>
            <Link
              to="/models"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-bold transition duration-300 shadow-lg shadow-purple-600/20"
            >
              Explore Models
            </Link>
          </li>
        </ul>

        {/* Mobile menu button (placeholder) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

