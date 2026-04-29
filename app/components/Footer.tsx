export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 py-8 md:py-12 px-6 md:px-8 bg-white/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <img src="/logo.png" alt="BYULSI" className="w-10 h-10 object-contain grayscale opacity-60" />
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="font-bold text-gray-700 mb-1">별다섯시간 (BYULSI)</p>
            
            {/* 모바일(block)에서는 한 줄씩, PC(md:inline-block)에서는 구분선(|)과 함께 나열 */}
            <div className="flex flex-col md:flex-row md:gap-x-2">
              <span className="block">대표: 윤소하</span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="block">이메일: byulsi@naver.com</span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="block">전화: 010-6868-9321</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-[10px] tracking-widest uppercase text-center md:text-left mt-2 md:mt-0">
          © 2024 BYULSI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
