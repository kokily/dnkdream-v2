import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import clsx from 'clsx';
import styles from './EditorFooter.module.scss';

interface Props {
  onExit: () => void;
  onTempSave: () => void;
}

export default function EditorFooter({ onExit, onTempSave }: Props) {
  return (
    <div className={styles.editor_footer}>
      <div className={styles.footer_left} onClick={onExit}>
        <MdOutlineKeyboardBackspace />
        <span>나가기</span>
      </div>
      <div className={styles.footer_right}>
        <button className={styles.footer_button} onClick={onTempSave}>
          임시저장
        </button>
        <button
          className={clsx(styles.footer_button, {
            [styles.cyan]: true,
          })}
          type="submit"
        >
          퍼블리싱
        </button>
      </div>
    </div>
  );
}
