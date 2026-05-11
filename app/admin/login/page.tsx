"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/partners");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0A1128] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl">
        <h1 className="text-2xl font-bold text-[#0A1128] mb-2">관리자 로그인</h1>
        <p className="text-sm text-gray-400 mb-8">별다섯시간 Admin</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A1128] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#C9A84C] transition-colors disabled:opacity-50"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
