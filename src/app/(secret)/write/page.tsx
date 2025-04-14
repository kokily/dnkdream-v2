'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useActionState, useState } from 'react';
import { addPost } from '@/libs/actions';
import EditorWrapper from '@/app/UI/Editor/EditorWrapper';

export default function WritePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [state, formAction] = useActionState(addPost, null);

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeBody = (text: string) => {
    setBody(text);
  };

  const onChangeTags = (nextTags: string[]) => {
    setTags(nextTags);
  };

  const onAddPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData: PostData = {
      title,
      body,
      thumbnail: 'https://naver.com/apspsp',
      tags,
    };

    const formData = new FormData(e.currentTarget);
    formData.append('postData', JSON.stringify(postData));
    formAction(formData);
  };

  return (
    <EditorWrapper
      title={title}
      onChangeTitle={onChangeTitle}
      placeholder="제목을 작성하세요."
      body={body}
      onChangeBody={onChangeBody}
      tags={tags}
      onChangeTags={onChangeTags}
    />
  );
}
