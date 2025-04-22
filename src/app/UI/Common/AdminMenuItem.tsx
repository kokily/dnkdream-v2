import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './AdminMenuItem.module.scss';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: (e: any) => void;
}

export default function AdminMenuItem({ children, href, onClick }: Props) {
  const jsx = (
    <div className={styles.admin_menu_item} onClick={onClick}>
      {children}
    </div>
  );

  return href ? (
    <Link href={href}>
      <div className={styles.admin_menu_link}>{jsx}</div>
    </Link>
  ) : (
    jsx
  );
}
