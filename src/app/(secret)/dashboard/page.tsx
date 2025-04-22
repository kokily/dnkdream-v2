'use client';

import type { Post } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';
import { dashBoardAPI } from '@/libs/client';
import { useObserver } from '@/libs/hooks';
import Dashboard from '@/app/UI/Dash/Dashboard';

export default function DashBoardPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listDashboardScroll', 0);

  const [search, setSearch] = useState('');

  const { data, fetchNextPage, refetch, isLoading } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['dashboards'],
    queryFn: ({ pageParam }) =>
      dashBoardAPI({ cursor: pageParam, title: search }),
    getNextPageParam: (data) =>
      data && data.length === 10 ? data[data.length - 1].id : undefined,
  });

  const posts = useMemo(() => {
    if (!data) return;

    return ([] as Array<Post>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onUpdatePost = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/update/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <>
      <Dashboard
        posts={posts}
        search={search}
        onChange={onChange}
        onSearch={onSearch}
        onUpdatePost={onUpdatePost}
        loading={isLoading}
      />
      <div ref={setTarget} />
    </>
  );
}
