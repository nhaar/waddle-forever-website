import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'Waddle Forever',
  description: 'NOT AFFILIATED WITH DISNEY. The website for Waddle Forever, a fanmade singleplayer Club Penguin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="bg-[#325597] text-white flex justify-center h-screen">{children}</main>
      </body>
    </html>
  );
}
