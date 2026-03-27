import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1f1f1f] font-serif text-[#9a9a9a]">
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-[#e8e8e8] tracking-tight no-underline inline-block mb-3">
              my<span className="text-[#c8a96e]">blog</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#5a5a5a] max-w-[260px]">
              Thoughts on code, design, and everything in between.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs uppercase tracking-[1.5px] text-[#e8e8e8] font-bold mb-4">
              Pages
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#6a6a6a] no-underline text-sm hover:text-[#c8a96e] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[1.5px] text-[#e8e8e8] font-bold mb-4">
              Elsewhere
            </p>
            <nav className="flex flex-col gap-3">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6a6a6a] no-underline text-sm hover:text-[#c8a96e] transition-colors duration-200"
                >
                  {label} ↗
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1f1f1f] my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center">
          <p className="text-xs text-[#3a3a3a]">© {year} myblog. All rights reserved.</p>
          <p className="text-xs text-[#3a3a3a]">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8a96e] hover:underline"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;