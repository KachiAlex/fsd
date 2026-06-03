"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-navy flex items-center justify-between px-4 sm:px-10 h-[60px] border-b-2 border-mid relative z-50">
      <Link href="/" className="font-serif text-xl font-bold text-white">
        FSD <span className="text-sky">Africa</span>
      </Link>
      <ul className="hidden md:flex gap-7 list-none">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-white/65 text-[13px] font-medium tracking-wide hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:flex items-center gap-3.5">
        <Search className="w-[18px] h-[18px] text-white/50" />
        <button className="bg-mid text-white text-xs font-semibold px-4 py-1.5 rounded cursor-pointer hover:bg-mid/90 transition-colors">
          Partner with us
        </button>
      </div>
      <button
        className="md:hidden text-white p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {menuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-navy border-b-2 border-mid p-6 md:hidden z-40">
          <ul className="flex flex-col gap-4 list-none mb-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/80 text-sm font-medium hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="bg-mid text-white text-xs font-semibold px-4 py-2 rounded cursor-pointer w-full hover:bg-mid/90 transition-colors">
            Partner with us
          </button>
        </div>
      )}
    </nav>
  );
}
