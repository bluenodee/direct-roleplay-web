import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession, getCharactersByAccount } from '@/lib/auth';

export default async function ProfileRoot() {
  const session = await getSession();
  if (!session) redirect('/login');
  const chars = await getCharactersByAccount(session.userId);
  if (chars.length > 0) {
    redirect(`/profile/${chars[0].id}`);
  }
  redirect('/dashboard');
}
