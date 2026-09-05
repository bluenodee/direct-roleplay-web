import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password required' }, { status: 400 });
    }

    const session = await loginUser(username, password);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: session });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
