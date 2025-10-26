import { getCurrentVersion } from "@/lib/version";
import Image from 'next/image';
import Link from "next/link";

export default async function Home() {
  const CURRENT_VERSION = await getCurrentVersion();
  return (
    <div>
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 lg:gap-16 text-lg">
          <div>
            <p className="mb-6 text-3xl">
              Waddle Forever is a singleplayer, downloadable Club Penguin client.
            </p>
            <p className="mb-6">
              Play versions from 2005 to 2017, create and load mods, explore parties and minigames, all offline without any worry of servers shutting down or data being leaked.
            </p>
            <p>
              Download version {CURRENT_VERSION.version}:
              <div className="flex gap-x-3 mt-2">
                <div className="border border-black rounded bg-[#0280d9] text-center w-24">
                  <Link href={`https://github.com/nhaar/Waddle-Forever/releases/download/v${CURRENT_VERSION.version}/WaddleForever-Setup-${CURRENT_VERSION.version}.exe`}>
                    Windows
                  </Link>
                </div>
                <div className="border border-black rounded bg-[#0280d9] text-center w-24">
                  <Link href='/linux'>
                    Linux
                  </Link>
                </div>
                <div className="border border-black rounded bg-[#0280d9] text-center w-24">
                  <Link href={`https://github.com/nhaar/Waddle-Forever/releases/download/v${CURRENT_VERSION.version}/WaddleForever-${CURRENT_VERSION.version}.dmg`}>
                    macOS
                  </Link>
                  </div>
              </div>
            </p>
          </div>
          <div className="relative max-w-2xl">
            <Image src="/20172005.png" alt="Club Penguin from 2005-2017" width={752} height={472}></Image>
          </div>
          <div className="mb-2">Waddle Forever is still in development, so please beware of bugs! You can talk with us on the Discord server above.</div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
