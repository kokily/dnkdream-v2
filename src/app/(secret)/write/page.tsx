'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EditorBody = dynamic(() => import('@/app/UI/Editor/EditorBody'), {
  ssr: false,
});

const MirrorBody = dynamic(() => import('@/app/UI/Editor/MirrorBody'), {
  ssr: false,
});

export default function WritePostPage() {
  return (
    <div>
      <h1>에디터 테스트</h1>
      <Suspense fallback={<div>Loading</div>}>
        <MirrorBody />
      </Suspense>
    </div>
  );
}
