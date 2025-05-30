import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  const result = posts.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    createdAt: p.createdAt, // เพิ่มตรงนี้
    // commentsCount: p._count.Comment (ถ้ามี)
  }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  // ต้องมี user id = 1 ในฐานข้อมูล
  const post = await prisma.post.create({
    data: { title, content, authorId: 1 },
  });
  return NextResponse.json(post, { status: 201 });
}
