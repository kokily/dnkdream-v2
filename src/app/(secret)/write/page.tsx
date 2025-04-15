'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPost } from '@/libs/actions';
import EditorWrapper from '@/app/UI/Editor/EditorWrapper';
import Popup from '@/app/UI/Common/Popup';
import useHotKey from '@/libs/hooks';
import { toast } from 'react-toastify';

export default function WritePostPage() {
  const router = useRouter();

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
      tags,
    };

    const formData = new FormData(e.currentTarget);
    formData.append('postData', JSON.stringify(postData));
    formAction(formData);
  };

  const onExit = () => {
    router.replace('/');
  };

  const onTempSave = async () => {
    if (!title || !!body) {
      toast.error('제목 또는 내용이 비어있습니다.');
      return;
    }

    // 계획: Temp 모델을 Post와 같이 만들어서 작성일시를 기준으로 정렬
    // Post 모델에 isPublished: boolean을 두어서 임시 저장은 Temp로 그 문서를 퍼블리싱하면 posts로 나오게
    // 또한 Temp 문서를 퍼블리싱하면 그 Temp를 삭제하고 Post로 저장하면서 퍼블리싱
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
      {state?.message && <Popup visible>{state.message}</Popup>}
    </>
  );
}
