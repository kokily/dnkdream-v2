'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './AdminHeader.module.scss';
import AdminMenu from './AdminMenu';

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onToggleMenu = () => setMenuOpen((prev) => !prev);

  const onOutsideClick = useCallback((e: any) => {
    if (ref.current && !ref.current.contains(e.target as any)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => window.removeEventListener('click', onOutsideClick, true);
  }, [ref]);

  return (
    <header className={styles.admin_header}>
      <div className={styles.admin_contents}>
        <a className={styles.admin_logo}>D&amp;K Blog</a>

        <div className={styles.space} />

        <div ref={ref}>
          <div className={styles.menu_button} onClick={onToggleMenu}>
            메 뉴
          </div>

          <AdminMenu menuOpen={menuOpen} onClose={onOutsideClick} />
        </div>
      </div>
    </header>
  );
}
