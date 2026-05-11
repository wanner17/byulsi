import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: "asc" },
  });
  return Response.json(partners);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, imageUrl, order } = await request.json();

  if (!name || !imageUrl) {
    return Response.json({ error: "name and imageUrl required" }, { status: 400 });
  }

  const partner = await prisma.partner.create({
    data: { name, imageUrl, order: order ?? 0 },
  });

  return Response.json(partner, { status: 201 });
}
