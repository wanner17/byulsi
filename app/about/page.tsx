import Nav from "../components/Nav";
import AboutContent from "./AboutContent";

export const metadata = {
  title: "About | BYULSI 별다섯시간",
  description: "BYULSI 별다섯시간 - 같은 시간도 다르게 바라보고 그 안에서 가치를 만듭니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A1128]">
      <Nav />
      <AboutContent />
    </main>
  );
}
