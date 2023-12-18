import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="left-0 top-0 z-50 flex h-16 items-center  bg-white shadow-md md:justify-between lg:fixed lg:w-full">
      <div className="flex items-center justify-center max-md:w-full md:pl-32">
        <Link href="/">
          <Image
            src="/GinPaisaLogo1.png"
            className="rounded-lg"
            alt={'Icon'}
            width={200}
            height={0}
          />
        </Link>
      </div>
      <div className="max-md:hidden">
        <Link
          href="/sign-up"
          className="mr-5 flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Sign up</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
