import Navbar from '@/components/Navbar';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-2">
        <SignIn />
      </div>
    </div>
  );
}
