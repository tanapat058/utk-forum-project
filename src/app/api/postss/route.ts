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
    category: p.category, // ส่ง category ออกมาด้วย
    // commentsCount: p._count.Comment (ถ้ามี)
  }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { title, content, authorId } = await req.json();
  if (!authorId) {
    return NextResponse.json({ error: "authorId is required" }, { status: 400 });
  }
  const post = await prisma.post.create({
    data: { title, content, authorId },
  });
  return NextResponse.json(post, { status: 201 });
}
