'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const form = new FormData(e.currentTarget);
    const password = form.get('password') as string;
    const confirm = form.get('confirm_password') as string;

    if (password !== confirm) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.get('username'),
          email: form.get('email'),
          password,
          confirm_password: confirm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Conta criada! Você já pode entrar.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.error || 'Falha no cadastro');
        setLoading(false);
      }
    } catch {
      setError('Erro de conexão');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2 rounded-lg">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-2 rounded-lg">{success}</div>}
      <div>
        <label className="block text-xs text-white/40 mb-1">Usuário</label>
        <input name="username" required minLength={3} className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">E-mail</label>
        <input name="email" type="email" required className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Senha</label>
        <input name="password" type="password" required minLength={6} className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Confirmar Senha</label>
        <input name="confirm_password" type="password" required className="w-full h-11 px-4 bg-black/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-[#4db8e8]/50 focus:outline-none transition-colors" />
      </div>
      <button type="submit" disabled={loading} className="w-full h-11 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
        {loading ? <><span className="spinner" /> Criando...</> : 'Criar Conta'}
      </button>
    </form>
  );
}
