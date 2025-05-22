'use server';

import { prisma } from '@/lib/prisma';

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user?.password === password;
}
