import type { Post } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './Dashboard.module.scss';
import PostCard from './PostCard';
import Link from 'next/link';
import Search from '../Common/Search';
import Skeleton from '../Common/Skeleton';

interface Props {
  posts: Array<Post>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onUpdatePost: (id: string) => void;
  loading: boolean;
}

export default function Dashboard({
  posts,
  search,
  onChange,
  onSearch,
  onUpdatePost,
  loading,
}: Props) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_header}>
        <div className={styles.dashboard_search_box}>
          <Link href="/write">
            <button className={styles.dashboard_search_button}>글 작성</button>
          </Link>

          <Search
            mode="제목"
            search={search}
            onChange={onChange}
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className={styles.dashboard_card_container}>
        {loading ? (
          Array(9)
            .fill(null)
            .map((_, i) => <Skeleton key={i} height={399.73} />)
        ) : (
          <>
            {posts.length < 1 ? (
              <div>임시 저장된 포스트가 없습니다.</div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpdatePost={onUpdatePost}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
