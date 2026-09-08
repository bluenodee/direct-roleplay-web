'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      router.push('/');
      router.refresh();
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white/40 text-sm">Saindo...</p>
    </div>
  );
}
