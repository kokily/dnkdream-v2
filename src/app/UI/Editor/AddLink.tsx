import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './AddLink.module.scss';

interface Props {
  top: number | null;
  bottom: number | null;
  left: number;
  stickToRight?: boolean;
  onConfirm: (link: string) => void;
  onClose: () => void;
  defaultValue: string;
}

export default function AddLink({
  top,
  bottom,
  left,
  stickToRight,
  onConfirm,
  onClose,
  defaultValue,
}: Props) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(value);
    },
    [onConfirm, value],
  );

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className={styles.addlink}
        style={{
          top: top || 'initial',
          bottom: bottom || 'initial',
          left: stickToRight ? 'initial' : left,
          right: stickToRight ? '3rem' : 'initial',
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.top_wrapper}>
            <div className={styles.title}>
              링크 {defaultValue ? '수정' : '등록'}
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <input
              value={value}
              onChange={onChange}
              placeholder="URL을 입력하세요."
              autoFocus
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </div>
    </OutsideClickHandler>
  );
}
