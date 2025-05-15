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
      <main className="flex flex-col gap-y-2 select-none">
        <div>
          Waddle Forever is a Club Penguin you can install in your computer
          <br/> and use to play locally (singleplayer) and explore different parties,<br/>
          minigames, as well as versions ranging from 2005 to 2017
        </div>
        <div>
          <strong>DISCLAIMER</strong>: This project is <strong>NOT</strong> affiliated with Disney!<br />It is fully <strong>FAN-BASED</strong> and will always be <strong>NON PROFIT</strong><br />and run by the passion of the fans!
        </div>
        <div>
          <div className="mb-2">Waddle Forever is still in development, so please beware of bugs!<br/> You can talk with us on the Discord server below.</div>
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
        <Link className="underline" href='https://github.com/nhaar/Waddle-Forever'>
          Github Repository
        </Link>
        <div className="text-xl font-bold">
          FAQ
        </div>
        <div>
          How to make an account? - Just log in with any name, any password!
        </div>
        <div>
          Why are some servers full? - It&apos;s just decoration! The game is offline
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
