'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Brain, TrendingUp, Zap } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Brain, delay: 0, x: 20, y: 20 },
    { icon: Sparkles, delay: 0.5, x: 80, y: 30 },
    { icon: TrendingUp, delay: 1, x: 15, y: 70 },
    { icon: Zap, delay: 1.5, x: 85, y: 65 },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full blur-xl opacity-20 animate-pulse animation-delay-4000" />
        <div className="absolute inset-0 opacity-10 grid grid-cols-12 gap-8 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/20 rounded-lg animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          transition: 'all 0.3s ease',
        }}
      >
        <div className="w-40 h-40 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Floating Icons */}
      {floatingElements.map((el, i) => {
        const Icon = el.icon;
        return (
          <div
            key={i}
            className="absolute hidden lg:block animate-bounce"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: '3s',
            }}
          >
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <Icon className="w-6 h-6 text-white/80" />
            </div>
          </div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-white/80 text-sm">AI-Powered Accuracy</span>
            </div>

            <h1
              className={`text-5xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Unlock the
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                {' '}Future{' '}
              </span>
              of Smart
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {' '}Predictions
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
              </span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/80 leading-relaxed transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Experience next-generation AI that analyzes patterns, predicts outcomes, and maximizes your potential with precision.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-600 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Link
                href="/ai-demo"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center space-x-2">
                  <span>Try AI Demo</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>

              <Link
                href="/join"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Join Now</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-800 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-white/60">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-white/60">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/60">AI Support</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div
            className={`relative transition-all duration-1000 delay-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-spin-slow opacity-20" />
              <div className="absolute inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" />
              <div className="absolute inset-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-spin-slow opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Brain className="w-16 h-16 text-white animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 p-3 bg-white/10 rounded-full border border-white/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 bg-white/10 rounded-full border border-white/20">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-white/10 rounded-full border border-white/20">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="absolute top-10 right-10 animate-bounce animation-delay-1000">
                <div className="px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="text-green-400 font-semibold">+127%</div>
                </div>
              </div>
              <div className="absolute bottom-10 left-10 animate-bounce animation-delay-2000">
                <div className="px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-blue-400 font-semibold">Real-time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default Hero;
