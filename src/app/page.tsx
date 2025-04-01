import { CURRENT_VERSION } from "@/lib/version";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Waddle Forever',
  description: 'NOT AFFILIATED WITH DISNEY. The website for Waddle Forever, a fanmade singleplayer Club Penguin'
};

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-y-2 text-center select-none">
        <div className="text-xl font-bold">
          Waddle Forever
        </div>
        <div>
          <strong>DISCLAIMER</strong>: This project is <strong>NOT</strong> affiliated with Disney!<br />It is fully <strong>FAN-BASED</strong> and will always be <strong>NO PROFIT</strong><br />and ran by the passion of the fans!
        </div>
        <div>
          <div className="mb-2"> Download links for {CURRENT_VERSION.version} (BETA) </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            <Link className="underline bold" href={`https://github.com/nhaar/Waddle-Forever/releases/download/v${CURRENT_VERSION.version}/WaddleForever-Setup-${CURRENT_VERSION.version}.exe`}>
              Windows Download
            </Link>
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            <Link className="underline bold" href='/linux'>
              Linux Download
            </Link>
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1">
            MacOS - Not currently supported
          </div>
        </div>
        <Link className="underline" href='https://discord.gg/URHXm3cFv5'>
          JOIN OUR DISCORD!
        </Link>
      </main>
      <footer>
      </footer>
    </div>
  );
}
