'use client';
import Link from 'next/link';
import { useState } from 'react';

const linkClass =
  'text-3xl font-bold hover:underline hover:text-blue-200 transition-colors duration-200';

const navLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/mods', label: 'Mods' },
  { href: 'https://github.com/nhaar/Waddle-Forever', label: 'GitHub' },
  { href: 'https://discord.gg/URHXm3cFv5', label: 'Discord' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-blue-600 text-white p-3">
      <nav className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-5xl font-bold hover:text-blue-200">
              {/* Logo placeholder */}
              Waddle<br />Forever
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex md:space-x-16">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
          </div>

          <button
            className="text-white text-3xl md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="flex flex-col md:hidden space-y-4 p-5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
