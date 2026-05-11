"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface Partner {
  id?: string;
  name: string;
  imageUrl: string;
  order: number;
}

interface Props {
  initial?: Partner;
  onSave: (data: Omit<Partner, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function PartnerForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setImageUrl(url);
    } else {
      const { error: msg } = await res.json();
      setError(msg ?? "업로드 실패");
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !imageUrl) {
      setError("업체명과 이미지를 모두 입력해주세요.");
      return;
    }
    setSaving(true);
    setError("");
    await onSave({ name, imageUrl, order });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0A1128]">
            {initial ? "파트너 수정" : "파트너 추가"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">업체명</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 삼성전자"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">로고 이미지</label>
            <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-xl p-4 hover:border-[#C9A84C] transition-colors">
              <Upload className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                {uploading ? "업로드 중..." : "파일 선택 (JPG, PNG, WebP, SVG · 5MB 이하)"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {imageUrl && (
              <div className="mt-2 flex items-center gap-3">
                <img src={imageUrl} alt="미리보기" className="w-16 h-16 object-contain rounded-lg border border-gray-100" />
                <span className="text-xs text-gray-400 truncate flex-1">{imageUrl}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">노출 순서</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              min={0}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-[#0A1128] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#C9A84C] transition-colors disabled:opacity-50"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
