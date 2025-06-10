import React, { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Rocket, BarChart3 } from 'lucide-react';

const Process = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: Target,
      title: "Strategy",
      description: "Data-driven approach to market positioning"
    },
    {
      icon: Lightbulb,
      title: "Creative",
      description: "Compelling campaigns that resonate"
    },
    {
      icon: Rocket,
      title: "Execution",
      description: "Precision implementation across platforms"
    },
    {
      icon: BarChart3,
      title: "Optimization",
      description: "Continuous improvement for maximum ROI"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps(prev => {
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

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fade-in-up">
            Our Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className={`group transition-all duration-500 ${
                visibleSteps[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 glass-card flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-white transition-all duration-300" />
                </div>
                
                <h3 className="text-xl font-medium text-white mb-4 transition-all duration-300">
                  {step.title}
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/90">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Process);