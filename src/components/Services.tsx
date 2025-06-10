import React, { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Share2, Code, Clock, CheckCircle } from 'lucide-react';

const Services = () => {
  const [visibleServices, setVisibleServices] = useState<boolean[]>([]);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Search,
      title: "SEO",
      description: "Search engine optimization to boost your visibility",
      status: "available",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO"]
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Strategic content that engages your audience",
      status: "coming-soon",
      features: ["Content Strategy", "Blog Writing", "Video Content"]
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Comprehensive social media strategies",
      status: "coming-soon",
      features: ["Social Strategy", "Content Creation", "Analytics"]
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Modern, responsive websites that convert",
      status: "coming-soon",
      features: ["Custom Design", "Responsive Development", "Performance Optimization"]
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
            }, index * 100);
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'available') {
      return (
        <div className="flex items-center space-x-2 mb-3">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-green-400 text-xs font-medium px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            Available Now
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="text-amber-400 text-xs font-medium px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
            Coming Soon
          </span>
        </div>
      );
    }
  };

  return (
    <section id="services" className="py-24 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fade-in-up">
            Our Services
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Comprehensive digital marketing solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => serviceRefs.current[index] = el}
              className={`group transition-all duration-500 ${
                visibleServices[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`glass-card p-6 h-full transition-all duration-300 hover:scale-[1.02] ${
                service.status === 'coming-soon' ? 'opacity-80' : ''
              }`}>
                {/* Status Badge */}
                {getStatusBadge(service.status)}
                
                {/* Service Icon */}
                <div className="w-12 h-12 glass-card flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                  <service.icon className={`w-6 h-6 transition-all duration-300 ${
                    service.status === 'available' ? 'text-white' : 'text-white/60'
                  }`} />
                </div>
                
                {/* Service Title */}
                <h3 className={`text-xl font-medium mb-3 transition-all duration-300 ${
                  service.status === 'available' ? 'text-white' : 'text-white/70'
                }`}>
                  {service.title}
                </h3>
                
                {/* Service Description */}
                <p className={`mb-4 text-sm leading-relaxed transition-all duration-300 ${
                  service.status === 'available' ? 'text-white/70' : 'text-white/50'
                }`}>
                  {service.description}
                </p>
                
                {/* Service Features */}
                <div className="space-y-1 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        service.status === 'available' ? 'bg-blue-400' : 'bg-white/30'
                      }`}></div>
                      <span className={`text-xs ${
                        service.status === 'available' ? 'text-white/80' : 'text-white/50'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Call to Action */}
                {service.status === 'available' && (
                  <div className="pt-3 border-t border-white/10">
                    <button 
                      onClick={scrollToContact}
                      className="glass-button text-white px-4 py-2 text-xs font-medium transition-all duration-300 hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                )}
                
                {service.status === 'coming-soon' && (
                  <div className="pt-3 border-t border-white/10">
                    <button 
                      onClick={scrollToContact}
                      className="glass-button text-white/60 px-4 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 hover:text-white/80"
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
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-white/60 mb-4 text-sm">
            Ready to elevate your digital presence?
          </p>
          <button 
            onClick={scrollToContact}
            className="glass-button-primary text-white px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);