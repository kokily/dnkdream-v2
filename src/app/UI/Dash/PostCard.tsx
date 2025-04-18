import type { Post } from '@prisma/client';
import styles from './PostCard.module.scss';
import { findImgInMarkdown } from '@/libs/utils';
import Image from 'next/image';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const thumbnail = findImgInMarkdown(post.body);

  return (
    <div className={styles.card_container}>
      <div onClick={() => {}} className={styles.card_thumbnail}>
        {thumbnail === null ? (
          <div>{post.title.slice(0, 1)}</div>
        ) : (
          <Image
            src={thumbnail}
            alt="썸네일"
            width={650}
            height={360}
            priority
          />
        )}
      </div>

      <h2 onClick={() => {}}>{post.title}</h2>

      <div className={styles.card_tagbox}>
        {post.tags.map((tag) => (
          <div className={styles.card_tag} key={tag}>
            #{tag}
          </div>
        ))}
      </div>

      <div className={styles.card_datebox}>
        {post.createdAt.toString()} 작성
      </div>
    </div>
  );
}
