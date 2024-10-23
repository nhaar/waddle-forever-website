import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Waddle Forever',
  description: 'The website for Waddle Forever, the singleplayer Club Penguin'
};

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-y-2 text-center select-none">
        <div className="text-xl font-bold">
          Waddle Forever
        </div>
        <div>
          <div className="mb-2"> Download links for 0.2.0 (BETA) </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            <Link href='/waddle-forever-installer-win.exe'>
              Windows Download
            </Link>
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            Linux - SOON!
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            MacOS - Not currently supported
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
