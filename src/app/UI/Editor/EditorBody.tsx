import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from './EditorBody.module.scss';

function EditorBody() {
  const [body, setBody] = useState('');

  const modules = {
    toolbar: {
      container: [[{ header: 1 }, { header: 2 }]],
    },
  };

  return (
    <ReactQuill
      className={styles.editor}
      theme="snow"
      value={body}
      onChange={setBody}
      modules={modules}
    />
  );
}

export default EditorBody;
