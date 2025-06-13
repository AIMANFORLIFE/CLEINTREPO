import React from 'react';
import { Target, Users, TrendingUp, Clock, Shield, Zap } from 'lucide-react';

const ServiceInfoBoxes = () => {
  const infoBoxes = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "We identify and reach your ideal customers with laser-focused campaigns that convert.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our seasoned professionals bring years of experience across all digital marketing channels.",
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of delivering measurable growth and ROI for businesses of all sizes.",
      color: "green"
    },
    {
      icon: Clock,
      title: "Fast Implementation",
      description: "Quick turnaround times without compromising quality. See results in weeks, not months.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Your business data is protected with enterprise-grade security and privacy measures.",
      color: "red"
    },
    {
      icon: Zap,
      title: "Cutting-Edge Tools",
      description: "We leverage the latest marketing technologies and platforms for maximum impact.",
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      green: 'bg-green-500/20 border-green-500/30 text-green-400',
      orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      red: 'bg-red-500/20 border-red-500/30 text-red-400',
      yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 animate-fade-in-up">
            Why Choose Augmentum?
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            We combine strategic thinking with tactical execution to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoBoxes.map((box, index) => (
            <div 
              key={index}
              className="glass-card p-6 group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${getColorClasses(box.color)} group-hover:scale-110 transition-transform duration-300`}>
                <box.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {box.title}
              </h3>
              
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {box.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfoBoxes;