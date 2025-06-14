import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: TrendingUp, value: "300%", label: "Sales Increase", color: "text-green-400" },
    { icon: Users, value: "50+", label: "Happy Clients", color: "text-blue-400" },
    { icon: Award, value: "98%", label: "Success Rate", color: "text-purple-400" }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 animate-text-glow' : 'opacity-0 translate-y-10'
          }`}>
            Client Success Stories
          </h2>
          <p className={`text-white/70 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Real results from real businesses who trusted us with their growth
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="glass-card-enhanced p-8 text-center group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="relative mb-6">
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto group-hover:scale-110 transition-transform duration-500`} />
                <div className="absolute inset-0 bg-current opacity-20 rounded-full blur-xl animate-pulse-glow"></div>
              </div>
              <div className={`text-4xl font-bold ${stat.color} mb-2 animate-counter`}>
                {stat.value}
              </div>
              <p className="text-white/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className={`transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="glass-card-testimonial p-12 relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              {/* Quote icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 glass-card flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Quote className="w-8 h-8 text-blue-400 animate-pulse-glow" />
                </div>
              </div>

              {/* Testimonial text */}
              <blockquote className="text-2xl md:text-3xl font-light text-white text-center leading-relaxed mb-12 animate-text-reveal">
                "I couldn't be happier with the results! The team at Augmentum is fantastic—professional, responsive, and truly dedicated. They helped increase our sales by{' '}
                <span className="font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-highlight">
                  300% in just the first month
                </span>
                . Highly recommend their services!"
              </blockquote>

              {/* Client info with profile picture */}
              <div className="flex items-center justify-center space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 animate-profile-glow">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Jack Williams"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg mb-1">Jack Williams</div>
                  <div className="text-white/70 text-sm">Head of Sales</div>
                  <div className="text-blue-400 text-sm font-medium">Cabin Fever Wellness</div>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex justify-center mt-8 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 text-yellow-400 fill-current animate-star-twinkle" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-white/60 mb-6 text-lg">
            Ready to become our next success story?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass-button-hero text-white px-10 py-4 text-lg font-medium group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-500">
              Start Your Success Story
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;