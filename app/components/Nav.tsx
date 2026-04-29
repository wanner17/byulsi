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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="BYULSI" className="w-20 h-11 object-contain" />
          <div className="flex flex-col">
            <span className="text-[#0A1128] font-bold tracking-[0.25em] text-base md:text-lg leading-tight">
              BYULSI
            </span>
            <span className="text-[#C9A84C] text-[9px] md:text-[13px] font-medium tracking-[0.4em] ml-[0.2em] -mt-0.5 uppercase">
              별다섯시간
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium tracking-wide text-sm transition-colors ${
                pathname === href
                  ? "text-[#C9A84C]"
                  : "text-[#0A1128] hover:text-[#C9A84C]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-[#0A1128]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-12"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[#0A1128] text-2xl font-medium tracking-wide"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
