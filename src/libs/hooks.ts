import { useEffect } from 'react';

export default function useHotKey<T extends Function>(callback: T) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [callback]);
}
