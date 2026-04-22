"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

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

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="inline-block bg-[#1a2a5e] text-white text-xl md:text-3xl font-bold px-8 py-3 mb-12">
    {children}
  </h2>
);

export default function WorkContent() {
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
          What We Do
        </motion.h1>
      </section>

      {/* What We Do */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {[
              {
                title: "교육 프로그램",
                desc: "목적에 맞는 교육 프로그램을 기획하고 운영합니다.",
                items: ["기업 교육 및 연수", "진로 및 체험형 교육", "활동형 프로그램 운영"],
              },
              {
                title: "행사 기획·주관",
                desc: "행사의 전 과정을 기획하고 주관합니다.",
                items: ["기업 및 기관 행사", "학교 및 공공 행사", "프로그램 중심 행사"],
              },
              {
                title: "맞춤 설계",
                desc: "상황에 맞는 내용과 흐름을 구성합니다.",
                items: ["대상 및 목적 분석", "콘텐츠 기획 및 개발", "운영 시나리오 설계"],
              },
            ].map((service, idx) => (
              <FadeInUp key={idx} delay={idx * 0.15}>
                <div className="text-[#C9A84C] text-2xl mb-3">◆</div>
                <h3 className="text-lg font-bold text-[#0A1128] mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="space-y-1.5">
                  {service.items.map((item, i) => (
                    <p key={i} className="text-slate-500 text-sm">&gt;&nbsp;{item}</p>
                  ))}
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 px-4 bg-[#f5f6fa]">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <SectionHeader>How We Work (Process)</SectionHeader>
          </FadeInUp>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-24">
            {[
              { title: "기획", desc: "목적과\n방향을\n설정합니다." },
              { title: "구성", desc: "내용과\n흐름을\n구체화합니다" },
              { title: "진행", desc: "현장에서\n안정적으로\n운영합니다" },
              { title: "결과", desc: "의미 있는\n성과로\n이어지도록 합니다" },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <FadeInUp delay={idx * 0.15} className="flex-shrink-0">
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-[#0A1128] flex flex-col items-center justify-center text-center px-3">
                    <p className="text-[#0A1128] font-bold text-lg mb-1">{step.title}</p>
                    <p className="text-[#444] text-xs leading-relaxed whitespace-pre-line">{step.desc}</p>
                  </div>
                </FadeInUp>
                {idx < 3 && (
                  <ArrowRight className="hidden md:block text-[#0A1128] flex-shrink-0" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Why Us */}
          <FadeInUp>
            <SectionHeader>Why Us</SectionHeader>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              {
                title: "통합 운영 역량",
                sub: "하나의 흐름으로 이어집니다.",
                desc: "기획부터 실행까지 유기적으로 이어갑니다.",
              },
              {
                title: "현장 중심 실행력",
                sub: "현장에서 완성됩니다.",
                desc: "실행 중심의 운영으로 완성도를 높입니다.",
              },
              {
                title: "맞춤형 기획",
                sub: "상황에 맞게 만듭니다.",
                desc: "대상과 환경에 맞춰 유연하게 구성합니다.",
              },
              {
                title: "다양한 대상 경험",
                sub: "다양한 경험을 가지고 있습니다.",
                desc: "기업, 학교, 공공기관 등 여러 현장에서 함께해왔습니다.",
              },
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <h4 className="text-[#0A1128] font-bold text-base mb-0.5">{item.title}</h4>
                <p className="text-slate-700 text-sm font-medium">{item.sub}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
