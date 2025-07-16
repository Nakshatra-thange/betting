'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Later: Send email to backend API
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password?</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium">
                Enter your email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:scale-105 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-white text-center">
            If this email is registered, a password reset link has been sent.
          </div>
        )}

        <div className="mt-6 text-sm text-center text-gray-300">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
