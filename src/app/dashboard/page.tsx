import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import { getSession, getUserById, getCharactersByAccount, getVehiclesByOwner } from '@/lib/auth';
import { formatMoney, formatPlayedTime, getEmploymentName } from '@/lib/utils';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUserById(session.userId);
  const characters = await getCharactersByAccount(session.userId);

  let totalMoney = 0;
  let totalPlayed = 0;
  const charData: { char: Record<string, unknown>; vehicleCount: number }[] = [];

  for (const char of characters) {
    const vehicles = await getVehiclesByOwner(char.id as number);
    totalMoney += (char.money as number || 0) + (char.bank as number || 0);
    totalPlayed += (char.played_time as number || 0);
    charData.push({ char, vehicleCount: vehicles.length });
  }

  return (
    <>
      <Header user={session} />
      <div className="max-w-4xl mx-auto px-6 py-12 page-enter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome, <span className="text-[#4db8e8]">{session.username}</span></h1>
          <p className="text-sm text-white/40 mt-1">
            Rank: <strong>{session.adminRank}</strong> · PV: <strong className="text-[#4db8e8]">{session.points}</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard label="Characters" value={characters.length} />
          <StatCard label="Vehicles" value={charData.reduce((s, c) => s + c.vehicleCount, 0)} color="#6f83ee" />
          <StatCard label="Total Money" value={formatMoney(totalMoney)} color="#4db8e8" />
          <StatCard label="Played Time" value={formatPlayedTime(totalPlayed)} color="#34c759" />
        </div>

        <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">Characters</h2>
        <div className="space-y-3 mb-8">
          {charData.length === 0 ? (
            <div className="bg-black/5 border border-white/5 rounded-xl p-8 text-center text-white/30 text-sm">
              No characters yet. Join the server to create one!
            </div>
          ) : (
            charData.map(({ char, vehicleCount }) => (
              <Link key={char.id as number} href={`/profile/${char.id}`} className="block bg-black/5 border border-white/5 rounded-xl p-4 hover:border-[#4db8e8]/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{char.name as string}</div>
                    <div className="text-xs text-white/40">
                      Level {char.level as number} · {getEmploymentName(char.employment as string)} · {formatPlayedTime(char.played_time as number || 0)}
                    </div>
                  </div>
                  <div className="text-[#4db8e8] font-semibold">{formatMoney((char.money as number || 0) + (char.bank as number || 0))}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
