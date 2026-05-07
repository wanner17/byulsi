"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Get in Touch", href: "/contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <Link href="/" className="flex items-center relative z-[110]" onClick={handleLinkClick}>
          <img src="/logo.png" alt="BYULSI" className="w-20 h-12 object-contain" />
          <div className="flex flex-col">
            <span className="text-[#0A1128] font-bold tracking-[0.25em] text-base md:text-lg leading-tight">
              BYULSI
            </span>
            <span className="text-[#C9A84C] text-[9px] md:text-[13px] font-medium tracking-[0.4em] ml-[0.2em] -mt-0.5 uppercase">
              별다섯시간
            </span>
          </div>
        </Link>

        <button
          className="text-[#0A1128] relative z-[110]"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[90] bg-white flex flex-col items-center justify-center gap-12"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={handleLinkClick}
              className="text-[#0A1128] text-3xl font-medium tracking-widest hover:text-[#C9A84C] transition-colors"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
