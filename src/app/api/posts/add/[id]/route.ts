import { NextRequest, NextResponse } from 'next/server';
import db from '@/libs/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const payload = (await req.json()) as PostData;

  try {
    const post = await db.post.update({
      where: { id },
      data: {
        ...payload,
        isPublished: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(post);
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
