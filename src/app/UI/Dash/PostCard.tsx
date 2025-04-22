import type { Post } from '@prisma/client';
import styles from './PostCard.module.scss';
import { findImgInMarkdown, sliceText } from '@/libs/utils';

interface Props {
  post: Post;
  onUpdatePost: (id: string) => void;
}

export default function PostCard({ post, onUpdatePost }: Props) {
  const thumbnail = findImgInMarkdown(post.body);

  return (
    <div
      className={styles.card_container}
      onClick={() => onUpdatePost(post.id)}
    >
      <div className={styles.card_layout}>
        {thumbnail === null ? (
          <div className={styles.card_non_thumbnail}>
            <h1>{post.title.slice(0, 3)}</h1>
          </div>
        ) : (
          <img
            className={styles.card_thumbnail}
            src={thumbnail}
            alt={`${post.title} 썸네일`}
          />
        )}
        <div className={styles.card_content}>
          <h4 className={styles.card_title} title={post.title}>
            {sliceText(post.title, 20)}
          </h4>
          <p>{new Date(post.createdAt).toLocaleDateString()} 작성</p>
          <p className={styles.card_tags}>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
