import React, { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Share2, Code, Clock, CheckCircle } from 'lucide-react';

const Services = () => {
  const [visibleServices, setVisibleServices] = useState<boolean[]>([]);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Search,
      title: "SEO",
      description: "Search engine optimization to boost your visibility and drive organic traffic",
      status: "available",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Performance Tracking"]
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Strategic content creation that engages your audience and builds brand authority",
      status: "coming-soon",
      features: ["Content Strategy", "Blog Writing", "Video Content", "Content Calendar"]
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Comprehensive social media strategies to grow your brand presence",
      status: "coming-soon",
      features: ["Social Strategy", "Content Creation", "Community Management", "Analytics"]
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Modern, responsive websites that convert visitors into customers",
      status: "coming-soon",
      features: ["Custom Design", "Responsive Development", "Performance Optimization", "CMS Integration"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = serviceRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setTimeout(() => {
              setVisibleServices(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150);
          }
        });
      },
      { threshold: 0.3 }
    );

    serviceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getStatusBadge = (status: string) => {
    if (status === 'available') {
      return (
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs font-medium px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            Available Now
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 text-xs font-medium px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
            Coming Soon
          </span>
        </div>
      );
    }
  };

  return (
    <section id="services" className="py-32 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fade-in-up">
            Our Services
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Comprehensive digital marketing solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => serviceRefs.current[index] = el}
              className={`group transition-all duration-700 ${
                visibleServices[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`glass-card p-8 h-full transition-all duration-500 group-hover:scale-105 group-hover:animate-glow animate-scale-in ${
                service.status === 'coming-soon' ? 'opacity-80' : ''
              }`} style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Status Badge */}
                {getStatusBadge(service.status)}
                
                {/* Service Icon */}
                <div className="w-16 h-16 glass-card flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:animate-glow animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  <service.icon className={`w-8 h-8 transition-all duration-300 group-hover:scale-110 ${
                    service.status === 'available' ? 'text-white' : 'text-white/60'
                  }`} />
                </div>
                
                {/* Service Title */}
                <h3 className={`text-2xl font-medium mb-4 transition-all duration-300 group-hover:scale-105 ${
                  service.status === 'available' ? 'text-white' : 'text-white/70'
                }`}>
                  {service.title}
                </h3>
                
                {/* Service Description */}
                <p className={`mb-6 leading-relaxed transition-all duration-300 group-hover:text-white/90 ${
                  service.status === 'available' ? 'text-white/70' : 'text-white/50'
                }`}>
                  {service.description}
                </p>
                
                {/* Service Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        service.status === 'available' ? 'bg-blue-400' : 'bg-white/30'
                      }`}></div>
                      <span className={`text-sm ${
                        service.status === 'available' ? 'text-white/80' : 'text-white/50'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Call to Action */}
                {service.status === 'available' && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button 
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="glass-button text-white px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                )}
                
                {service.status === 'coming-soon' && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button 
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="glass-button text-white/60 px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-white/80"
                    >
                      Notify Me
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-white/60 mb-6">
            Ready to elevate your digital presence?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="glass-button-primary text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;