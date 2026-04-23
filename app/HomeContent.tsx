"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, animate, useInView } from "framer-motion";
import { Star, Phone, Mail, MessageCircle, ChevronDown, Sparkles } from "lucide-react";

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

/**
 * 숫자가 0부터 목표 값까지 카운트 업 되는 애니메이션 컴포넌트
 */
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2.5, // 2.5초 동안 진행
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
        },
      });
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
};

export default function HomeContent() {
  // 마우스 위치 추적을 위한 Motion Value
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 마우스 움직임을 부드럽게 만들기 위한 Spring 애니메이션
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // 커서 트레일용 실제 화면 픽셀 좌표
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);
  const cursorX = useSpring(rawMouseX, { stiffness: 250, damping: 20 });
  const cursorY = useSpring(rawMouseY, { stiffness: 250, damping: 20 });

  // 마우스 반대 방향으로 이동 범위 설정 (sm: 조금 이동, lg: 많이 이동)
  const moveX_sm = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const moveY_sm = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const moveX_lg = useTransform(smoothMouseX, [-1, 1], [35, -35]);
  const moveY_lg = useTransform(smoothMouseY, [-1, 1], [35, -35]);

  // 스크롤 위치에 따른 부드러운 배경색 전환
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#ffffff", "#ffffff", "#0A1128", "#0A1128", "#FAFAFC", "#FAFAFC"]
  );

  // 3D 로고 틸트(기울기) 효과용 범위 설정 (마우스 방향으로 살짝 기울어짐)
  const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 화면 정중앙을 0, 끝을 1/-1로 정규화
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);

      // 커서 위치 업데이트
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ backgroundColor }} className="w-full overflow-x-hidden font-sans text-[#0A1128]">
      
      {/* Custom Cursor Trail (PC에서만 표시) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#C9A84C] pointer-events-none z-[9999] hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.4)]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
      </motion.div>

      {/* ── SECTION 1: Hero (이미지 1번 스타일) ── */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden"
      >
        {/* Background Glows */}
        <motion.div 
          style={{ x: moveX_sm, y: moveY_sm }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ x: moveX_lg, y: moveY_lg }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        />

        {/* Background Scrolling Marquee (텍스트 티커 애니메이션) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-[120vw] -left-[10vw] -rotate-3 overflow-hidden pointer-events-none z-0 opacity-[0.03]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex whitespace-nowrap text-[8vw] font-black uppercase tracking-widest text-[#0A1128]"
          >
            <span>VALUE YOUR TIME · BYULSI · CORPORATE EDUCATION · VALUE YOUR TIME · BYULSI · CORPORATE EDUCATION · </span>
            <span>VALUE YOUR TIME · BYULSI · CORPORATE EDUCATION · VALUE YOUR TIME · BYULSI · CORPORATE EDUCATION · </span>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {/* 부모 div에 perspective를 주어 3D 효과 활성화 */}
          <div style={{ perspective: 1000 }} className="w-64 h-64 md:w-96 md:h-96 relative">
            <motion.img
              src="/logo.png" 
              alt="BYULSI Logo"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              style={{ rotateX, rotateY }}
            />
          </div>

          <div className="text-center md:text-left">
            <FadeInUp delay={0.2}>
              <p className="text-[#8B7355] text-lg md:text-xl font-light tracking-[0.2em] mb-4">
                새로운 시각, 끊임없는 물음
              </p>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-[#0A1128] leading-tight">
                가치 있는 시간을 <br className="md:hidden" />
                <motion.span 
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#FFF5A5] to-[#C9A84C]"
                  style={{ backgroundSize: "200% auto" }}
                >
                  선물합니다.
                </motion.span>
              </h1>
            </FadeInUp>
          </div>
        </div>

        {/* 1번 섹션 -> 2번 섹션 버튼 */}
        <motion.button
          onClick={() => scrollToSection("vision")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center group cursor-pointer z-20"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 border border-gray-200 px-4 py-2 rounded-full group-hover:border-gray-400 transition-colors uppercase">
            Scroll Down
          </span>
          <ChevronDown className="text-gray-300 w-5 h-5" />
        </motion.button>
      </section>

      {/* ── SECTION 2: Philosophy (이미지 2번 스타일) ── */}
      <section 
        id="vision" 
        className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
      >
        {/* Subtle Starry Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Large Watermark Text (빈 공간을 웅장하게 채움) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <motion.span 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            className="text-[25vw] font-bold text-white/[0.03] tracking-tighter whitespace-nowrap select-none flex"
          >
            <span className="px-8">BYULSI</span>
            <span className="px-8">BYULSI</span>
            <span className="px-8">BYULSI</span>
            <span className="px-8">BYULSI</span>
          </motion.span>
        </div>

        <FadeInUp className="text-center space-y-12">
          <div className="space-y-6 relative z-10">
            <Sparkles className="w-8 h-8 text-[#C9A84C] mx-auto opacity-80 mb-6" />
            <p className="text-xl md:text-3xl text-slate-300 font-light leading-relaxed">
              꼭 하늘을 보지 않아도<br />
              <span className="font-semibold text-white">작은 물 위에도 별은 비칩니다.</span>
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <p className="text-lg md:text-xl text-slate-400 font-light">
              우리는 그렇게 <span className="text-white font-normal">새로운 시각</span>으로 세상을 바라봅니다
            </p>
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide">
              같은 시간도 다르게 바라보며<br />
              더 나은 가치를 만듭니다.
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-4 relative z-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                viewport={{ once: true }}
              >
                <Star className="text-[#C9A84C] w-6 h-6 drop-shadow-lg" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </FadeInUp>

        {/* 2번 섹션 -> 3번 섹션 버튼 (추가됨) */}
        <motion.button
          onClick={() => scrollToSection("contact")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center group cursor-pointer z-20"
        >
          <span className="text-[10px] tracking-[0.3em] text-slate-400 mb-2 border border-slate-700 px-4 py-2 rounded-full group-hover:border-slate-400 transition-colors uppercase">
            Get in Touch
          </span>
          <ChevronDown className="text-slate-400 w-5 h-5" />
        </motion.button>
      </section>

      {/* ── SECTION 3: Contact & Info ── */}
      <section id="contact" className="relative min-h-screen flex flex-col justify-between pt-16 md:pt-20 overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <motion.div 
          style={{ x: moveX_sm, y: moveY_sm }} 
          className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" 
        />
        <motion.div 
          style={{ x: moveX_lg, y: moveY_lg }} 
          className="absolute bottom-40 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#C9A84C]/15 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" 
        />

        {/* Outlined Floating Watermark Text */}
        <div className="absolute top-1/4 -left-10 w-full overflow-hidden pointer-events-none z-0 opacity-5">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [-2, 0, -2] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="text-[12vw] font-black tracking-tighter text-transparent whitespace-nowrap select-none"
            style={{ WebkitTextStroke: '2px #0A1128' }}
          >
            GET IN TOUCH
          </motion.div>
        </div>

        <div className="flex-grow flex items-center justify-center px-6 md:px-8 py-10 relative z-10">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <FadeInUp>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1128] mb-10 tracking-tighter">
                Get in Touch
                <span className="block w-12 h-1 bg-[#C9A84C] mt-4 rounded-full"></span>
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg">
                <div className="flex items-center gap-3 md:gap-4 group p-3 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#0A1128] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-900 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-medium tracking-wide">010-6868-9321</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 group p-3 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#0A1128] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-900 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-medium tracking-wide">byulsi@naver.com</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer p-3 md:p-4 rounded-2xl hover:bg-[#FFF9C4]/30 transition-colors border border-transparent hover:border-[#FEE500]/50">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#FEE500] flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#371D1E]" />
                  </div>
                  <span className="text-gray-800 font-semibold tracking-wide">카카오톡 실시간 상담</span>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2} className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] to-[#1E2E5C] p-8 md:p-12 rounded-3xl text-white flex flex-col justify-center shadow-2xl border border-white/10">
              {/* Decorative background element for Impact card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles size={16} /> OUR IMPACT
                </p>
                <h3 className="text-2xl md:text-3xl font-light mb-8 md:mb-10 leading-snug">
                  의미 있는 경험으로 <br />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">가치 있는 시간</span>을 만듭니다.
                </h3>
                <div className="grid grid-cols-2 gap-6 md:gap-8 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:h-px before:-top-4 md:before:-top-5">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold tracking-tight"><AnimatedNumber value={1000} /><span className="text-[#C9A84C]">+</span></p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Students</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold tracking-tight"><AnimatedNumber value={100} /><span className="text-[#C9A84C]">+</span></p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Partners</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-200 py-8 md:py-12 px-6 md:px-8 bg-white/60 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <img src="/logo.png" alt="BYULSI" className="w-10 h-10 object-contain grayscale opacity-60" />
              <div className="text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-gray-700 mb-1">별다섯시간 (BYULSI)</p>
                <p>대표: 윤소하 | 이메일: byulsi@naver.com | 전화: 010-6868-9321</p>
              </div>
            </div>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase text-center md:text-left mt-2 md:mt-0">© 2024 BYULSI. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </motion.div>
  );
}