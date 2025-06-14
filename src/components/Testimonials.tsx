import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, TrendingUp, Users, Award, Target, Clock, Zap } from 'lucide-react';

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

  const metrics = [
    { value: "300%", label: "Sales Increase", icon: TrendingUp },
    { value: "95%", label: "Success Rate", icon: Target },
    { value: "50+", label: "Happy Clients", icon: Users },
    { value: "30 Days", label: "Time to Results", icon: Clock }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-8 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Dark section with testimonial */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-black p-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Client Success Stories
              </h2>
              
              {/* Main testimonial */}
              <div className="mb-8">
                <div className="flex justify-start mb-6">
                  <div className="w-12 h-12 glass-card flex items-center justify-center">
                    <Quote className="w-6 h-6 text-blue-400" />
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
                  "I couldn't be happier with the results! The team at Augmentum is fantastic—professional, responsive, and truly dedicated. They helped increase our sales by{' '}
                  <span className="font-bold text-yellow-400">
                    300% in just the first month
                  </span>
                  . Highly recommend their services!"
                </blockquote>

                {/* Client info with profile picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Jack Williams"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Jack Williams</div>
                    <div className="text-white/70 text-sm">Head of Sales</div>
                    <div className="text-blue-400 text-sm font-medium">Cabin Fever Wellness</div>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex mt-6 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current" 
                    />
                  ))}
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                Working with our team, you'll see significant lifts in the business metrics you're reporting on to C-suite. From sales velocity to improved CAC and improved pipeline, just as we've done for the heads of marketing at 50+ other B2B SaaS companies.
              </p>
            </div>
          </div>

          {/* Right side - Bright metric cards */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-yellow-400 text-black p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-6 h-6 text-black" />
                  <span className="text-2xl font-bold">↗</span>
                </div>
                
                <div className="text-3xl font-bold mb-2 text-black">
                  {metric.value}
                </div>
                
                <p className="text-sm font-medium text-black/80">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
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
            className="bg-yellow-400 text-black px-10 py-4 text-lg font-medium rounded-full hover:bg-yellow-300 transition-all duration-300 group"
          >
            <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
              Start Your Success Story
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;