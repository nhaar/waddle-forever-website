import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'Waddle Forever',
  description: 'Play all eras of Club Penguin, hosted locally on your computer.',
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
