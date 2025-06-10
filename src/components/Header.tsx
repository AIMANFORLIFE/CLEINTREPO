import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      } ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}
    >
      <nav className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-wider animate-fade-in-left">
            AUGMENTUM
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 animate-fade-in-down"
              style={{ animationDelay: '0.1s' }}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 animate-fade-in-down"
              style={{ animationDelay: '0.2s' }}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 animate-fade-in-down"
              style={{ animationDelay: '0.3s' }}
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 animate-fade-in-down"
              style={{ animationDelay: '0.4s' }}
            >
              Thoughts
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="glass-button text-white px-6 py-3 text-sm font-medium animate-fade-in-down"
              style={{ animationDelay: '0.5s' }}
            >
              Contact
            </button>
          </div>

          <button 
            className="md:hidden text-white p-2 glass-button animate-fade-in-right"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-b border-white/10 animate-fade-in-down">
            <div className="px-8 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="block text-white/80 hover:text-white transition-all duration-300 text-sm font-medium w-full text-left hover:translate-x-2"
              >
                Services
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
                className="block glass-button text-white px-6 py-3 text-sm font-medium w-full text-center"
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