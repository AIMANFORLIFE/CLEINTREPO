import React from 'react';
import { TrendingUp, Users, Target, Award, Clock, Zap } from 'lucide-react';

const ResultsShowcase = () => {
  const results = [
    {
      icon: TrendingUp,
      metric: "300%",
      label: "Average Sales Increase",
      description: "Our clients see significant revenue growth within the first quarter"
    },
    {
      icon: Users,
      metric: "50+",
      label: "Happy Clients",
      description: "Businesses trust us with their marketing and see consistent results"
    },
    {
      icon: Target,
      metric: "95%",
      label: "Campaign Success Rate",
      description: "Nearly all our campaigns exceed client expectations and KPIs"
    },
    {
      icon: Award,
      metric: "4.9/5",
      label: "Client Satisfaction",
      description: "Consistently high ratings for service quality and results delivery"
    },
    {
      icon: Clock,
      metric: "30 Days",
      label: "Average Time to Results",
      description: "Quick turnaround from strategy to measurable business impact"
    },
    {
      icon: Zap,
      metric: "24/7",
      label: "Campaign Monitoring",
      description: "Continuous optimization ensures maximum performance at all times"
    }
  ];

  return (
    <section className="py-16 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 animate-fade-in-up">
            Results That Speak
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Real metrics from real businesses that partnered with us for growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <result.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {result.metric}
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-3">
                {result.label}
              </h3>
              
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsShowcase;