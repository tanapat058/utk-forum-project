'use server'; // ใช้กับ Next.js App Router และ Server Actions (เฉพาะ Next.js 13+)

import { prisma } from '@/lib/prisma'; // หรือ path ไปยัง prisma instance ของคุณ

export async function login(username: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username }, // <-- ใช้ username ได้แน่นอน เพราะ schema.prisma ตอนนี้สะกดถูกแล้ว
  });

  // ตรวจสอบรหัสผ่านตรง (ในของจริงควรใช้ bcrypt เปรียบเทียบ)
  if (user && user.password === password) {
    return true;
  }

  return false;
}
