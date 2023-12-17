import AcmeLogo from '@/components/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/styles/fonts';
import Image from 'next/image';
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
