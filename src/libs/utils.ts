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
