import { NextRequest, NextResponse } from 'next/server';
import db from '@/libs/database';
import { getQuery } from '@/libs/utils';

export async function GET(req: NextRequest) {
  const title = getQuery({ req, queryName: 'title' });
  const tag = getQuery({ req, queryName: 'tag' });
  const cursor = getQuery({ req, queryName: 'cursor' });

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 10;

  try {
    const posts = await db.post.findMany({
      where: {
        title: {
          contains: title,
        },
        tags: {
          has: tag,
        },
      },
      skip: cursor !== '' ? 1 : 0,
      cursor: cursorObj,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
