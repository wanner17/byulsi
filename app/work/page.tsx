import Nav from "../components/Nav";
import WorkContent from "./WorkContent";

export const metadata = {
  title: "Work | BYULSI 별다섯시간",
  description: "BYULSI 주요 사업 영역 - 교육 프로그램, 행사 기획·주관, 맞춤 설계",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <WorkContent />
    </main>
  );
}
