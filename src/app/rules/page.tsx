import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession } from '@/lib/auth';

const RULES = [
  { title: '1. Random Deathmatch (RDM)', desc: 'Killing players without valid roleplay reason is prohibited.' },
  { title: '2. Vehicle Deathmatch (VDM)', desc: 'Using vehicles as weapons to harm players intentionally is not allowed.' },
  { title: '3. New Life Rule (NLR)', desc: 'After dying, you forget events from your previous life.' },
  { title: '4. Metagaming', desc: 'Using out-of-character information in roleplay is not allowed.' },
  { title: '5. Powergaming', desc: 'Forcing roleplay scenarios on others or performing unrealistic actions.' },
  { title: '6. Value of Life', desc: 'Always value your character\'s life. Do not act recklessly.' },
  { title: '7. Fear RP', desc: 'Your character should fear for their life in dangerous situations.' },
  { title: '8. Cop Baiting', desc: 'Intentionally provoking law enforcement for entertainment.' },
  { title: '9. Spam', desc: 'Do not spam in chat, radio, or any communication channel.' },
  { title: '10. Exploiting', desc: 'Using bugs or exploits for personal gain is strictly forbidden.' },
  { title: '11. Respect', desc: 'Treat all players and staff with respect. Toxicity will not be tolerated.' },
  { title: '12. Staff Decisions', desc: 'Staff decisions are final. If you disagree, open a ticket on Discord.' },
];

export default async function RulesPage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <div className="max-w-3xl mx-auto px-6 py-12 page-enter">
        <h1 className="text-2xl font-bold mb-6">Server Rules</h1>
        <div className="space-y-3">
          {RULES.map((rule) => (
            <div key={rule.title} className="bg-black/5 border border-white/5 rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-1">{rule.title}</h3>
              <p className="text-xs text-white/40">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
