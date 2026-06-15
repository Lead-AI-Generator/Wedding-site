'use server';

import { hash } from 'bcrypt';
import { prisma } from './prisma';

export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: { email: credentials.email, password },
  });
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: { password },
  });
}
