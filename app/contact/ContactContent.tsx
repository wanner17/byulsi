"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, animate, useInView } from "framer-motion";
import { Phone, Mail, MessageCircle, Sparkles } from "lucide-react";

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
        },
      });
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
};

export default function ContactContent() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const moveX_sm = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const moveY_sm = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const moveX_lg = useTransform(smoothMouseX, [-1, 1], [35, -35]);
  const moveY_lg = useTransform(smoothMouseY, [-1, 1], [35, -35]);

  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);
  const handleCardMouseMove = (e: any) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    cardMouseX.set(e.clientX - left);
    cardMouseY.set(e.clientY - top);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] font-sans text-[#0A1128] flex flex-col justify-between pt-20 overflow-hidden">
      {/* Background Decorative Blobs */}
      <motion.div
        style={{ x: moveX_sm, y: moveY_sm }}
        className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"
      />
      <motion.div
        style={{ x: moveX_lg, y: moveY_lg }}
        className="absolute bottom-40 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#C9A84C]/15 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none"
      />

      {/* Outlined Floating Watermark */}
      <div className="absolute top-1/4 -left-10 w-full overflow-hidden pointer-events-none z-0 opacity-5">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-2, 0, -2] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="text-[12vw] font-black tracking-tighter text-transparent whitespace-nowrap select-none"
          style={{ WebkitTextStroke: "2px #0A1128" }}
        >
          GET IN TOUCH
        </motion.div>
      </div>

      <div className="flex-grow flex items-center justify-center px-6 md:px-8 py-10 relative z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
              <a href="http://pf.kakao.com/_GxhGjX/chat" target="_blank" rel="noopener noreferrer" className="text-gray-800 font-semibold tracking-wide">
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer p-3 md:p-4 rounded-2xl hover:bg-[#FFF9C4]/30 transition-colors border border-transparent hover:border-[#FEE500]/50">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#FEE500] flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#371D1E]" />
                  </div>
                  카카오톡 실시간 상담
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-full"
          >
            <div
              onMouseMove={handleCardMouseMove}
              className="group relative overflow-hidden bg-gradient-to-br from-[#0A1128] to-[#1E2E5C] p-8 md:p-10 rounded-3xl text-white flex flex-col justify-center shadow-2xl border border-white/10 h-full"
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-20"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      400px circle at ${cardMouseX}px ${cardMouseY}px,
                      rgba(201, 168, 76, 0.25),
                      transparent 80%
                    )
                  `,
                }}
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
              <div className="relative z-10">
                <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles size={16} /> OUR IMPACT
                </p>
                <h3 className="text-xl md:text-[1.65rem] font-light mb-8 md:mb-10 leading-tight tracking-tight">
                  <span className="block mb-2 break-keep">의미 있는 경험으로</span>
                  <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 break-keep">
                    가치 있는 시간을 만듭니다.
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-6 md:gap-8 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:h-px before:-top-4 md:before:-top-5">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold tracking-tight">
                      <AnimatedNumber value={1000} /><span className="text-[#C9A84C]">+</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Students</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold tracking-tight">
                      <AnimatedNumber value={100} /><span className="text-[#C9A84C]">+</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
