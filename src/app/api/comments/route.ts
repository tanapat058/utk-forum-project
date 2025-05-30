import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const postId = Number(req.nextUrl.searchParams.get("postId"));
  if (!postId) return NextResponse.json([], { status: 200 });
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { id: "desc" },
    include: { user: true }, // join user
  });
  // ส่ง firstName หรือ username กลับไปด้วย
  const result = comments.map((c) => ({
    id: c.id,
    content: c.content,
    username: c.user?.firstName || c.user?.username || "ไม่ระบุชื่อ",
    createdAt: c.createdAt, // เพิ่มเวลาสร้าง
  }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { postId, userId, content } = await req.json();
  const newComment = await prisma.comment.create({
    data: { postId, userId, content },
  });
  return NextResponse.json(newComment, { status: 201 });
}
