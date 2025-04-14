import TextareaAutosize from 'react-textarea-autosize';
import styles from './EditorTitle.module.scss';
import { ChangeEvent } from 'react';

interface Props {
  title: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

function TitleTextarea({ title, onChange, placeholder }: Props) {
  return (
    <TextareaAutosize
      value={title}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.editor_title}
    />
  );
}

export default TitleTextarea;
