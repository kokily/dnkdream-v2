import type { PropsWithChildren } from 'react';
import styles from './AdminTemplate.module.scss';
import AdminHeader from './AdminHeader';

export default function AdminTemplate({ children }: PropsWithChildren) {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_layout}>
        <AdminHeader />

        <div className={styles.page_child_box}>{children}</div>
      </div>
    </div>
  );
}
