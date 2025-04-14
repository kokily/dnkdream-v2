import { signJwtAccessToken } from '@/libs/auth';
import db from '@/libs/database';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface AuthPayload {
  password: string;
}

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as AuthPayload;

  const user = await db.user.findFirst();

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithOutPassword } = user;
    const token = signJwtAccessToken(userWithOutPassword);
    const result = {
      ...userWithOutPassword,
      token,
    };

    return NextResponse.json(result);
  } else {
    throw new Error('사용자가 없거나 비밀번호가 틀렸습니다.');
  }
}
