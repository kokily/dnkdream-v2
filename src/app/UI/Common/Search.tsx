import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import styles from './Search.module.scss';

interface Props {
  mode: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export default function Search({ mode, search, onChange, onSearch }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };

  return (
    <div className={styles.search_container}>
      <input
        type="text"
        name="search"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={`${mode} 검색`}
        className={styles.search_input}
      />

      <a onClick={onSearch}>
        <BiSearchAlt />
      </a>
    </div>
  );
}
