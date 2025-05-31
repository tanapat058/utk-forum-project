import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  // ตรวจสอบว่ามี username นี้อยู่แล้วหรือยัง
  const exist = await prisma.user.findUnique({ where: { username } });
  if (exist) {
    return NextResponse.json({ error: "Username already exists" }, { status: 400 });
  }
  // สร้าง user ใหม่
  const user = await prisma.user.create({
    data: { username, password },
  });
  return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
}
