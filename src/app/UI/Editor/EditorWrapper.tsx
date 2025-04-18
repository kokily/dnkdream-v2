'use client';

import { FormEvent, type ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import styles from './EditorWrapper.module.scss';
import PreviewBody from './PreviewBody';

const CodeMirrorProvider = dynamic(() => import('./EditorProvider'), {
  ssr: false,
});

interface Props {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  body: string;
  onChangeBody: (text: string) => void;
  tags: string[];
  onChangeTags: (nextTages: string[]) => void;
  onAddPost: (e: FormEvent<HTMLFormElement>) => void;
  onExit: () => void;
  onTempSave: () => void;
}

export default function EditorWrapper({
  title,
  onChangeTitle,
  placeholder,
  body,
  onChangeBody,
  tags,
  onChangeTags,
  onAddPost,
  onExit,
  onTempSave,
}: Props) {
  return (
    <div className={styles.editor_wrapper}>
      <CodeMirrorProvider
        title={title}
        onChangeTitle={onChangeTitle}
        placeholder={placeholder}
        body={body}
        onChangeBody={onChangeBody}
        tags={tags}
        onChangeTags={onChangeTags}
        onAddPost={onAddPost}
        onExit={onExit}
        onTempSave={onTempSave}
      />
      <div className={styles.right}>
        <PreviewBody title={title} body={body} />
      </div>
    </div>
  );
}
