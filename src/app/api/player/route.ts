import { NextResponse } from 'next/server';
import { getUserById, getCharactersByAccount, getVehiclesByOwner } from '@/lib/auth';
import { formatPlayedTime, getEmploymentName } from '@/lib/utils';
import { getItemName, getItemRarity } from '@/lib/items';
import { RARITY_COLORS } from '@/lib/constants';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const accountId = parseInt(id);
    if (isNaN(accountId)) return NextResponse.json({ error: 'invalid id' }, { status: 400 });

    const user = await getUserById(accountId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const characters = await getCharactersByAccount(accountId);

    const result = [];
    for (const char of characters) {
      const vehicles = await getVehiclesByOwner(char.id as number);

      const [items] = await db.execute(
        'SELECT * FROM items WHERE owner = ? AND ownerType = \'player\' ORDER BY slot ASC',
        [char.id as number]
      );

      const itemsFormatted = (items as Record<string, unknown>[]).map(item => ({
        id: item.item,
        name: getItemName(item.item as number),
        amount: item.amount || 1,
        slot: item.slot,
        rarity: getItemRarity(item.item as number),
        rarityColor: RARITY_COLORS[getItemRarity(item.item as number)] || '#9ca3af',
      }));

      const vehiclesFormatted = vehicles.map(v => ({
        id: v.id,
        model: v.model,
        plate: v.plate,
        fuel: v.fuel,
        health: Math.round((v.health as number || 1000) / 10),
        kilometers: v.kilometraggio || 0,
      }));

      result.push({
        id: char.id,
        name: char.name,
        level: char.level,
        exp: char.exp,
        money: char.money,
        bank: char.bank,
        health: char.health,
        armor: char.armor,
        sex: char.sex,
        age: char.age,
        hometown: char.hometown,
        phone: char.phone_number,
        employment: getEmploymentName(char.employment as string),
        playedTime: formatPlayedTime(char.played_time as 0),
        inventorySlots: char.inventorySlots || 24,
        items: itemsFormatted,
        vehicles: vehiclesFormatted,
      });
    }

    return NextResponse.json({ user: { id: user.id, username: user.username, avatar: user.avatar }, characters: result });
  } catch (err) {
    console.error('Player API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
