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
      <main className="max-w-4xl mx-auto p-6">
        <div>
          Waddle Forever is a Club Penguin you can install in your computer and use to play locally (singleplayer) and explore different parties, minigames, as well as versions ranging from 2005 to 2017.
        </div>
        <br />
        <div>
          <strong>DISCLAIMER</strong>: This project is <strong>NOT</strong> affiliated with Disney! It is fully <strong>FAN-BASED</strong> and will always be <strong>NON PROFIT</strong> and run by the passion of the fans!
        </div>
        <br />
        <div>
          <div className="mb-2">Waddle Forever is still in development, so please beware of bugs! You can talk with us on the Discord server above.</div>
          <div className="mb-2"> Download links for {CURRENT_VERSION.version} (BETA) </div>
          <div className="border border-black rounded bg-[#0280d9] p-1 max-w-xs">
            <Link className="underline bold" href={`https://github.com/nhaar/Waddle-Forever/releases/download/v${CURRENT_VERSION.version}/WaddleForever-Setup-${CURRENT_VERSION.version}.exe`}>
              Windows Download
            </Link>
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1 max-w-xs">
            <Link className="underline bold" href='/linux'>
              Linux Download
            </Link>
          </div>
          <div className="border border-black rounded bg-[#0280d9] p-1 max-w-xs">
            <Link className="underline bold" href={`https://github.com/nhaar/Waddle-Forever/releases/download/v${CURRENT_VERSION.version}/WaddleForever-${CURRENT_VERSION.version}.dmg`}>
              MacOS Download
            </Link>
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
