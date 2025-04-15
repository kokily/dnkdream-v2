import React from 'react';
import Script from 'next/script';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import rehypeHightlight from 'rehype-highlight';
import styles from './PreviewBody.module.scss';
import 'highlight.js/styles/a11y-dark.css';

interface Props {
  title: string;
  body: string;
}

export default function PreviewBody({ title, body }: Props) {
  return (
    <div className={styles.preview_body}>
      <h1>{title}</h1>
      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeHightlight]}
        components={{
          img: ({ node, ...props }) => (
            <img
              style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
              {...props}
              alt=""
            />
          ),
        }}
      >
        {body}
      </Markdown>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />
    </div>
  );
}
