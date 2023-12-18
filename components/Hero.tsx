import AcmeLogo from '@/components/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/styles/fonts';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const Hero = () => {
  return (
    <section className="absolute top-5 grid max-h-screen gap-6 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-10 py-4 max-md:items-center md:px-32">
        <h1 className="py-5 font-sans text-4xl font-bold leading-tight  md:text-8xl">
          Track all your expenses.
        </h1>
        <p className="font-sans text-xl font-medium text-gray-600 md:py-5 md:text-2xl">
          You can&apos;t measure it if you can&apos;t track it.
        </p>
        <div className="flex py-10 pl-10">
          <Link
            href="/sign-up"
            className="mr-5 flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Sign up</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>

      <div className="flex md:px-10 md:py-24">
        <Image
          src="/hero-desktop.png"
          className="hidden md:block"
          alt={'Icon'}
          width={800}
          height={500}
        />

        <Image
          src="/hero-mobile.png"
          width={380}
          height={400}
          className="block md:hidden"
          alt="Screenshot of the dashboard project showing mobile version"
        />
      </div>
    </section>
  );
};

export default Hero;
