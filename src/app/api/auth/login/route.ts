import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Plan } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Define the exact shape of the user object we’re selecting
type UserWithPassword = {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user: UserWithPassword | null = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        password: true, // must explicitly select this
      },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, plan: user.plan },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
