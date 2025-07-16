'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import GoogleLoginBtn from '@/components/GoogleLoginBtn';

export default function JoinAppPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed');
        return;
      }

      // Success — redirect to login or dashboard
      window.location.href = '/login';
    } catch (err) {
      setErrorMsg('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Your Account</h1>

        {errorMsg && <p className="text-red-400 text-sm mb-4 text-center">{errorMsg}</p>}

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm text-white/70 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-purple-500/40'
            }`}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4">
          <GoogleLoginBtn />
        </div>

        <p className="text-sm text-center text-white/60 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
}
