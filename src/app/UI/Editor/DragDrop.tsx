import { useEffect, useRef, useState } from 'react';
import styles from './DragDrop.module.scss';

interface Props {
  onImageUpload: (formData: FormData) => void;
}

export default function DragDrop({ onImageUpload }: Props) {
  const dragIndex = useRef(0);
  const down = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.preventDefault();

      const { files } = e.dataTransfer || { file: null };

      if (!files) return;
      if (!files[0]) return;

      const formData = new FormData();
      formData.append('file', files[0]);

      onImageUpload(formData);
      dragIndex.current = 0;
      setDragging(false);
      e.stopPropagation();
    };

    const onMouseDown = () => {
      down.current = true;
    };

    const onMouseUp = () => {
      down.current = false;
    };

    const onDragEnter = () => {
      if (down.current) return;

      dragIndex.current += 1;

      if (dragIndex.current === 1) {
        setDragging(true);
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }

      if (!dragging) {
        setDragging(true);
      }
    };

    const onDragLeave = () => {
      if (down.current) return;

      dragIndex.current -= 1;

      if (dragIndex.current === 0) {
        setDragging(false);
      }
    };

    const onMouseLeave = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [dragging, onImageUpload]);

  return dragging ? (
    <div className={styles.drag_wrapper}>
      <input type="file" className={styles.shadow_input} />
    </div>
  ) : null;
}
