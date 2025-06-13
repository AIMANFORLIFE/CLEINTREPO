import React from 'react';
import { Search, Lightbulb, Rocket, BarChart3, Users, MessageSquare } from 'lucide-react';

const ProcessInfoBoxes = () => {
  const processSteps = [
    {
      icon: Search,
      title: "Discovery & Analysis",
      description: "We dive deep into your business, market, and competition to understand opportunities and challenges.",
      step: "01"
    },
    {
      icon: Users,
      title: "Audience Research",
      description: "Identify and analyze your target audience's behavior, preferences, and pain points.",
      step: "02"
    },
    {
      icon: Lightbulb,
      title: "Strategy Development",
      description: "Create a comprehensive marketing strategy tailored to your specific goals and budget.",
      step: "03"
    },
    {
      icon: Rocket,
      title: "Campaign Launch",
      description: "Execute campaigns across multiple channels with precision timing and messaging.",
      step: "04"
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor key metrics and KPIs to ensure campaigns are meeting objectives.",
      step: "05"
    },
    {
      icon: MessageSquare,
      title: "Optimization & Reporting",
      description: "Continuously refine strategies based on data insights and provide detailed reports.",
      step: "06"
    }
  ];

  return (
    <section className="py-16 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 animate-fade-in-up">
            Our Proven Process
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            A systematic approach that ensures consistent results and measurable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="glass-card p-6 group hover:scale-105 transition-all duration-300 animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step number background */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-300">
                {step.step}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-blue-400 text-sm font-bold mr-3">{step.step}</span>
                  <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
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

export default ProcessInfoBoxes;