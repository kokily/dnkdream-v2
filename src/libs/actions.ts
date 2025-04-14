'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function addPost(prevState: any, formData: FormData) {
  const postDataJSON = formData.get('postData');

  if (typeof postDataJSON !== 'string') {
    return {
      message: '데이터 형식이 올바르지 않습니다.',
    };
  }

  try {
    const postData: PostData = JSON.parse(postDataJSON);
    const { title, body, thumbnail, tags } = postData;

    const result = await sql`
      INSERT INTO post (title, body, thumbnail, tags)
      VALUES (${title}, ${body}, ${thumbnail}, ${JSON.stringify(tags)})
      RETURNING id;
    `;

    revalidatePath('/posts');
    revalidatePath(`/posts/${result.rows[0].id}`);

    return {
      message: '포스트가 성공적으로 저장되었습니다.',
      postId: result.rows[0].id,
    };
  } catch (err: any) {
    console.log('포스트 저장 실패: ', err);
    return {
      message: '포스트 저장에 실패했습니다.',
    };
  }
}
