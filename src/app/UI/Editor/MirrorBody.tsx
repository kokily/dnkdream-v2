import { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror, { EditorFromTextArea, Editor } from 'codemirror';
import Markdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import styles from './MirrorBody.module.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

/*
    에디터에 기능 구현할 것    
*/

export default function MirrorBody() {
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const codeMirror = useRef<EditorFromTextArea | null>(null);
  const [body, setBody] = useState('');

  const onChangeMarkdown = (markdown: string) => {
    setBody(markdown);
  };

  const onChange = useCallback(
    (cm: Editor) => {
      onChangeMarkdown(cm.getValue());
    },
    [onChangeMarkdown],
  );

  useEffect(() => {
    if (!textArea.current) return;

    const cm = CodeMirror.fromTextArea(textArea.current, {
      mode: 'markdown',
      placeholder: '오늘의 포스트를 작성해보세요',
      lineWrapping: true,
    });

    codeMirror.current = cm;

    cm.focus();
    cm.on('change', onChange);

    return () => {
      cm.toTextArea();
    };
  }, []);

  return (
    <div>
      <h1>Markdown Header</h1>
      <div className={styles.markdown}>
        <textarea ref={textArea} />
      </div>
      <hr />
      <Markdown
        components={{
          h1: (props: any) => (
            <h1
              style={{
                color: 'blue',
              }}
            >
              {props.children}
            </h1>
          ),
          code: (props: any) => (
            <code
              style={{
                padding: '3px 6px',
                border: 'none',
                borderRadius: '3px',
                backgroundColor: '#e9ecef',
                fontSize: '1.6rem',
                fontFamily: '"Pretendard", "Malgun Gothic", sans-serif',
              }}
            >
              {props.children}
            </code>
          ),
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}
