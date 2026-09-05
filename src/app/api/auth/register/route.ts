import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, email, password, confirm_password } = await req.json();

    if (!username || !email || !password || !confirm_password) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    if (username.length < 3 || username.length > 24) {
      return NextResponse.json({ success: false, error: 'Username must be 3-24 characters' }, { status: 400 });
    }

    if (password !== confirm_password) {
      return NextResponse.json({ success: false, error: 'Passwords do not match' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json({ success: false, error: 'Username: only letters, numbers, underscore' }, { status: 400 });
    }

    const result = await registerUser(username, email, password);
    if (result.error) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
