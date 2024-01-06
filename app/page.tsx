import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <section className="relative">
        <Hero />
      </section>
    </main>
  );
}
