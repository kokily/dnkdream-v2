import type { Post } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './Dashboard.module.scss';
import PostCard from './PostCard';

interface Props {
  posts: Array<Post>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onUpdatePost: (id: string) => void;
}

export default function Dashboard({
  posts,
  search,
  onChange,
  onSearch,
  onUpdatePost,
}: Props) {
  return (
    <div className={styles.dashboard}>
      {!posts || posts.length < 1 ? (
        <div>임시 저장된 포스트가 없습니다.</div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
