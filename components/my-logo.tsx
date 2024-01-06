import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/styles/fonts';

export default function MyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">GinPaisa</p>
    </div>
  );
}