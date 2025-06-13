import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-transparent ${
        isVisible ? 'animate-fade-in-down' : 'opacity-0'
      }`}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xl font-bold text-white tracking-wider group">
            <div className="relative">
              <Logo />
              <div className="absolute inset-0 w-8 h-8 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              AUGMENTUM
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="relative">
                About
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="relative">
                Services
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="relative">
                Process
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="relative">
                Success Stories
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="relative">
                Work
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 group"
              style={{ animationDelay: '0.6s' }}
            >
              <span className="relative">
                Thoughts
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="glass-button text-white px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ animationDelay: '0.7s' }}
            >
              <span className="relative z-10">Contact</span>
            </button>
          </div>

          <button 
            className="md:hidden text-white p-2 glass-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-b border-white/10 animate-fade-in-down">
            <div className="px-6 py-4 space-y-3">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Success Stories
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Thoughts
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block glass-button text-white px-5 py-2 text-sm font-medium w-full text-center"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;