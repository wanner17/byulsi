"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function HomeContent() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);
  const cursorX = useSpring(rawMouseX, { stiffness: 250, damping: 20 });
  const cursorY = useSpring(rawMouseY, { stiffness: 250, damping: 20 });

  const moveX_sm = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const moveY_sm = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const moveX_lg = useTransform(smoothMouseX, [-1, 1], [35, -35]);
  const moveY_lg = useTransform(smoothMouseY, [-1, 1], [35, -35]);

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    ["#ffffff", "#ffffff", "#0A1128", "#0A1128"]
  );

  const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ backgroundColor }} className="w-full overflow-x-hidden font-sans text-[#0A1128]">

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0A1128] pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <img
                src="/logo.png"
                alt="BYULSI"
                className="w-20 h-20 md:w-24 md:h-24 mb-8 object-contain filter drop-shadow-[0_0_20px_rgba(201,168,76,0.6)]"
              />
              <h1 className="text-2xl md:text-3xl font-light tracking-[0.4em] text-white flex items-center gap-4">
                <span className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
                BYULSI
                <span className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-4 text-sm md:text-base text-[#C9A84C] font-light tracking-[0.6em] ml-[0.6em]"
              >
                별다섯시간
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#C9A84C] pointer-events-none z-[9999] hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.4)]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
      </motion.div>

      {/* SECTION 1: Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden"
      >
        <motion.div
          style={{ x: moveX_sm, y: moveY_sm }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            backgroundColor: ["#dbeafe", "#fef3c7", "#dbeafe"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: moveX_lg, y: moveY_lg }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            backgroundColor: ["#fef3c7", "#f3e8ff", "#fef3c7"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        />

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

        <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-start gap-8 md:gap-16 px-4 md:px-0">
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
            className="w-64 h-64 md:w-[28rem] md:h-[28rem] flex-shrink-0 relative"
          >
            <motion.img
              src="/logo.png"
              alt="BYULSI Logo"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              style={{ rotateX, rotateY }}
            />
          </motion.div>

          <div className="text-left w-full">
            <FadeInUp delay={0.2}>
              <p className="text-[#8B7355] text-lg md:text-2xl font-light tracking-[0.2em] mb-4">
                새로운 시각, 끊임없는 물음
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 text-[#0A1128] leading-[1.1] break-keep">
                가치 있는 시간을 <br />
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#FFF5A5] to-[#C9A84C] mt-2 block"
                  style={{ backgroundSize: "200% auto" }}
                >
                  선물합니다.
                </motion.span>
              </h1>
            </FadeInUp>
          </div>
        </div>

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

      {/* SECTION 2: Philosophy */}
      <section
        id="vision"
        className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden bg-[#0A1128]"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

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

          <div className="space-y-8 relative z-10">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              물 위에 비친 별의 빛처럼,<br />
              우리는 새로운 시각으로<br className="md:hidden" />
              세상을 바라봅니다.
            </p>
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide leading-relaxed">
              작은 시선의 변화로<br />
              같은 시간도 다르게 바라보고,<br />
              <span className="text-white font-normal">더 나은 가치</span>를 만듭니다.
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
      </section>
    </motion.div>
  );
}
