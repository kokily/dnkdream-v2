import { NextRequest, NextResponse } from 'next/server';
import db from '@/libs/database';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as PostData;

  try {
    const post = await db.post.create({
      data: {
        ...payload,
        isPublished: false,
      },
    });

    return NextResponse.json(post);
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
