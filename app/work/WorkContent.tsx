"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Target, Settings, Zap, ChevronDown, MessageCircle } from "lucide-react";
import React, { useRef } from "react";
import StarryBackground from "./StarryBackground";

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
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ subtitle, title, dark = false }: { subtitle: string; title: string; dark?: boolean }) => (
  <div className="mb-16 text-center">
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={`text-sm font-bold tracking-[0.3em] uppercase ${dark ? 'text-[#C9A84C]' : 'text-[#8B7355]'} mb-3 block`}
    >
      {subtitle}
    </motion.span>
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#0A1128]'}`}>
      {title}
    </h2>
    <div className={`w-12 h-[2px] ${dark ? 'bg-[#C9A84C]' : 'bg-[#0A1128]'} mx-auto mt-6 opacity-30`} />
  </div>
);

const ServiceCard = ({ service, delay, idx }: { service: any; delay: number; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // 모바일에서 카드가 순서대로 겹쳐 쌓이도록 top과 zIndex를 동적으로 부여합니다.
    <FadeInUp
      delay={delay} 
      className="group sticky md:static" 
      style={{ 
        top: `calc(15vh + ${idx * 20}px)`, 
        zIndex: 10 + idx, 
        perspective: 1000 
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div style={{ transform: "translateZ(40px)" }} className="p-10 transform-gpu">
          <div className="w-16 h-16 bg-[#F9F7F2] rounded-2xl flex items-center justify-center text-[#C9A84C] mb-8 group-hover:bg-[#0A1128] group-hover:text-white transition-colors duration-500">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-[#0A1128] mb-4">{service.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{service.desc}</p>
          <ul className="space-y-3">
            {service.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </FadeInUp>
  );
};

export default function WorkContent() {
  // position: sticky가 정상 작동하도록 overflow-x-hidden을 overflow-x-clip으로 변경합니다.
  return (
    <div className="bg-white font-sans overflow-x-clip">
      
      {/* ── HERO BANNER ── */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/about-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/90 to-[#0A1128]/70" />
          <StarryBackground />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            className="text-[#C9A84C] text-sm md:text-base font-light mb-4 uppercase"
          >
            Our Professional Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          >
            What We Do
          </motion.h1>
        </div>

        {/* 1번 섹션 -> 2번 섹션 버튼 */}
        <motion.button
          onClick={() => scrollToSection("services")}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer z-20"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 border border-gray-600 px-4 py-2 rounded-full group-hover:border-white transition-colors">
            SERVICES
          </span>
          <ChevronDown className="text-gray-400 w-5 h-5 group-hover:text-white" />
        </motion.button>
      </section>

      {/* ── SECTION 1: SERVICES ── */}
      <section id="services" className="py-24 px-6 relative min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Services" title="제공 서비스" />
          
          {/* 모바일: 스크롤 카드 스태킹 (Sticky) / PC: 기존 그리드 유지 */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-[15vh] md:gap-8 pb-[20vh] md:pb-0">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "교육 프로그램",
                desc: (
                  <>
                    대상자의 니즈와 교육 목적을 분석하여 <br />
                    몰입도 높은 프로그램을 기획합니다.
                  </>
                ),
                items: ["기업 교육 및 핵심가치 연수", "진로 탐색 및 체험형 교육", "팀빌딩 및 활동형 프로그램"],
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "행사 기획·주관",
                desc: (
                  <>
                    단순한 이벤트를 넘어 <br className="md:hidden" /> {/* 모바일 전용 */}
                    메시지가 전달되는 <br /> {/* 공통 (PC/모바일 모두 줄바꿈) */}
                    유의미한 현장을 만듭니다.
                  </>
                ),
                items: ["기업/공공기관 공식 행사", "학교 축제 및 교내 행사", "성과 공유 및 컨퍼런스"],
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "맞춤 설계",
                desc: (
                  <>
                    기성 프로그램이 아닌, <br /> {/* 공통 */}
                    귀사만을 위한 <br className="md:hidden" /> {/* 모바일 전용 */}
                    독창적인 콘텐츠를 개발합니다.
                  </>
                ),
                items: ["대상 특성 맞춤형 분석", "독자적 교육 콘텐츠 개발", "전문 운영 시나리오 설계"],
              },
            ].map((service, idx) => (
              <ServiceCard key={idx} service={service} delay={idx * 0.1} idx={idx} />
            ))}
          </div>
        </div>

        {/* 2번 섹션 -> 3번 섹션 버튼 */}
        <motion.button
          onClick={() => scrollToSection("process")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex flex-col items-center group cursor-pointer mx-auto"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 border border-gray-200 px-4 py-2 rounded-full group-hover:border-gray-400 transition-colors">
            PROCESS
          </span>
          <ChevronDown className="text-gray-300 w-5 h-5 group-hover:text-gray-500" />
        </motion.button>
      </section>

      {/* ── SECTION 2: PROCESS ── */}
      <section id="process" className="py-24 px-6 bg-[#0A1128] relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Aceternity 스타일의 Aurora / 오로라 배경 효과 */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <SectionTitle subtitle="Process" title="업무 프로세스" dark />
          
          {/* 모바일: 가로 스크롤 스냅 (스와이프) / PC: 기존 그리드 유지 */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none pb-8 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {[
              { num: "01", title: "기획", desc: "목적과 방향성을\n정교하게 설정합니다." },
              { num: "02", title: "구성", desc: "콘텐츠의 흐름과\n내용을 구체화합니다." },
              { num: "03", title: "진행", desc: "현장에서 안정적이고\n전문적으로 운영합니다." },
              { num: "04", title: "결과", desc: "의미 있는 성과와\n데이터로 보답합니다." },
            ].map((step, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1} className="w-[85vw] max-w-[300px] sm:w-auto sm:max-w-none flex-shrink-0 snap-center">
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
                  <span className="text-4xl font-black text-white/10 absolute top-4 right-6 transition-colors">
                    {step.num}
                  </span>
                  <h4 className="text-[#C9A84C] font-bold text-lg mb-4">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line font-light">
                    {step.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* 3번 섹션 -> 4번 섹션 버튼 */}
        <motion.button
          onClick={() => scrollToSection("strength")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex flex-col items-center group cursor-pointer mx-auto"
        >
          <span className="text-[10px] tracking-[0.3em] text-[#C9A84C]/50 mb-2 border border-[#C9A84C]/20 px-4 py-2 rounded-full group-hover:border-[#C9A84C] transition-colors">
            WHY US
          </span>
          <ChevronDown className="text-[#C9A84C]/40 w-5 h-5 group-hover:text-[#C9A84C]" />
        </motion.button>
      </section>

      {/* ── SECTION 3: WHY US (STRENGTH) ── */}
      <section id="strength" className="py-24 px-6 bg-[#FBFBFD] min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Strength" title="왜 별다섯시간인가" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {[
              {
                title: "통합 운영 역량",
                sub: "기획과 실행의 완벽한 일치",
                desc: "단편적인 운영이 아닌, 기획의 본질이 현장에서 100% 구현될 수 있도록 유기적으로 움직입니다.",
              },
              {
                title: "현장 중심 실행력",
                sub: "디테일이 차이를 만듭니다",
                desc: "수많은 현장 경험을 바탕으로 돌발 상황에 유연하게 대처하며 완성도 높은 결과를 보장합니다.",
              },
              {
                title: "맞춤형 기획",
                sub: "우리에게 정해진 틀은 없습니다",
                desc: "클라이언트의 아이덴티티와 교육 대상의 특성을 깊이 있게 분석하여 최적의 경로를 제안합니다.",
              },
              {
                title: "풍부한 파트너십",
                sub: "검증된 전문 파트너",
                desc: "기업, 대학교, 지자체 등 다양한 도메인에서의 성공 사례를 통해 이미 역량을 검증받았습니다.",
              },
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0A1128] flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-[#0A1128] font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-[#C9A84C] text-sm font-semibold mb-3">{item.sub}</p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBILE FAB (KakaoTalk Floating Button) ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17, delay: 1 }}
        onClick={() => {
          // 모바일 기기에서 터치 시 기분 좋은 햅틱(진동) 피드백 발생 (지원하는 기기에 한함)
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
          }
          window.open("http://pf.kakao.com/_GxhGjX/chat", "_blank");
        }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#FEE500] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] border border-black/5"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-[#371D1E] fill-current" />
      </motion.button>

    </div>
  );
}