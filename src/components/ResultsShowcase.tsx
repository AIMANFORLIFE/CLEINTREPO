import React from 'react';
import { TrendingUp, Users, Target, Award, Clock, Zap } from 'lucide-react';

const ResultsShowcase = () => {
  const results = [
    {
      icon: TrendingUp,
      metric: "300%",
      label: "Average Sales Increase",
      description: "Our clients see significant revenue growth within the first quarter",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      icon: Users,
      metric: "50+",
      label: "Happy Clients",
      description: "Businesses trust us with their marketing and see consistent results",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      icon: Target,
      metric: "95%",
      label: "Campaign Success Rate",
      description: "Nearly all our campaigns exceed client expectations and KPIs",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      icon: Award,
      metric: "4.9/5",
      label: "Client Satisfaction",
      description: "Consistently high ratings for service quality and results delivery",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      icon: Clock,
      metric: "30 Days",
      label: "Average Time to Results",
      description: "Quick turnaround from strategy to measurable business impact",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      icon: Zap,
      metric: "24/7",
      label: "Campaign Monitoring",
      description: "Continuous optimization ensures maximum performance at all times",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    }
  ];

  return (
    <section className="py-16 px-8 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Dark section with text */}
          <div className="animate-fade-in-left">
            <div className="bg-black p-8 rounded-3xl">
              <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
                Case Study
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Yes, you'll see{' '}
                <span className="text-yellow-400">real results.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Working with our team, you'll see significant lifts in the business metrics you're reporting on to C-suite. From sales velocity to improved CAC and improved pipeline, just as we've done for the heads of marketing at 50+ other B2B SaaS companies.
              </p>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-300 flex items-center">
                Read the case study here
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>

          {/* Right side - Yellow metric cards */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
            {results.slice(0, 4).map((result, index) => (
              <div 
                key={index}
                className={`${result.bgColor} ${result.textColor} p-6 rounded-2xl hover:scale-105 transition-all duration-300 animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <result.icon className="w-6 h-6" />
                  <span className="text-2xl">↗</span>
                </div>
                
                <div className="text-3xl font-bold mb-2">
                  {result.metric}
                </div>
                
                <p className="text-sm font-medium opacity-80">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with additional metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.slice(4).map((result, index) => (
            <div 
              key={index + 4}
              className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
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