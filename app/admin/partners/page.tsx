"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import PartnerForm from "./PartnerForm";

interface Partner {
  id: string;
  name: string;
  imageUrl: string;
  order: number;
}

export default function AdminPartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);

  async function loadPartners() {
    const res = await fetch("/api/partners");
    const data = await res.json();
    setPartners(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPartners();
  }, []);

  async function handleSave(data: Omit<Partner, "id">) {
    if (editing) {
      await fetch(`/api/partners/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setShowForm(false);
    setEditing(null);
    loadPartners();
  }

  async function handleDelete(partner: Partner) {
    if (!confirm(`"${partner.name}"을(를) 삭제하시겠습니까?`)) return;
    await fetch(`/api/partners/${partner.id}`, { method: "DELETE" });
    loadPartners();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#0A1128]">파트너 관리</h1>
          <p className="text-xs text-gray-400">별다섯시간 Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-[#0A1128] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#C9A84C] transition-colors"
          >
            <Plus className="w-4 h-4" />
            파트너 추가
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-400 py-20">불러오는 중...</p>
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">등록된 파트너가 없습니다.</p>
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="text-[#C9A84C] text-sm font-semibold hover:underline"
            >
              첫 번째 파트너 추가하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="bg-white rounded-2xl p-5 shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 min-h-[120px] hover:border-[#C9A84C] hover:text-[#C9A84C] text-gray-400 transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="text-sm font-semibold">파트너 추가</span>
            </button>
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0A1128] truncate">{partner.name}</p>
                    <p className="text-xs text-gray-400">순서: {partner.order}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(partner); setShowForm(true); }}
                    className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-500 rounded-lg py-1.5 text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(partner)}
                    className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-500 rounded-lg py-1.5 text-xs hover:border-red-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <PartnerForm
          initial={editing ?? undefined}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}
