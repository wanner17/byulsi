"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  return (
    <div className="pt-20">

      {/* Hero banner */}
      <section className="relative h-60 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1128]/70" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 inline-block bg-[#1a2a5e] text-white text-2xl md:text-4xl font-bold px-10 py-4"
        >
          About BYULSI
        </motion.h1>
      </section>

      {/* Main content */}
      <section className="py-24 px-4 bg-[#0A1128]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">

            <FadeInUp className="md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">BYULSI, 별다섯시간은</h2>
              <p className="text-slate-300 leading-loose mb-4">
                같은 시간도<br />
                어떤 시선으로 바라보느냐에 따라<br />
                전혀 다른 경험이 된다고 믿습니다.
              </p>
              <p className="text-slate-300 leading-loose mb-4">
                기업, 학교, 공공기관 등<br />
                다양한 현장에서<br />
                각 대상과 목적에 맞는 과정과 경험을 함께 만들어갑니다.
              </p>
              <p className="text-slate-300 leading-loose mb-10">
                우리는 단순히 제공하는 것이 아니라<br />
                그 시간이 가치 있는 결과로 남도록 합니다.
              </p>

              <div className="border border-slate-500 px-6 py-4 text-center mb-8">
                <p className="text-white text-base md:text-lg font-medium tracking-wider">
                  교육 프로그램 / 행사 기획·주관 / 맞춤 설계
                </p>
              </div>

              <a
                href="/work"
                className="inline-flex items-center gap-2 border border-slate-500 text-white px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                서비스 보기 <ArrowRight size={16} className="text-[#F4D03F]" />
              </a>
            </FadeInUp>

            <FadeInUp delay={0.3} className="md:w-1/2 flex justify-center items-start pt-4">
              <img
                src="/vertical-concept.png"
                alt="BYULSI Vertical Concept"
                className="w-full max-w-sm object-contain bg-white/5 rounded-xl p-6"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="py-20 px-4 bg-white">
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

    </div>
  );
}
