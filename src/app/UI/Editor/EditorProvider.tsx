'use client';

import CodeMirror, { Editor, EditorFromTextArea } from 'codemirror';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import EditorTitle from './EditorTitle';
import EditorTags from './EditorTags';
import Toolbar from './Toolbar';
import styles from './EditorProvider.module.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/display/placeholder';
import AddLink from './AddLink';
import { client } from '@/libs/client';

interface Props {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  body: string;
  onChangeBody: (text: string) => void;
  tags: string[];
  onChangeTags: (nextTages: string[]) => void;
}

type AddLinkType = {
  top: number | null;
  bottom: number | null;
  left: number;
  visible: boolean;
  stickToRight: boolean;
};

export default function CodeMirrorProvider({
  title,
  onChangeTitle,
  placeholder,
  body,
  onChangeBody,
  tags,
  onChangeTags,
}: Props) {
  const blockArea = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const codeMirror = useRef<EditorFromTextArea | null>(null);
  const [addLink, setAddLink] = useState<AddLinkType>({
    top: 0,
    bottom: 0,
    left: 0,
    visible: false,
    stickToRight: false,
  });

  const onChange = useCallback(
    (cm: Editor) => {
      onChangeBody(cm.getValue());
    },
    [onChangeBody],
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

  const onClickToolbar = (mode: string) => {
    if (!textArea.current) return;
    if (!codeMirror.current) return;

    const doc = codeMirror.current.getDoc();
    const cursor = doc.getCursor();
    const selection = {
      start: doc.getCursor('start'),
      end: doc.getCursor('end'),
    };
    const line = doc.getLine(cursor.line);

    const handlers: { [key: string]: Function } = {
      // Toolbar Bold Click
      bold: () => {
        const selected = doc.getSelection();

        if (selected === '텍스트') {
          const isBold = /\*\*(.*)\*\*/.test(
            doc.getRange(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 },
            ),
          );

          if (isBold) {
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 },
            );
            doc.replaceSelection('텍스트');
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch - 2 },
            );
            return;
          }
        }

        if (/\*\*(.*)\*\*/.test(selected)) {
          // matches **string**
          doc.replaceSelection(selected.replace(/\*\*/g, ''));
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`**${selected}**`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }
        doc.replaceSelection('**텍스트**');
        doc.setSelection(
          {
            line: cursor.line,
            ch: cursor.ch + 2,
          },
          {
            line: cursor.line,
            ch: cursor.ch + 5,
          },
        );
      },
      // Toolbar Italic Click
      italic: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`_텍스트_`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 1,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 4,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            },
          );
          if (/_(.*)_/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 1,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 1,
              },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            };
          }
        }

        if (/_(.*)_/.test(selected)) {
          const plain = selected
            .replace(/^_/, '') // remove starting _
            .replace(/_$/, ''); // remove ending _
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`_${selected}_`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 2 },
          );
        }
      },
      strike: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`~~텍스트~~`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 2,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 5,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            },
          );
          if (/~~(.*)~~/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 2,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 2,
              },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            };
          }
        }

        if (/~~(.*)~~/.test(selected)) {
          const plain = selected
            .replace(/^~~/, '') // remove starting ~~
            .replace(/~~$/, ''); // remove ending ~~
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`~~${selected}~~`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
        }
      },
      blockquote: () => {
        const matches = /^> /.test(line);
        doc.setSelection(
          { line: cursor.line, ch: 0 },
          { line: cursor.line, ch: line.length },
        );
        if (matches) {
          doc.replaceSelection(line.replace(/^> /, ''));
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch - 2,
          });
        } else {
          doc.replaceSelection(`> ${line}`);
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch + 2,
          });
        }
      },
      link: () => {
        const cursorPos = codeMirror.current?.cursorCoords(cursor);

        if (!codeMirror.current) return;
        if (!cursorPos) return;
        if (!blockArea.current) return;

        const stickToRight =
          cursorPos.left > blockArea.current.clientWidth - 341;
        const calculatedTop =
          blockArea.current.scrollTop +
          cursorPos.top +
          codeMirror.current?.defaultTextHeight() / 2 +
          1;
        const isAtBottom = calculatedTop + 173 > blockArea.current.clientHeight;
        const pos = isAtBottom
          ? { top: null, bottom: 64 }
          : { top: calculatedTop, bottom: null };

        setAddLink({
          visible: true,
          ...pos,
          left: cursorPos.left,
          stickToRight,
        });
      },
      image: onClickImage,
      codeblock: () => {
        const selected = doc.getSelection();
        if (selected.length === 0) {
          doc.replaceSelection('```\n코드를 입력하세요\n```');
          doc.setSelection(
            {
              line: cursor.line + 1,
              ch: 0,
            },
            {
              line: cursor.line + 1,
              ch: 9,
            },
          );
          return;
        }
        doc.replaceSelection(`\`\`\`${selected}\`\`\``);
      },
    };

    const handler = handlers[mode];

    handler();
    codeMirror.current.focus();
  };

  const onConfirmAddLink = (link: string) => {
    setAddLink({
      ...addLink,
      visible: false,
    });

    if (!codeMirror.current) return;

    const doc = codeMirror.current.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor('end');

    codeMirror.current.focus();

    if (selection.length === 0) {
      doc.replaceSelection(`[링크텍스트](${link})`);
      doc.setSelection(
        {
          line: cursor.line,
          ch: cursor.ch + 1,
        },
        {
          line: cursor.line,
          ch: cursor.ch + 6,
        },
      );
      return;
    }

    doc.replaceSelection(`[${selection}](${link})`);
    doc.setCursor({
      line: cursor.line,
      ch: cursor.ch + link.length + 4,
    });
  };

  const onCancelAddLink = () => {
    setAddLink({
      ...addLink,
      visible: false,
    });
  };

  const onClickImage = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0] ?? null;

      if (!file) return;

      const formData = new FormData();

      formData.append('file', file);

      try {
        await onImageUpload(formData);
      } catch (err: any) {
        alert(err);
      }
    });
  };

  const onImageUpload = async (formData: FormData) => {
    if (!textArea.current) return;
    if (!codeMirror.current) return;

    const response = await client.post<{ url: string }>('/image', formData);

    if (!response.data) {
      alert('upload failed!');
      return;
    }

    const { url } = response.data;
    const cm = codeMirror.current;

    const lastLine = cm.lastLine();
    const lastLineLength = cm.getLine(lastLine).length || 0;
    const lastLineEnd = {
      line: lastLine,
      ch: lastLineLength,
    };

    cm.replaceRange('\n', lastLineEnd);

    const newCursor = {
      line: lastLine + 1,
      ch: 0,
    };

    cm.setCursor(newCursor);

    const newUrl =
      process.env.NODE_ENV === 'production'
        ? `https://dnkdream.com/${url}`
        : `http://localhost:3000/${url}`;

    cm.replaceSelection(`![](${newUrl})`);
    cm.focus();
  };

  return (
    <div className={styles.provider} ref={blockArea}>
      <div className={styles.editor_head}>
        <EditorTitle
          title={title}
          onChange={onChangeTitle}
          placeholder={placeholder}
        />
        <hr className={styles.under} />
        <EditorTags tags={tags} onChangeTags={onChangeTags} />
        <Toolbar onClick={onClickToolbar} />
        {addLink.visible && (
          <AddLink
            top={addLink.top}
            bottom={addLink.bottom}
            left={addLink.left}
            stickToRight={addLink.stickToRight}
            onConfirm={onConfirmAddLink}
            onClose={onCancelAddLink}
            defaultValue=""
          />
        )}
      </div>
      <div className={styles.editor_body}>
        <div className={styles.markdown} style={{ caretColor: 'red' }}>
          <textarea ref={textArea} />
        </div>
      </div>
    </div>
  );
}
