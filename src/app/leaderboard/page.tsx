import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession, getTopPlayers } from '@/lib/auth';
import { formatMoney, formatPlayedTime, getEmploymentName } from '@/lib/utils';

export default async function LeaderboardPage() {
  const session = await getSession();
  const players = await getTopPlayers(20);

  return (
    <>
      <Header user={session} />
      <div className="max-w-4xl mx-auto px-6 py-12 page-enter">
        <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
        <div className="bg-black/5 border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-white/40 text-xs uppercase">
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">Player</th>
                <th className="text-left px-4 py-3">Level</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Job</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Money</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Played</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <span className={i === 0 ? 'text-yellow-400 font-bold' : i === 1 ? 'text-gray-300 font-bold' : i === 2 ? 'text-amber-600 font-bold' : 'text-white/30'}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.name as string}</div>
                    <div className="text-xs text-white/30">@{p.account_name as string}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#4db8e8]">{p.level as number}</td>
                  <td className="px-4 py-3 text-white/50 hidden md:table-cell">{getEmploymentName(p.employment as string)}</td>
                  <td className="px-4 py-3 text-white/50 hidden md:table-cell">{formatMoney((p.money as number || 0) + (p.bank as number || 0))}</td>
                  <td className="px-4 py-3 text-white/30 hidden lg:table-cell">{formatPlayedTime(p.played_time as number || 0)}</td>
                </tr>
              ))}
              {players.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-white/30">No players found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
