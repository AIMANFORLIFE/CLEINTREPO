import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-start px-8 relative">
      <div className="max-w-4xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
            Fractional Marketing.
            <br />
            <span className="font-normal animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Permanent Impact.</span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={scrollToContact}
            className="glass-button-primary text-white px-8 py-4 text-sm font-medium animate-bounce-in group"
            style={{ animationDelay: '0.8s' }}
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              Find out what we do
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;