import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturesGrid from '@/components/FeaturesGrid';
import { getSession } from '@/lib/auth';

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <div className="page-enter">
        <section className="relative overflow-hidden py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#4db8e8]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-[#4db8e8]">Direct</span>
            </h1>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              A premium Multi Theft Auto roleplay experience. Immerse yourself in a detailed city with dynamic gameplay, factions and a thriving community.
            </p>
            <div className="flex justify-center gap-4">
              {session ? (
                <a href="/dashboard" className="px-8 py-3 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors">
                  DASHBOARD
                </a>
              ) : (
                <>
                  <a href="/register" className="px-8 py-3 bg-[#4db8e8] text-black font-semibold rounded-lg hover:bg-[#6dc8f0] transition-colors">
                    CREATE ACCOUNT
                  </a>
                  <a href="/login" className="px-8 py-3 border border-white/10 text-white/60 rounded-lg hover:border-white/20 hover:text-white transition-all">
                    LOGIN
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        <FeaturesGrid />
      </div>
      <Footer />
    </>
  );
}
