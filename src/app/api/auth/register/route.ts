import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

export async function POST(req: Request) {
  try {
    const { username, email, password, confirm_password } = await req.json();

    if (!username || !email || !password || !confirm_password) {
      return NextResponse.json({ success: false, error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    if (username.length < 3 || username.length > 24) {
      return NextResponse.json({ success: false, error: 'O nome de usuário deve ter 3-24 caracteres' }, { status: 400 });
    }

    if (password !== confirm_password) {
      return NextResponse.json({ success: false, error: 'As senhas não coincidem' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'A senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json({ success: false, error: 'Usuário: apenas letras, números e underscore' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const result = await registerUser(username, email, password, ip);
    if (result.error) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ success: false, error: 'Erro no servidor' }, { status: 500 });
  }
}
