'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import GoogleLoginBtn from '@/components/GoogleLoginBtn';
import axios from 'axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (res.data?.user) {
        router.push('/dashboard'); // 👈 Replace with your secured page
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
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
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-4">
          <GoogleLoginBtn />
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Forgot your password?{' '}
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Reset here
          </Link>
        </p>

        <p className="text-sm text-center text-white/60 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/join" className="text-purple-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
}
