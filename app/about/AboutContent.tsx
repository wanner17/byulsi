"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Phone, Mail, MessageCircle, ChevronDown } from "lucide-react";

/**
 * 특정 섹션으로 부드럽게 스크롤하는 함수
 */
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

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

export default function AboutContent() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full overflow-x-hidden font-sans bg-[#0A1128] text-white">
      
      {/* ── SECTION 1: Hero Banner ── */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1128]/70" />
        </div>
        
        <FadeInUp className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-[#1a2a5e]/50 backdrop-blur-md text-white text-3xl md:text-5xl font-bold px-12 py-6 border border-white/10 mb-6"
          >
            About BYULSI
          </motion.h1>
          <p className="text-slate-400 tracking-[0.4em] text-sm md:text-base uppercase font-light">
            가치를 높이는 시간을 선물합니다
          </p>
        </FadeInUp>

        <motion.button
          onClick={() => scrollToSection("concept")}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-500 mb-2 border border-gray-700 px-4 py-2 rounded-full group-hover:border-white transition-colors">
            Scroll Down
          </span>
          <ChevronDown className="text-gray-500 w-5 h-5 group-hover:text-white" />
        </motion.button>
      </section>

      {/* ── SECTION 2: Brand Concept & Animation ── */}
      <section id="concept" className="relative min-h-screen py-24 px-6 flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* 왼쪽: 텍스트 설명 영역 */}
            <FadeInUp className="md:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                BYULSI, 별다섯시간은
              </h2>
              <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  같은 시간도 어떤 시선으로 바라보느냐에 따라<br />
                  전혀 다른 경험이 된다고 믿습니다.
                </p>
                <p>
                  기업, 학교, 공공기관 등 다양한 현장에서<br />
                  각 대상과 목적에 맞는 과정과 경험을 설계합니다.
                </p>
                
                {/* 문구 강조 부분 */}
                <div className="pt-6">
                  <motion.p 
                    className="text-white text-xl md:text-2xl font-medium leading-snug border-l-4 border-[#C9A84C] pl-6"
                    whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    세로로 회전하면 <span className="text-[#F4D03F] font-bold text-shadow-glow">물음표의 형태</span>가 되어<br />
                    <span className="text-[#F4D03F]">끊임없는 질문</span>과 <span className="text-[#F4D03F]">새로운 가능성</span>을 상징합니다.
                  </motion.p>
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="/work"
                  className="inline-flex items-center gap-3 border border-slate-600 text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0A1128] transition-all duration-300 text-sm font-medium group"
                >
                  서비스 자세히 보기 
                  <ArrowRight size={18} className="text-[#F4D03F] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeInUp>

            {/* 오른쪽: 이미지 교체 애니메이션 (logo.png <-> logo_vertical.png) */}
            <FadeInUp delay={0.3} className="md:w-1/2 relative flex justify-center items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute w-[130%] h-[130%] bg-[#C9A84C]/20 rounded-full blur-[100px]"
              />
              
              <div className="relative z-10 w-full max-w-sm">
                <motion.div 
                  className="bg-[#16213E]/60 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] shadow-2xl text-center cursor-pointer group"
                  initial="rest"
                  whileHover="hover"
                  animate={isRevealed ? "hover" : "rest"}
                  onClick={() => setIsRevealed(!isRevealed)}
                >
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    {/* 기본: logo.png */}
                    <motion.img
                      src="/logo.png" 
                      alt="BYULSI Logo"
                      className="absolute w-full h-full object-contain"
                      variants={{
                        rest: { opacity: 1, scale: 1, rotate: 0 },
                        hover: { opacity: 0, scale: 0.8, rotate: -15 }
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* 교체: logo_vertical.png */}
                    <motion.img
                      src="/logo_vertical.png" 
                      alt="BYULSI Question Mark"
                      className="absolute w-full h-full object-contain drop-shadow-[0_0_20px_rgba(244,208,63,0.4)]"
                      variants={{
                        rest: { opacity: 0, scale: 0.8, rotate: 15 },
                        hover: { opacity: 1, scale: 1, rotate: 0 }
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="mt-10 space-y-2">
                    <p className="text-[#F4D03F] text-xs tracking-[0.4em] font-bold uppercase opacity-60">Concept Reveal</p>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      이미지에 마우스를 올리거나 터치하여<br />변화하는 가치를 확인해보세요.
                    </p>
                  </div>
                </motion.div>
              </div>
            </FadeInUp>
          </div>
        </div>

        <motion.button
          onClick={() => scrollToSection("philosophy")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-500 mb-2 border border-gray-700 px-4 py-2 rounded-full group-hover:border-gray-400 transition-colors">
            PHILOSOPHY
          </span>
          <ChevronDown className="text-gray-500 w-5 h-5" />
        </motion.button>
      </section>

      {/* ── SECTION 3: Philosophy Text ── */}
      <section id="philosophy" className="py-32 px-6 bg-white text-[#0A1128]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20">
          <FadeInUp className="md:w-3/5">
            <p className="text-2xl md:text-4xl leading-[1.6] font-light">
              꼭 하늘을 보지 않아도<br />
              <strong className="font-bold text-[#C9A84C]">작은 물 위에도 별은 비칩니다.</strong>
            </p>
            <div className="w-16 h-1 bg-[#C9A84C] my-10" />
            <div className="space-y-6 text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              <p>우리는 그렇게 새로운 시각으로 세상을 바라봅니다.</p>
              <p>같은 시간도 다르게 바라보고,<br />그 안에서 더 나은 가치를 만듭니다.</p>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.3} className="md:w-2/5 flex justify-center">
            <motion.img 
              src="/logo.png" 
              alt="BYULSI" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain grayscale opacity-20"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </FadeInUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060d1f] py-16 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="BYULSI" className="w-12 h-12 object-contain grayscale opacity-50" />
            <div className="text-left text-xs text-slate-500">
              <p className="font-bold text-slate-300 text-sm mb-1 uppercase tracking-wider">BYULSI 별다섯시간</p>
              <p>대표: 윤소하 | 이메일: byulsi@naver.com | 전화: 010-6868-9321</p>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] tracking-widest uppercase">
            © 2024 BYULSI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}