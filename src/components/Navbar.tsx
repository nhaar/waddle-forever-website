'use client'
import Link from 'next/link'
const linkClass = "text-3xl font-bold hover:underline hover:text-blue-200 transition-colors duration-200"

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white p-3">
      <nav className="flex items-end space-x-20 max-w-4xl mx-auto">
        <Link href="/"><span className="text-5xl font-bold hover:text-blue-200">Waddle<br/>Forever</span></Link>
        <div className="flex space-x-20 pb-7">
        <Link href="/faq" className={linkClass}>FAQ</Link>
        <Link href="/mods" className={linkClass}>Mods</Link>
        <Link href="https://discord.gg/URHXm3cFv5" className={linkClass}>Discord</Link>
        </div>
      </nav>
    </header>
  )
}