import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession } from '@/lib/auth';

const RULES = [
  { title: '1. Deathmatch Aleatório (RDM)', desc: 'Matar jogadores sem motivo válido de roleplay é proibido.' },
  { title: '2. Deathmatch com Veículos (VDM)', desc: 'Usar veículos como armas para machucar jogadores intencionalmente não é permitido.' },
  { title: '3. Regra da Nova Vida (NLR)', desc: 'Após morrer, você esquece os eventos da sua vida anterior.' },
  { title: '4. Metagaming', desc: 'Usar informações fora do personagem no roleplay não é permitido.' },
  { title: '5. Powergaming', desc: 'Forçar cenários de roleplay nos outros ou realizar ações irreais.' },
  { title: '6. Valor da Vida', desc: 'Sempre valorize a vida do seu personagem. Não aja de forma imprudente.' },
  { title: '7. Fear RP', desc: 'Seu personagem deve ter medo de morrer em situações perigosas.' },
  { title: '8. Provocação Policial', desc: 'Provocar intencionalmente as forças da ordem por diversão.' },
  { title: '9. Spam', desc: 'Não faça spam no chat, rádio ou qualquer canal de comunicação.' },
  { title: '10. Exploração de Bugs', desc: 'Usar bugs ou exploits para ganho pessoal é estritamente proibido.' },
  { title: '11. Respeito', desc: 'Trate todos os jogadores e staff com respeito. Toxicidade não será tolerada.' },
  { title: '12. Decisões do Staff', desc: 'As decisões do staff são finais. Se discordar, abra um ticket no Discord.' },
];

export default async function RulesPage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <div className="max-w-3xl mx-auto px-6 py-12 page-enter">
        <h1 className="text-2xl font-bold mb-6">Regras do Servidor</h1>
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
