"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

type Token = string | React.ReactNode;

/**
 * 애플 스타일의 스크롤 텍스트 리빌 컴포넌트
 */
const ScrollRevealText = ({ tokens }: { tokens: Token[] }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 45%"],
  });

  const wordCount = tokens.filter((t) => typeof t === "string").length;
  let wordIndex = 0;

  return (
    <p ref={ref} className="text-2xl md:text-4xl font-bold leading-tight md:leading-snug break-keep">
      {tokens.map((token, i) => {
        if (typeof token === "string") {
          const start = wordIndex / wordCount;
          const end = start + 1 / wordCount;
          wordIndex++;

          const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
          const color = useTransform(scrollYProgress, [start, end], ["#475569", "#FFFFFF"]);

          return (
            <motion.span key={i} style={{ opacity, color }} className="inline-block mr-[0.25em]">
              {token}
            </motion.span>
          );
        } else {
          return <React.Fragment key={i}>{token}</React.Fragment>;
        }
      })}
    </p>
  );
};

export default function AboutContent() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full overflow-x-hidden font-sans bg-[#0A1128] text-white">
      
      {/* ── SECTION 1: Hero Banner ── */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0">
          {/* 
             이미지가 잘리는 위치 조절: object-center(중앙), object-top(상단 위주), object-bottom(하단 위주)
             빈 공간이 생기더라도 전체를 다 보여주려면 object-cover 대신 object-contain 사용
          */}
          <img src="/about-bg.png" alt="About Background" className="w-full h-full object-cover object-center" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
                BYULSI, 별다섯시간은
              </h2>
              
              <div className="space-y-12 md:space-y-16 text-slate-300">
                
                <ScrollRevealText 
                  tokens={[
                    "같은", "시간도", "어떤", "시선으로",
                    <br key="br1" className="md:hidden" />,
                    "바라보느냐에", "따라",
                    <br key="br2" className="hidden md:block" />,
                    <br key="br3" className="md:hidden" />,
                    "전혀", "다른", "경험이", "된다고", "믿습니다."
                  ]}
                />
                
                <ScrollRevealText 
                  tokens={[
                    "기업,", "학교,", "공공기관", "등", "다양한", "현장에서",
                    <br key="br4" className="md:block" />,
                    "각", "대상과", "목적에", "맞는",
                    <br key="br5" className="md:hidden" />,
                    "과정과", "경험을", "설계합니다."
                  ]}
                />
                
                <div className="pt-6">
                  <motion.p 
                    className="text-white text-xl md:text-2xl font-medium leading-snug border-l-4 border-[#C9A84C] pl-6"
                    whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    세로로 회전하면<br className="md:hidden" />
                    <span className="text-[#F4D03F] font-bold text-shadow-glow"> 물음표의 형태</span>가 되어<br />
                    <span className="text-[#F4D03F]">끊임없는 질문</span>과<br className="md:hidden" />
                    <span className="text-[#F4D03F]"> 새로운 가능성</span>을 상징합니다.
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
      </section>
    </div>
  );
}