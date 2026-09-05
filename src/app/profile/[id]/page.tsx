import { redirect, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession, getUserById, getCharactersByAccount, getVehiclesByOwner, getBanStatus } from '@/lib/auth';
import { formatMoney, formatPlayedTime, getEmploymentName, getSkinColorName } from '@/lib/utils';
import { getItemName, getItemRarity } from '@/lib/items';
import { RARITY_COLORS, LEVELS } from '@/lib/constants';
import db from '@/lib/db';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect('/login');

  const charId = parseInt(id);
  if (isNaN(charId)) notFound();

  const characters = await getCharactersByAccount(session.userId);
  const selectedChar = characters.find(c => c.id === charId);
  if (!selectedChar) notFound();

  const [items] = await db.execute(
    'SELECT * FROM items WHERE owner = ? AND ownerType = \'player\' ORDER BY slot ASC',
    [charId]
  );
  const vehicles = await getVehiclesByOwner(charId);
  const ban = await getBanStatus(charId);

  const [advRows] = await db.execute(
    'SELECT * FROM advantages WHERE character_id = ? AND (expire_at = 0 OR expire_at > ?)',
    [charId, Math.floor(Date.now() / 1000)]
  );

  const [groupRows] = await db.execute(
    'SELECT gm.*, g.name as group_name FROM group_members gm JOIN groups g ON gm.group_id = g.id WHERE gm.character_id = ? LIMIT 1',
    [charId]
  );

  const group = (groupRows as Record<string, unknown>[])[0] || null;
  const advantages = advRows as Record<string, unknown>[];
  const maxSlots = (selectedChar.inventorySlots as number) || 24;
  const currentLevel = selectedChar.level as number;
  const currentExp = selectedChar.exp as number || 0;
  const nextLevelExp = LEVELS[currentLevel] || 64000;
  const xpProgress = Math.min(100, (currentExp / nextLevelExp) * 100);

  const itemMap = new Map<number, Record<string, unknown>>();
  for (const item of (items as Record<string, unknown>[])) {
    itemMap.set(item.slot as number, item);
  }

  return (
    <>
      <Header user={session} />
      <div className="max-w-4xl mx-auto px-6 py-12 page-enter">
        {characters.length > 1 && (
          <div className="flex gap-2 mb-6">
            {characters.map(c => (
              <a key={c.id as number} href={`/profile/${c.id}`}
                className={`px-4 py-2 rounded-xl text-sm border transition-all ${c.id === charId ? 'border-[#4db8e8] text-[#4db8e8] bg-[#4db8e8]/5' : 'border-white/5 text-white/40 hover:border-white/10'}`}>
                {c.name as string} <span className="text-white/20 ml-1">Nv.{c.level as number}</span>
              </a>
            ))}
          </div>
        )}

        <div className="bg-black/5 border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4db8e8]/10 border-2 border-[#4db8e8]/30 flex items-center justify-center text-[#4db8e8] text-xl font-bold">
              {(selectedChar.name as string)?.[0] || '?'}
            </div>
            <div>
              <h1 className="text-xl font-bold">{selectedChar.name as string}</h1>
              <p className="text-sm text-white/40">
                Nível {currentLevel} · {getEmploymentName(selectedChar.employment as string)} · {selectedChar.sex as string === 'male' ? '♂' : '♀'} Idade {selectedChar.age as number} · {formatPlayedTime(selectedChar.played_time as number || 0)}
                {group && <> · <span className="text-[#6f83ee]">{group.group_name as string}</span></>}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-black/5 border border-white/5 rounded-xl p-4">
            <div className="text-[11px] text-white/30 uppercase mb-1">Carteira</div>
            <div className="text-lg font-bold text-[#4db8e8]">{formatMoney(selectedChar.money as number || 0)}</div>
          </div>
          <div className="bg-black/5 border border-white/5 rounded-xl p-4">
            <div className="text-[11px] text-white/30 uppercase mb-1">Banco</div>
            <div className="text-lg font-bold text-green-400">{formatMoney(selectedChar.bank as number || 0)}</div>
          </div>
          <div className="bg-black/5 border border-white/5 rounded-xl p-4">
            <div className="text-[11px] text-white/30 uppercase mb-1">Nível</div>
            <div className="text-lg font-bold">{currentLevel}</div>
            <div className="h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#4db8e8] rounded-full" style={{ width: `${xpProgress}%` }} />
            </div>
            <div className="text-[10px] text-white/20 mt-1">{currentExp.toLocaleString()} / {nextLevelExp.toLocaleString()} XP</div>
          </div>
          <div className="bg-black/5 border border-white/5 rounded-xl p-4">
            <div className="text-[11px] text-white/30 uppercase mb-1">Vida</div>
            <div className="text-lg font-bold text-red-400">{selectedChar.health as number}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/5 border border-white/5 rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3">Informações do Personagem</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Cidade natal</span><span>{selectedChar.hometown as string || 'Los Santos'}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Telefone</span><span>{selectedChar.phone_number as string || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Emprego</span><span>{getEmploymentName(selectedChar.employment as string)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Pele</span><span>{getSkinColorName(selectedChar.color as string)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Slots</span><span>{maxSlots}</span></div>
            </div>
          </div>
          <div className="bg-black/5 border border-white/5 rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3">Visão Financeira</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Carteira</span><span className="text-[#4db8e8]">{formatMoney(selectedChar.money as number || 0)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Banco</span><span className="text-green-400">{formatMoney(selectedChar.bank as number || 0)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Patrimônio</span><span className="text-[#4db8e8]">{formatMoney((selectedChar.money as number || 0) + (selectedChar.bank as number || 0))}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Veículos</span><span>{vehicles.length}</span></div>
              {group && <div className="flex justify-between"><span className="text-white/40">Grupo</span><span>{group.group_name as string}</span></div>}
            </div>
          </div>
        </div>

        {advantages.length > 0 && (
          <div className="bg-black/5 border border-white/5 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold mb-3">Vantagens Premium</h3>
            <div className="flex flex-wrap gap-2">
              {advantages.map((adv, i) => (
                <span key={i} className="px-3 py-1 bg-[#4db8e8]/10 border border-[#4db8e8]/20 rounded-full text-xs text-[#4db8e8]">
                  {adv.advantage as string}
                </span>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">
          Inventário ({(items as Record<string, unknown>[]).length} / {maxSlots})
        </h2>
        <div className="grid grid-cols-8 gap-1 mb-8">
          {Array.from({ length: maxSlots }, (_, s) => {
            const item = itemMap.get(s);
            if (item) {
              const name = getItemName(item.item as number);
              const rarity = getItemRarity(item.item as number);
              const color = RARITY_COLORS[rarity] || '#9ca3af';
              return (
                <div key={s} title={`${name} x${item.amount || 1}`}
                  className="aspect-square bg-black/5 border rounded-md flex items-center justify-center relative overflow-hidden"
                  style={{ borderColor: color + '40' }}>
                  <span className="text-[10px] font-bold" style={{ color }}>{name.substring(0, 2).toUpperCase()}</span>
                  {(item.amount as number) > 1 && (
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-semibold text-white">x{item.amount as number}</span>
                  )}
                </div>
              );
            }
            return (
              <div key={s} className="aspect-square bg-black/5 border border-white/5 rounded-md flex items-center justify-center text-[10px] text-white/15">
                {s + 1}
              </div>
            );
          })}
        </div>

        {vehicles.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">
              Veículos ({vehicles.length})
            </h2>
            <div className="space-y-3">
              {vehicles.map((v) => (
                <div key={v.id as number} className="bg-black/5 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{v.model as string}</div>
                    <div className="text-xs text-white/40">Combustível: {v.fuel as number}% · Vida: {Math.round((v.health as number || 1000) / 10)}% · KM: {(v.kilometraggio as number || 0).toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-white/30 font-mono">{v.plate as string}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {ban && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <span className="text-red-400 text-sm font-semibold">Este personagem está banido</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
