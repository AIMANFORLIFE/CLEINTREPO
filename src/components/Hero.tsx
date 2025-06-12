import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const heroTexts = [
    "Strategic Solutions.",
    "Lasting Results.",
    "Proven Growth."
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
            <span className="inline-block animate-hero-text-reveal">
              {heroTexts[0]}
            </span>
            <br />
            <span 
              className="font-normal inline-block animate-hero-text-cycle bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent"
              key={textIndex}
            >
              {heroTexts[textIndex === 0 ? 1 : textIndex]}
            </span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} flex justify-center`}>
          <button 
            onClick={scrollToContact}
            className="glass-button-hero text-white px-12 py-6 text-lg font-medium animate-hero-button group relative overflow-hidden"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">
              Find out what we do
            </span>
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </button>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;