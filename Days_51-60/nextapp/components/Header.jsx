"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-[#1f1f1f] font-serif">
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#e8e8e8] tracking-tight no-underline">
          my<span className="text-[#c8a96e]">blog</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#9a9a9a] no-underline text-sm uppercase tracking-wide hover:text-[#e8e8e8] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="bg-[#c8a96e] text-[#0d0d0d] px-4 py-2 rounded-sm text-sm font-bold tracking-wide no-underline hover:bg-[#e0bf82] transition-colors duration-200"
          >
            Read Articles →
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-[#e8e8e8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#e8e8e8] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#e8e8e8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="flex md:hidden flex-col gap-4 px-8 py-4 bg-[#111] border-t border-[#1f1f1f]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#9a9a9a] no-underline text-base uppercase tracking-wide hover:text-[#c8a96e] transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;


// import Link from "next/link";
// const Header = () => {
//   return (
//     <>
//       <div>
//         <h1 className="text-center text-3xl font-bold bg-amber-400">
//           This is a Header
//         </h1>
//       </div>
//       <div>
//         <ul>
//           <Link href="/">
//             <li>Home</li>
//           </Link>
//           <Link href="/about">
//             <li>About</li>
//           </Link>
//           <Link href="/blog">
//             <li>Blog</li>
//           </Link>
//           <Link href="/contact">
//             <li>Contact</li>
//           </Link>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Header;