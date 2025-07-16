'use client';

import Link from 'next/link';
import { Sparkles, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';

const JoinPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 px-6 py-12">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-sm text-white rounded-full backdrop-blur-sm animate-pulse">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          New Era of AI Empowerment
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Ready to <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Join the Revolution</span>?
        </h1>

        {/* Subheading */}
        <p className="text-lg text-white/80">
          Be among the first to explore intelligent predictions, real-time insights, and mind-bending automations powered by our next-gen AI platform.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-white/80 mt-8">
          <div className="flex items-start gap-4">
            <UserPlus className="w-6 h-6 text-green-400 mt-1" />
            <div>
              <p className="font-semibold text-white">Create Your Free Account</p>
              <p className="text-sm">No card needed. Just your curiosity and an email.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold text-white">Secure and Verified</p>
              <p className="text-sm">Your data is protected. Email verification required.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            href="joinapp" // 👉 You can later route this to your actual signup or auth form
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
          >
            Join Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Optional Secondary Link */}
        <p className="text-sm text-white/40 pt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline text-white/60 hover:text-white">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

export default JoinPage;
