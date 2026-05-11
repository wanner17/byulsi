import Nav from "../components/Nav";
import WorkContent from "./WorkContent";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata = {
  title: "Work | BYULSI 별다섯시간",
  description: "BYULSI 주요 사업 영역 - 교육 프로그램, 행사 기획·주관, 맞춤 설계",
};

async function getPartners() {
  try {
    return await prisma.partner.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const partners = await getPartners();
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <WorkContent partners={partners} />
    </main>
  );
}
