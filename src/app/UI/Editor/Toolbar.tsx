'use client';

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatQuote,
  MdInsertLink,
  MdImage,
  MdCode,
} from 'react-icons/md';
import clsx from 'clsx';
import styles from './Toolbar.module.scss';

interface Props {
  onClick: Function;
}

export default function Toolbar({ onClick = () => {} }: Props) {
  return (
    <div className={styles.toolbar}>
      <div
        className={clsx(styles.toolbar_item, 'ql-bold')}
        onClick={() => onClick('bold')}
      >
        <MdFormatBold />
      </div>
      <div
        className={clsx(styles.toolbar_item, 'ql-italic')}
        onClick={() => onClick('italic')}
      >
        <MdFormatItalic />
      </div>
      <div
        className={clsx(styles.toolbar_item, 'ql-strike')}
        onClick={() => onClick('strike')}
      >
        <MdFormatStrikethrough />
      </div>
      <div
        className={clsx(styles.toolbar_item, 'ql-blockquote')}
        onClick={() => onClick('blockquote')}
      >
        <MdFormatQuote />
      </div>
      <div className={styles.divider} />
      <div className={styles.toolbar_item} onClick={() => onClick('link')}>
        <MdInsertLink />
      </div>
      <div className={styles.toolbar_item} onClick={() => onClick('image')}>
        <MdImage />
      </div>
      <div className={styles.toolbar_item} onClick={() => onClick('codeblock')}>
        <MdCode />
      </div>
    </div>
  );
}
