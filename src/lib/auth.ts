import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token.value, process.env.NEXTAUTH_SECRET!) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export function generateToken(userId: string, email: string, plan: string) {
  return jwt.sign(
    { userId, email, plan },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '7d' }
  );
}
