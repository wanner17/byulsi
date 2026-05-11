import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { r2 } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

async function deleteR2Image(imageUrl: string) {
  const publicUrl = process.env.R2_PUBLIC_URL ?? "";
  if (!imageUrl.startsWith(publicUrl)) return;
  const key = imageUrl.replace(publicUrl + "/", "");
  await r2.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key }));
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/partners/[id]">
) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const { name, imageUrl, order } = await request.json();

  const existing = await prisma.partner.findUnique({ where: { id } });
  const partner = await prisma.partner.update({ where: { id }, data: { name, imageUrl, order } });

  if (existing && existing.imageUrl !== imageUrl) {
    await deleteR2Image(existing.imageUrl);
  }

  return Response.json(partner);
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/partners/[id]">
) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) return Response.json({ error: "Not found" }, { status: 404 });

  await prisma.partner.delete({ where: { id } });
  try {
    await deleteR2Image(partner.imageUrl);
  } catch {
    // R2 이미지 삭제 실패해도 DB는 이미 삭제됨
  }

  return Response.json({ ok: true });
}
