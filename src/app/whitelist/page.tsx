import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession, getUserById } from '@/lib/auth';
import db from '@/lib/db';

export default async function WhitelistPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUserById(session.userId);

  let status: 'none' | 'pending' | 'approved' = 'none';
  const [wlRows] = await db.execute(
    'SELECT access FROM whitelist WHERE account_id = ? ORDER BY id DESC LIMIT 1',
    [session.userId]
  );
  const wl = (wlRows as Record<string, unknown>[])[0];
  if (wl) {
    status = wl.access === 1 ? 'approved' : 'pending';
  }

  return (
    <>
      <Header user={session} />
      <div className="max-w-md mx-auto px-6 py-12 page-enter">
        <h1 className="text-2xl font-bold mb-6 text-center">Whitelist</h1>
        <div className="bg-black/20 border border-white/5 rounded-2xl p-8 text-center">
          {status === 'approved' && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm">
              Sua whitelist foi aprovada! Você já pode entrar no servidor.
            </div>
          )}
          {status === 'pending' && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400 text-sm">
              Sua whitelist está pendente de aprovação. Por favor, aguarde.
            </div>
          )}
          {status === 'none' && (
            <p className="text-white/40 text-sm">Digite seu token de whitelist de 6 dígitos para ser aprovado.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
