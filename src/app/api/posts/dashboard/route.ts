import { NextRequest, NextResponse } from 'next/server';
import db from '@/libs/database';
import { getQuery } from '@/libs/utils';

export async function GET(req: NextRequest) {
  const cursor = getQuery({ req, queryName: 'cursor' });

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 10;

  try {
    const posts = await db.post.findMany({
      where: {
        isPublished: false,
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (err: any) {
    throw new Error(err);
  }
}
