'use client';

const icons: Record<string, React.ReactNode> = {
  world: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  briefcase: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  car: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0" />
    </svg>
  ),
  home: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l9-8 9 8M5 10v10a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V10" />
    </svg>
  ),
  backpack: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="7" width="14" height="15" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v4M8 11v4M16 11v4" />
    </svg>
  ),
  sword: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 7l4-4 4 4-4 4" />
      <path d="M3 21l6-6" />
    </svg>
  ),
  phone: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  star: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  shield: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const FEATURES = [
  { icon: 'world', title: 'Open World', desc: 'Explore a living, breathing city with dynamic events and activities.' },
  { icon: 'briefcase', title: 'Jobs & Careers', desc: 'Choose from multiple jobs including miner, pizza delivery, taxi driver and more.' },
  { icon: 'car', title: 'Vehicle System', desc: 'Buy, customize and maintain your vehicles with realistic mechanics.' },
  { icon: 'home', title: 'Housing', desc: 'Purchase properties and make them your own.' },
  { icon: 'backpack', title: '83+ Items', desc: 'Manage your inventory with a wide variety of items and rarity tiers.' },
  { icon: 'sword', title: 'Factions', desc: 'Join groups and climb the ranks with your team.' },
  { icon: 'phone', title: 'Phone & Contacts', desc: 'Stay connected with in-game phone system.' },
  { icon: 'star', title: 'Leveling System', desc: 'Gain XP, level up and unlock new opportunities.' },
  { icon: 'shield', title: 'Anti-Cheat', desc: 'Fair play enforced with advanced detection systems.' },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-[#4db8e8]/30 transition-colors group">
            <div className="text-[#4db8e8] mb-3 group-hover:scale-110 transition-transform w-fit">{icons[f.icon]}</div>
            <h3 className="font-semibold text-sm mb-1 text-white/90">{f.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
