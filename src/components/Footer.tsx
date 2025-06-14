import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-16 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0 animate-fade-in-left">
            <div className="text-2xl font-bold text-white tracking-wider mb-4">
              Augmentum
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Fractional marketing solutions for permanent business impact.
            </p>
          </div>
          
          <div className="flex items-center space-x-8 animate-fade-in-right">
            <div className="text-white/60 text-sm">
              © 2024 Augmentum Marketing
            </div>
            
            <button
              onClick={() => navigate('/admin')}
              className="glass-button text-xs text-white/60 hover:text-white/80 px-4 py-2 font-bold tracking-wider transition-all duration-300 hover:scale-105"
            >
              A.
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;