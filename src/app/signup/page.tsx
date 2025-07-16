'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User, Mail, Lock, LogIn } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for backend signup call
    console.log('Signup Data:', formData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-6 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur rounded-2xl p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute top-3 left-3 w-5 h-5 text-purple-300" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-purple-300" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-purple-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-6 text-center text-white/70 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white underline hover:text-purple-300">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
