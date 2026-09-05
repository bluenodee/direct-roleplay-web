import { NextResponse } from 'next/server';
import { getSession, getUserById } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }
  const user = await getUserById(session.userId);
  return NextResponse.json({ authenticated: true, user: { ...session, email: user?.email } });
}
