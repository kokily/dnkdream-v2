import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Prism } from 'react-syntax-highlighter';
import styles from './PreviewBody.module.scss';

interface Props {
  title: string;
  body: string;
}

export default function PreviewBody({ title, body }: Props) {
  return (
    <div className={styles.preview_body}>
      <h1>{title}</h1>
      <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>{body}</Markdown>
    </div>
  );
}
