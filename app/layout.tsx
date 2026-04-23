import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import RightNav from "./components/RightNav";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "별다섯시간(BYULSI) | 가치를 높이는 시간을 선물합니다",
  description: "기업교육, 행사기획, 맞춤 설계 전문 별다섯시간. 같은 시간도 다르게 바라보고 그 안에서 가치를 만듭니다.",
  keywords: ["별다섯시간", "BYULSI", "기업교육", "행사기획", "맞춤설계", "워크샵", "교육프로그램"],
  openGraph: {
    title: "별다섯시간(BYULSI)",
    description: "가치를 높이는 시간을 선물합니다. 기업교육 및 행사기획 전문.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A1128] text-slate-200 antialiased`}>
        <Nav />
        <RightNav />
        {children}
      </body>
    </html>
  );
}