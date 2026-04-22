"use client";

import { motion } from "framer-motion";
import { Star, Phone, Mail, MessageCircle } from "lucide-react";
import Nav from "./components/Nav";

const FadeInUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomeContent() {
  return (
    <div className="w-full overflow-hidden font-sans">
      <Nav />

      {/* ── SECTION 1: Hero 上 — clean white ── */}
      <section id="hero" className="min-h-screen flex items-center bg-white pt-20">
        <div className="max-w-6xl mx-auto px-8 md:px-16 w-full flex flex-col md:flex-row items-center justify-between gap-12 py-20">

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-shrink-0 flex justify-center"
          >
            <img
              src="/logo.png"
              alt="BYULSI Logo"
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <p className="text-lg md:text-xl text-[#8B7355] font-light tracking-[0.25em] mb-8">
              가치를 높이는 시간을 선물합니다.
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[0.35em] text-[#0A1128] mb-3">
              BYULSI
            </h1>
            <p className="text-sm md:text-base tracking-[0.6em] text-[#5B7B9A] mb-6">
              별 다 섯 시 간
            </p>
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-[#C9A84C] w-4 h-4" fill="currentColor" />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 2: Hero 中 — full dark image ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="starry night" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1128]/50" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 w-full flex flex-col md:flex-row items-center justify-between gap-10">
          <FadeInUp className="md:w-2/3">
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-relaxed">
              우리는, 끊임없는<br />
              <span className="text-[#F4D03F] font-semibold">새로운 시각의 물음표</span>를 던집니다.
            </h2>
            <div className="w-14 h-[1px] bg-[#F4D03F] my-6 opacity-70" />
            <p className="text-base md:text-lg text-white/70 tracking-widest">
              가치를 높이는 시간을 선물합니다.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3} className="md:w-1/3 flex flex-col items-center">
            <img src="/logo.png" alt="BYULSI" className="w-28 h-28 md:w-36 md:h-36 object-contain mb-4 opacity-90 drop-shadow-xl" />
            <p className="text-white tracking-[0.4em] text-lg font-medium">BYULSI</p>
            <p className="text-white/60 tracking-[0.5em] text-xs mt-1">별다섯시간</p>
            <Star className="text-[#F4D03F] w-3.5 h-3.5 mt-4" fill="currentColor" />
          </FadeInUp>
        </div>
      </section>

      {/* ── SECTION 3: Philosophy text ── */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20">
          <FadeInUp className="md:w-1/2">
            <p className="text-2xl md:text-3xl text-[#0A1128] leading-[1.9] font-light">
              꼭 하늘을 보지 않아도<br />
              <strong className="font-semibold">작은 물 위에도 별은 비칩니다.</strong>
            </p>
            <div className="w-10 h-[1px] bg-[#C9A84C] my-8" />
            <p className="text-xl md:text-2xl text-[#333] leading-[2] font-light">
              우리는<br />
              그렇게 새로운 시각으로<br />
              <br />
              같은 시간도 다르게 바라보고<br />
              그 안에서 가치를 만듭니다.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3} className="md:w-1/2 flex justify-center">
            <img src="/logo.png" alt="BYULSI" className="w-56 h-56 md:w-72 md:h-72 object-contain" />
          </FadeInUp>
        </div>
      </section>

      {/* ── SECTION 4: Get in Touch ── */}
      <section id="contact" className="py-24 px-4 bg-[#0A1128]">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <h2 className="inline-block bg-[#1a2a5e] text-white text-xl md:text-3xl font-bold px-8 py-3 mb-12">
              Get in Touch
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeInUp>
              <p className="text-slate-300 mb-1">• 프로그램 문의하기</p>
              <p className="text-slate-300 mb-8">• 행사 상담 요청</p>

              <p className="text-[#F4D03F] font-bold mb-4">✔ 연락</p>
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#F4D03F] flex-shrink-0" />
                  <span className="text-slate-300">010-6868-9321</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#F4D03F] flex-shrink-0" />
                  <span className="text-slate-300">byulsi@naver.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-[#FEE500] flex-shrink-0" />
                  <button className="text-[#FEE500] hover:underline font-medium">카카오톡 상담</button>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-8">
                <p className="text-[#F4D03F] font-bold text-lg mb-2">Our Impact</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  의미 있는 경험으로 가치 있는 시간을 만들고 있습니다
                </p>
                <div className="flex gap-14">
                  <div>
                    <p className="text-3xl font-bold text-white">1000 +</p>
                    <p className="text-slate-400 text-xs mt-1">참여한 교육생</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">100 +</p>
                    <p className="text-slate-400 text-xs mt-1">함께한 기업/학교/공공기관</p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2} className="flex flex-col items-center justify-center gap-8">
              <img src="/logo.png" alt="BYULSI" className="w-44 h-44 object-contain opacity-50" />
              <p className="text-[#F4D03F] text-base md:text-lg text-center leading-relaxed">
                BYULSI와 함께<br />가치 있는 시간을 만들어보세요
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060d1f] py-8 px-8 text-center">
        <p className="text-slate-600 text-xs tracking-widest">© 2024 BYULSI 별다섯시간. All rights reserved.</p>
      </footer>

    </div>
  );
}
