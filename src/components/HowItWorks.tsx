'use client';

import { useState, useEffect, useRef } from 'react';
import { BarChart3, Brain, Target, TrendingUp, Sparkles, Shield } from 'lucide-react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, index, isVisible }) => {
  return (
    <div
      className={`relative group transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Card Background with Gradient Border */}
      <div className="relative p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
        
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {index + 1}
        </div>
        
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
              {icon}
            </div>
          </div>
          
          {/* Floating Sparkles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Connecting Line (except for last card) */}
        {index < 2 && (
          <div className="hidden lg:block absolute -right-8 top-1/2 w-16 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        )}
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: <BarChart3 size={32} />,
      title: "Analyze Match Data",
      description: "Our advanced algorithms process vast amounts of historical data, team statistics, player performance metrics, and real-time market conditions to identify patterns and trends."
    },
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Predictions",
      description: "Machine learning models trained on millions of data points generate accurate predictions by analyzing team form, head-to-head records, injury reports, and weather conditions."
    },
    {
      icon: <Target size={32} />,
      title: "Smart Betting Tips",
      description: "Receive personalized betting recommendations with confidence scores, risk assessments, and optimal stake suggestions based on your betting profile and market opportunities."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            AI-Powered Betting Intelligence
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of sports betting with our cutting-edge AI system that transforms raw data into winning predictions
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 py-3 rounded-full border border-purple-500/30">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">
              <span className="text-green-400 font-semibold">98.7%</span> prediction accuracy
            </span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;