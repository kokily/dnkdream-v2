import { NextRequest } from 'next/server';
import { isEmpty, trim } from 'ramda';

interface QueryType {
  req: NextRequest;
  queryName: string;
}

export function getQuery({ req, queryName }: QueryType) {
  const url = new URL(req.nextUrl);
  return url.searchParams.get(queryName) ?? '';
}

export function isEmptyOrSpace(text: string) {
  if (typeof text !== 'string') {
    return isEmpty(text);
  }

  return isEmpty(trim(text.replace(/\s/g, '')));
}

export function findImgInMarkdown(markdown: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export function sliceText(text: string, maxLength: number = 15): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
}
