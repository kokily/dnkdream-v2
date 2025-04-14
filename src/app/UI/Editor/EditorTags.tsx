'use cilent';

import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import styles from './EditorTags.module.scss';
import { isEmptyOrSpace } from '@/libs/utils';

interface Props {
  tags: string[];
  onChangeTags: (nextTags: string[]) => void;
}

const TagItem: React.FC<{
  onClick: (e: MouseEvent) => void;
  children: string;
}> = ({ onClick, children }) => {
  return (
    <div className={styles.tag} onClick={onClick}>
      {children}
    </div>
  );
};

export default function EditorTags({ tags: initialTags, onChangeTags }: Props) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onAddTag = useCallback(
    (tag: string) => {
      setInput('');

      if (isEmptyOrSpace(tag) || tags.includes(tag)) return;

      let valid = tag.trim().slice(0, 255);

      if (valid.indexOf(' #') > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;

        while ((execArray = regex.exec(valid))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }

        setTags([...tags, ...tempTags]);
        onChangeTags(tags);
        return;
      }

      if (valid.charAt(0) === '#') {
        valid = valid.slice(1, valid.length);
      }

      setTags([...tags, valid]);
      onChangeTags(tags);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && input === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        onAddTag(input);
      }
    },
    [onAddTag, tags, input],
  );

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((text) => text !== tag);
    setTags(nextTags);
    onChangeTags(nextTags);
  };

  return (
    <div className={styles.editor_tags}>
      {tags.map((tag) => (
        <TagItem key={tag} onClick={() => onRemove(tag)}>
          {tag}
        </TagItem>
      ))}
      <input
        className={styles.tag_input}
        type="text"
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="태그를 엔터로 추가, 백스페이스로 삭제하세요."
      />
    </div>
  );
}
