"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
  return (
    <p className="text-2xl md:text-4xl font-bold leading-tight md:leading-snug break-keep text-white">
      {tokens.map((token, i) => {
        if (typeof token === "string") {
          return (
            <span key={i} className="inline-block mr-[0.25em]">
              {token}
            </span>
          );
        } else {
          return <React.Fragment key={i}>{token}</React.Fragment>;
        }
      })}
    </p>
  );
};

const FourPointStar = ({ size = 72 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <defs>
      <filter id="star-glow-about" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M40 4 L46 34 L76 40 L46 46 L40 76 L34 46 L4 40 L34 34 Z"
      fill="#C9A84C"
      filter="url(#star-glow-about)"
    />
  </svg>
);

const WaterReflectionSVG = () => (
  <svg width="56" height="68" viewBox="0 0 56 68" fill="none">
    {[
      { y: 5,  x1: 3,  x2: 53 },
      { y: 14, x1: 7,  x2: 49 },
      { y: 23, x1: 11, x2: 45 },
      { y: 31, x1: 15, x2: 41 },
      { y: 39, x1: 19, x2: 37 },
      { y: 46, x1: 22, x2: 34 },
      { y: 53, x1: 24, x2: 32 },
      { y: 59, x1: 26, x2: 30 },
    ].map(({ y, x1, x2 }, i) => (
      <line
        key={i}
        x1={x1} y1={y} x2={x2} y2={y}
        stroke="#C9A84C"
        strokeWidth={i < 4 ? 2 : 1.5}
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const StarParticles = ({ isActive }: { isActive: boolean }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (((i % 6) - 2.5) / 2.5) * 38,
        delay: (i * 0.09) % 0.6,
        dur: 0.65 + (i % 3) * 0.18,
      })),
    []
  );
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[3px] h-[3px] rounded-full bg-[#C9A84C] pointer-events-none"
          style={{ left: "50%", top: "50%", marginLeft: -1.5, marginTop: -1.5 }}
          animate={
            isActive
              ? { x: [0, p.x], y: [0, 62 + Math.abs(p.x) * 0.4], opacity: [0, 1, 0], scale: [0.5, 1.3, 0.2] }
              : { opacity: 0, x: 0, y: 0, scale: 0.5 }
          }
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 1.4,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

const RippleRings = ({ isActive }: { isActive: boolean }) => (
  <>
    {[0, 1.1].map((delay, i) => (
      <motion.div
        key={i}
        className="absolute inset-[-8px] rounded-full border border-[#C9A84C] pointer-events-none"
        animate={isActive ? { scale: [1, 1.9], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 2.4, delay, repeat: isActive ? Infinity : 0, repeatDelay: 0.6, ease: "easeOut" }}
      />
    ))}
  </>
);

export default function AboutContent() {
  const [isRevealed, setIsRevealed] = useState(false);
  const logoConcRef = useRef<HTMLElement>(null);
  const [logoActiveIndex, setLogoActiveIndex] = useState(-1);
  const isLogoInView = useInView(logoConcRef, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (!isLogoInView) return;
    const timers = [300, 900, 1500, 2100].map((delay, i) =>
      setTimeout(() => setLogoActiveIndex(i), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isLogoInView]);

  return (
    <div className="w-full overflow-x-hidden font-sans bg-[#0A1128] text-white">
      
      {/* ── SECTION 1: Hero Banner ── */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/about-bg.png" alt="About Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/90 to-[#0A1128]/70" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            className="text-[#C9A84C] text-sm md:text-base font-light mb-4 uppercase translate-x-[0.2em]"
          >
            가치를 높이는 <br className="md:hidden" />시간을 선물합니다
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl font-bold tracking-tighter"
          >
            About BYULSI
          </motion.h1>
        </div>

        <motion.button
          onClick={() => scrollToSection("concept")}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer z-20"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 border border-gray-600 px-4 py-2 rounded-full group-hover:border-white transition-colors translate-x-[0.15em]">
            Scroll Down
          </span>
          <ChevronDown className="text-gray-400 w-5 h-5 group-hover:text-white" />
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
                    "기업,", "학교,", "공공기관", "등", 
                    <br key="br4" className="md:block" />,
                    "다양한", "현장에서",
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

      {/* ── SECTION 3: Logo Concept ── */}
      <section ref={logoConcRef} className="relative bg-[#0A1128] py-28 px-8 overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeInUp className="text-center mb-20">
            <p className="text-[#C9A84C] text-[10px] tracking-[0.6em] uppercase mb-4">
              LOGO CONCEPT
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">
              별다섯시간이 담긴 이야기
            </h2>
          </FadeInUp>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4">
            {[
              { visual: <FourPointStar size={60} />, label: "별", sub: "가치와 영감" },
              {
                visual: (
                  <div className="w-14 h-14 flex items-center justify-center">
                    <WaterReflectionSVG />
                  </div>
                ),
                label: "물 위의 반영",
                sub: "새로운 시각",
              },
              {
                visual: <img src="/logo.png" alt="BYULSI Logo" className="w-14 h-14 object-contain" />,
                label: "별의 반영",
                sub: "새로운 시각의 발견",
              },
              {
                visual: (
                  <img
                    src="/logo_vertical.png"
                    alt="BYULSI Question"
                    className="w-14 h-14 object-contain"
                  />
                ),
                label: "끊임없는 물음표",
                sub: "새로운 가능성",
              },
            ].map((item, i) => {
              const connectors = ["+", "=", "→"];
              const isItemActive = logoActiveIndex >= i;
              return (
                <div key={i} className="flex flex-col md:flex-row items-center gap-10 md:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.div
                      className="w-20 h-20 flex items-center justify-center relative"
                      animate={
                        isItemActive
                          ? { filter: "drop-shadow(0 0 16px rgba(201,168,76,0.9))" }
                          : { filter: "drop-shadow(0 0 0px rgba(201,168,76,0))" }
                      }
                      transition={{ duration: 0.8 }}
                    >
                      <motion.div
                        className="w-full h-full flex items-center justify-center"
                        animate={isItemActive ? { opacity: 1, scale: 1 } : { opacity: 0.22, scale: 0.88 }}
                        transition={{ duration: 0.7 }}
                      >
                        {item.visual}
                      </motion.div>
                      {i === 0 && <StarParticles isActive={isItemActive} />}
                      {i === 1 && <RippleRings isActive={isItemActive} />}
                    </motion.div>

                    <div className="text-center">
                      <motion.p
                        className="text-sm font-medium tracking-wide"
                        animate={{ color: isItemActive ? "#FFFFFF" : "#475569" }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.label}
                      </motion.p>
                      <motion.p
                        className="text-xs mt-1"
                        animate={{ color: isItemActive ? "#C9A84C" : "#1E293B" }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.sub}
                      </motion.p>
                    </div>
                  </motion.div>

                  {i < connectors.length && (
                    <motion.span
                      animate={
                        logoActiveIndex >= i + 1
                          ? {
                              opacity: 1,
                              color: "#C9A84C",
                              textShadow: "0 0 14px rgba(201,168,76,0.95)",
                              scale: 1.3,
                            }
                          : {
                              opacity: 0.15,
                              color: "#334155",
                              textShadow: "0 0 0px transparent",
                              scale: 1,
                            }
                      }
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-2xl font-light select-none rotate-90 md:rotate-0"
                    >
                      {connectors[i]}
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

          <FadeInUp delay={0.9} className="text-center mt-20">
            <p className="text-slate-400 text-sm md:text-base font-light leading-loose mb-12">
              물 위에 비친 별의 빛을 모티브로,
              <br />
              <span className="text-white font-normal">시선의 변화</span>를 통해 가치를 발견하고
              <br />
              의미 있는 시간을 만들어갑니다.
            </p>

            <a
              href="/work"
              className="inline-flex items-center gap-3 border border-slate-600 text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0A1128] transition-all duration-300 text-sm font-medium group"
            >
              별다섯시간이 하는 일은?
              <ArrowRight size={18} className="text-[#F4D03F] group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}