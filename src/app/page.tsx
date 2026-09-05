import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession } from '@/lib/auth';

const FEATURES = [
  { icon: '🗺', title: 'Open World', desc: 'Explore a living, breathing city with dynamic events and activities.' },
  { icon: '💼', title: 'Jobs & Careers', desc: 'Choose from multiple jobs including miner, pizza delivery, taxi driver and more.' },
  { icon: '🚗', title: 'Vehicle System', desc: 'Buy, customize and maintain your vehicles with realistic mechanics.' },
  { icon: '🏠', title: 'Housing', desc: 'Purchase properties and make them your own.' },
  { icon: '🎒', title: '83+ Items', desc: 'Manage your inventory with a wide variety of items and rarity tiers.' },
  { icon: '⚔', title: 'Factions', desc: 'Join groups and climb the ranks with your team.' },
  { icon: '📱', title: 'Phone & Contacts', desc: 'Stay connected with in-game phone system.' },
  { icon: '🌟', title: 'Leveling System', desc: 'Gain XP, level up and unlock new opportunities.' },
  { icon: '🛡', title: 'Anti-Cheat', desc: 'Fair play enforced with advanced detection systems.' },
];

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <div className="page-enter">
        <section className="relative overflow-hidden py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#4db8e8]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-[#4db8e8]">Direct</span>
            </h1>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              A premium Multi Theft Auto roleplay experience. Immerse yourself in a detailed city with dynamic gameplay, factions and a thriving community.
            </p>
            <div className="flex justify-center gap-4">
              {session ? (
                <a href="/dashboard" className="px-8 py-3 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors">
                  DASHBOARD
                </a>
              ) : (
                <>
                  <a href="/register" className="px-8 py-3 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors">
                    CREATE ACCOUNT
                  </a>
                  <a href="/login" className="px-8 py-3 border border-white/10 text-white/60 rounded-lg hover:border-white/20 hover:text-white transition-all">
                    LOGIN
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-black/5 border border-white/5 rounded-xl p-6 hover:border-[#4db8e8]/20 transition-colors">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
