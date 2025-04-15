import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Popup.module.scss';

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

export default function Popup({ children, visible }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeout = null;

    if (visible) {
      setIsOpen(true);
    } else {
      timeout = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [visible]);

  if (!visible && !isOpen) return null;

  return (
    <>
      <div className={styles.popup} />
      <div
        className={clsx(styles.popup_layer, {
          [styles.visible]: visible === true,
          [styles.invisible]: visible === false,
        })}
      >
        {children}
      </div>
    </>
  );
}
