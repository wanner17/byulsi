"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "hero", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "work", label: "Work", href: "/work" },
  { id: "contact", label: "Get in Touch", href: "/#contact" },
];

export default function RightNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();

  useEffect(() => {
    // 홈 화면에서만 스크롤 위치를 추적합니다.
    if (pathname !== "/") return;

    const handleScroll = () => {
      // 화면 상단에서 1/3 지점을 기준으로 현재 활성화된 섹션을 계산합니다.
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 로드 시 한 번 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 w-32">
      {navItems.map((item) => {
        let isActive = false;
        if (pathname === "/") {
          isActive = activeSection === item.id;
        } else {
          isActive = pathname === item.href;
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`w-full py-3 px-2 text-xs font-bold tracking-wider text-center transition-all duration-300 border shadow-sm
              ${
                isActive
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white/90 text-[#0A1128] border-gray-200 hover:bg-[#0A1128] hover:text-white hover:border-[#0A1128]"
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}