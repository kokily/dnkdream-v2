import type { Post } from '@prisma/client';
import axios from 'axios';
import qs from 'qs';

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://dnkdream.com/api'
      : 'http://localhost:3000/api',
  withCredentials: true,
});

// Add Post
type AddPostType = TempPostType;

export async function addPostAPI(payload: AddPostType) {
  const { id, title, body, tags } = payload;
  const postBody = { title, body, tags };

  if (!id) {
    const response = await client.post<Post>('/posts/add', postBody);
    return response.data;
  } else {
    const response = await client.patch<Post>(`/posts/add/${id}`, postBody);
    return response.data;
  }
}

// Temp Save Post
type TempPostType = {
  id?: string;
} & PostData;

export async function tempSaveAPI(payload: TempPostType) {
  const { id, title, body, tags } = payload;
  const postBody = { title, body, tags };

  if (!id) {
    const response = await client.post<Post>('/posts/temp', postBody);
    return response.data;
  } else {
    const response = await client.patch<Post>(`/posts/temp/${id}`, postBody);
    return response.data;
  }
}

// DashBoardAPI
type DashBoardQueries = {
  cursor?: string;
  title?: string;
};

export async function dashBoardAPI(queries: DashBoardQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Post[]>(`/posts/dashboard?${queryString}`);
  return response.data;
}
