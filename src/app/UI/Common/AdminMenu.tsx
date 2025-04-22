import type { MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './AdminMenu.module.scss';
import AdminMenuItem from './AdminMenuItem';
import { signOut } from 'next-auth/react';

interface Props {
  menuOpen: boolean;
  onClose: (e: MouseEvent) => void;
}

export default function AdminMenu({ menuOpen, onClose }: Props) {
  return (
    <div
      className={clsx(styles.admin_menu, {
        [styles.visible]: menuOpen,
      })}
      onClick={onClose}
    >
      <div className={styles.admin_menu_layout}>
        <AdminMenuItem href="/">인덱스</AdminMenuItem>
        <AdminMenuItem href="/write">글 작성</AdminMenuItem>

        <div className={styles.split} />

        <AdminMenuItem
          onClick={async () => {
            await signOut({
              callbackUrl: '/',
            });
          }}
        >
          로그아웃
        </AdminMenuItem>
      </div>
    </div>
  );
}
