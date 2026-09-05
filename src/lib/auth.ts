import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import db from './db';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');

export interface SessionUser {
  userId: number;
  username: string;
  adminRank: string;
  avatar: string;
  discordId: string;
  whitelist: number;
  points: number;
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT(user as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function loginUser(username: string, password: string) {
  const [rows] = await db.execute('SELECT * FROM accounts WHERE account = ?', [username]);
  const user = (rows as Record<string, unknown>[])[0] as Record<string, unknown> | undefined;
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password as string);
  if (!valid) return null;

  const now = Math.floor(Date.now() / 1000);
  await db.execute('UPDATE accounts SET last_login = ? WHERE id = ?', [now, user.id as number]);

  const session: SessionUser = {
    userId: user.id as number,
    username: user.account as string,
    adminRank: user.admin_rank as string,
    avatar: user.avatar as string,
    discordId: user.discord_id as string,
    whitelist: user.whitelist as number,
    points: user.points as number,
  };

  await createSession(session);
  return session;
}

export async function registerUser(username: string, email: string, password: string) {
  const [existing] = await db.execute('SELECT id FROM accounts WHERE account = ?', [username]);
  if ((existing as Record<string, unknown>[]).length > 0) {
    return { error: 'Username already taken' };
  }

  const [existingEmail] = await db.execute('SELECT id FROM accounts WHERE email = ?', [email]);
  if ((existingEmail as Record<string, unknown>[]).length > 0) {
    return { error: 'Email already registered' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  await db.execute(
    `INSERT INTO accounts (account, password, token, email, whitelist, discord_id, admin_rank, points, avatar, connected)
     VALUES (?, ?, ?, ?, 1, '100000000000000000', 'User', 0, 'default.png', 0)`,
    [username, hashedPassword, token, email]
  );

  return { success: true };
}

export async function getUserById(id: number) {
  const [rows] = await db.execute(
    'SELECT id, account, email, avatar, banner, bio, points, admin_rank, whitelist, discord_id, created_at, last_login FROM accounts WHERE id = ?',
    [id]
  );
  return (rows as Record<string, unknown>[])[0] || null;
}

export async function getCharactersByAccount(accountId: number) {
  const [rows] = await db.execute('SELECT * FROM characters WHERE account = ? ORDER BY id ASC', [accountId]);
  return rows as Record<string, unknown>[];
}

export async function getVehiclesByOwner(ownerId: number) {
  const [rows] = await db.execute('SELECT * FROM vehicles WHERE owner = ? ORDER BY id ASC', [ownerId]);
  return rows as Record<string, unknown>[];
}

export async function getBanStatus(characterId: number) {
  const now = Math.floor(Date.now() / 1000);
  const [rows] = await db.execute(
    'SELECT * FROM bans WHERE identifier = ? AND active = 1 AND (unban_time = 0 OR unban_time > ?) ORDER BY banned_at DESC LIMIT 1',
    [characterId, now]
  );
  return (rows as Record<string, unknown>[])[0] || null;
}

export async function getPlayerCount() {
  const [rows] = await db.execute('SELECT COUNT(*) as count FROM accounts WHERE connected = 1');
  return (rows as Record<string, unknown>[])[0].count as number;
}

export async function getTopPlayers(limit = 20) {
  const [rows] = await db.execute(
    `SELECT c.name, c.level, c.exp, c.money, c.bank, c.employment, c.played_time, a.account as account_name
     FROM characters c JOIN accounts a ON c.account = a.id
     ORDER BY c.level DESC, c.exp DESC LIMIT ${limit}`
  );
  return rows as Record<string, unknown>[];
}
