import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM accounts WHERE connected = 1');
    const players = (rows as Record<string, unknown>[])[0].count as number;
    return NextResponse.json({ players });
  } catch {
    return NextResponse.json({ players: 0 });
  }
}
