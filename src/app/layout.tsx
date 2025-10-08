import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen flex flex-col bg-[#325597] text-white">
        <Navbar />
        <main className="flex-1 flex justify-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
