import BaiVietPage from './BaiVietPage';
import { Metadata } from 'next';

const PAGE_SIZE = 6;

async function getPosts(page: number) {

  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, { cache: 'no-store' });
   
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  
  return data;
}

export const metadata: Metadata = {
  title: 'Bài viết',
  description: 'Dịch vụ điện lạnh uy tín tại TPHCM',
};

type Props = {
  searchParams: Promise<{ page: string }>
}

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = parseInt(page || '1');
  const { posts, total } = await getPosts(currentPage);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <BaiVietPage posts={posts} currentPage={currentPage} totalPages={totalPages} />
  );
}