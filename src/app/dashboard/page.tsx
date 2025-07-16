// /app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');

        if (!res.ok) {
  const errorText = await res.text(); // 👈 add this
  console.error('Raw error response:', errorText); // debug
  router.push('/login');
  toast.error('You must be logged in');
  return;
}

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        toast.error('Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <section className="min-h-screen p-6 bg-gradient-to-br from-slate-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name || user?.email} 👋</h1>
      <p>Your current plan: <strong>{user?.plan}</strong></p>
    </section>
  );
};

export default DashboardPage;
