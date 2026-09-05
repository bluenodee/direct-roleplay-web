'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header({ user }: { user?: { username: string } | null }) {
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => setPlayers(d.players || 0)).catch(() => {});
    const interval = setInterval(() => {
      fetch('/api/stats').then(r => r.json()).then(d => setPlayers(d.players || 0)).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#121416]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Direct Roleplay" className="h-8" />
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm text-white/50">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        {user && <Link href="/dashboard" className="hover:text-white transition-colors">Painel</Link>}
        {user && <Link href="/profile" className="hover:text-white transition-colors">Perfil</Link>}
        <Link href="/leaderboard" className="hover:text-white transition-colors">Ranking</Link>
        <Link href="/rules" className="hover:text-white transition-colors">Regras</Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{players} jogadores online</span>
        </div>
        {user ? (
          <Link href="/logout" className="text-xs px-4 h-9 flex items-center border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/20 transition-all">
            Sair
          </Link>
        ) : (
          <Link href="/login" className="text-xs px-4 h-9 flex items-center border border-[#4db8e8]/30 rounded-lg text-[#4db8e8] hover:bg-[#4db8e8]/10 transition-all">
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
