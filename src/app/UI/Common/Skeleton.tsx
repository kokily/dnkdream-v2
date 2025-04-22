import React from 'react';
import styles from './Skeleton.module.scss';

interface Props {
  height: number;
}

export default function Skeleton({ height }: Props) {
  const style = {
    '--dynamic-height': `${height}px`,
  } as React.CSSProperties;

  return <div className={styles.skeleton_container} style={style} />;
}
