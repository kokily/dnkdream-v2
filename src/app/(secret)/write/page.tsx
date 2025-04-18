'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditorWrapper from '@/app/UI/Editor/EditorWrapper';
import useHotKey from '@/libs/hooks';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { tempSaveAPI } from '@/libs/client';

export default function WritePostPage() {
  const router = useRouter();

  const [tempId, setTempId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const tempSaveMutate = useMutation({ mutationFn: tempSaveAPI });

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
  };

  const onExit = () => {
    router.replace('/');
  };

  const onTempSave = async () => {
    if (!title || !body) {
      toast.error('제목 또는 내용이 비어있습니다.');
      return;
    }

    if (tags.length < 1) {
      toast.error('태그는 최소 한 개 이상 작성해주세요.');
      return;
    }

    if (!tempId) {
      await tempSaveMutate.mutateAsync(
        {
          title,
          body,
          tags,
        },
        {
          onSuccess: (data) => {
            toast.success(`임시저장 완료: ${data.title}`);
            setTempId(data.id);
            return;
          },
          onError: (err) => {
            toast.error(err.message);
            return;
          },
        },
      );
    } else {
      await tempSaveMutate.mutateAsync(
        {
          id: tempId,
          title,
          body,
          tags,
        },
        {
          onSuccess: (data) => {
            toast.success(`임시저장 완료: ${data.title}`);
            return;
          },
          onError: (err) => {
            toast.error(err.message);
            return;
          },
        },
      );
    }
  };

  useHotKey(() => onTempSave());

  return (
    <>
      <EditorWrapper
        title={title}
        onChangeTitle={onChangeTitle}
        placeholder="제목을 작성하세요."
        body={body}
        onChangeBody={onChangeBody}
        tags={tags}
        onChangeTags={onChangeTags}
        onAddPost={onAddPost}
        onExit={onExit}
        onTempSave={onTempSave}
      />
    </>
  );
}
