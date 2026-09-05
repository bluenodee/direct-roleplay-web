import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-6 page-enter">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Direct Roleplay" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-sm text-white/40 mt-1">Create your Direct Roleplay account</p>
          </div>
          <div className="bg-black/20 border border-white/5 rounded-2xl p-8">
            <RegisterForm />
            <p className="text-center text-xs text-white/30 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#4db8e8] hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
