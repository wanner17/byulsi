"use client";

import { motion } from "framer-motion";
import { Star, Phone, Mail, MessageCircle, ChevronDown } from "lucide-react";

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

export default function HomeContent() {
  return (
    <div className="w-full overflow-x-hidden font-sans bg-white text-[#0A1128]">
      
      {/* ── SECTION 1: Hero (이미지 1번 스타일) ── */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col items-center justify-center px-8"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-64 h-64 md:w-96 md:h-96 relative"
          >
            <img
              src="/logo.png" 
              alt="BYULSI Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="text-center md:text-left">
            <FadeInUp delay={0.2}>
              <p className="text-[#8B7355] text-lg md:text-xl font-light tracking-[0.2em] mb-4">
                새로운 시각, 끊임없는 물음
              </p>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                가치 있는 시간을 <span className="font-bold">선물합니다.</span>
              </h1>
            </FadeInUp>
          </div>
        </div>

        {/* 1번 섹션 -> 2번 섹션 버튼 */}
        <motion.button
          onClick={() => scrollToSection("vision")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer"
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
        className="relative min-h-screen flex items-center justify-center bg-[#F9FAFB] px-8"
      >
        <FadeInUp className="text-center space-y-12">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-[#5B7B9A] font-light leading-relaxed">
              꼭 하늘을 보지 않아도<br />
              <span className="font-semibold text-[#0A1128]">작은 물 위에도 별은 비칩니다.</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-600 font-light">
              우리는 그렇게 <span className="text-[#0A1128] font-normal">새로운 시각</span>으로 세상을 바라봅니다
            </p>
            <p className="text-lg md:text-xl text-gray-500 font-light tracking-wide">
              같은 시간도 다르게 바라보며<br />
              더 나은 가치를 만듭니다.
            </p>
          </div>

          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-[#C9A84C] w-5 h-5" fill="currentColor" />
            ))}
          </div>
        </FadeInUp>

        {/* 2번 섹션 -> 3번 섹션 버튼 (추가됨) */}
        <motion.button
          onClick={() => scrollToSection("contact")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 border border-gray-200 px-4 py-2 rounded-full group-hover:border-gray-400 transition-colors uppercase">
            Get in Touch
          </span>
          <ChevronDown className="text-gray-300 w-5 h-5" />
        </motion.button>
      </section>

      {/* ── SECTION 3: Contact & Info ── */}
      <section id="contact" className="min-h-screen flex flex-col justify-between bg-white pt-20">
        <div className="flex-grow flex items-center justify-center px-8 py-10">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeInUp>
              <h2 className="text-4xl font-bold text-[#0A1128] mb-8 tracking-tighter">Get in Touch</h2>
              <div className="space-y-6 text-lg">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0A1128] transition-colors">
                    <Phone size={18} className="text-gray-600 group-hover:text-white" />
                  </div>
                  <span className="text-gray-700">010-6868-9321</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0A1128] transition-colors">
                    <Mail size={18} className="text-gray-600 group-hover:text-white" />
                  </div>
                  <span className="text-gray-700">byulsi@naver.com</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center">
                    <MessageCircle size={18} className="text-black" />
                  </div>
                  <span className="text-gray-700 font-medium">카카오톡 실시간 상담</span>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2} className="bg-[#0A1128] p-10 rounded-2xl text-white flex flex-col justify-center shadow-xl">
              <p className="text-[#C9A84C] text-sm tracking-widest mb-4">OUR IMPACT</p>
              <h3 className="text-2xl font-light mb-8 leading-snug">
                의미 있는 경험으로 <br />
                <span className="font-bold underline decoration-[#C9A84C] underline-offset-8">가치 있는 시간</span>을 만듭니다.
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold">1,000 +</p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-tighter">Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100 +</p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-tighter">Partners</p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12 px-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <img src="/logo.png" alt="BYULSI" className="w-10 h-10 object-contain grayscale opacity-60" />
              <div className="text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-gray-700 mb-1">별다섯시간 (BYULSI)</p>
                <p>대표: 윤소하 | 이메일: byulsi@naver.com | 전화: 010-6868-9321</p>
              </div>
            </div>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase">© 2024 BYULSI. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  );
}