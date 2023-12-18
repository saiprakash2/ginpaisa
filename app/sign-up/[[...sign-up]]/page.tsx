import Navbar from '@/components/Navbar';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-2">
        <SignUp />
      </div>
    </div>
  );
}
