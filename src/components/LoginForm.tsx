'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.get('username'),
          password: form.get('password'),
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
        setLoading(false);
      }
    } catch {
      setError('Connection error');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2 rounded-lg">{error}</div>}
      <div>
        <label className="block text-xs text-white/40 mb-1">Username</label>
        <input name="username" required className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Password</label>
        <input name="password" type="password" required className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <button type="submit" disabled={loading} className="w-full h-11 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
        {loading ? <><span className="spinner" /> Logging in...</> : 'Login'}
      </button>
    </form>
  );
}
