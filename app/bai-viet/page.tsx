import BaiVietPage from './BaiVietPage';
import { Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { getTotalPostCount, getCachedPosts } from "@lib/posts";
import PostListingPage from '@/components/PostListingPage';

export const revalidate = 3600;
export const dynamicParams = false;

const PAGE_SIZE = 9;

export async function generateStaticParams() {
  const totalPosts = await getTotalPostCount();
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString()
  }));
}

export const metadata: Metadata = {
  title: 'Bài viết',
  description: 'Dịch vụ điện lạnh uy tín tại TPHCM',
};

type SearchParamsType = {
  page?: string | string[];
};

export default async function Page({
  searchParams
}: {
  searchParams?: SearchParamsType;
}) {
  // Xử lý page param với kiểm tra nghiêm ngặt
  const pageParam = searchParams?.page;
  const pageNumber = Array.isArray(pageParam) 
    ? pageParam[0] 
    : pageParam || '1';
  
  // Xử lý trường hợp NaN
  const currentPage = Math.max(1, parseInt(pageNumber, 10)) || 1;
  if (isNaN(currentPage)) {
    throw new Error('Số trang không hợp lệ');
  }

  // Thêm validate cho PAGE_SIZE
  const validatedPageSize = PAGE_SIZE > 0 ? PAGE_SIZE : 9;

  const [posts, total] = await Promise.all([
    getCachedPosts(currentPage, validatedPageSize),
    getTotalPostCount()
  ]);
  
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <BaiVietPage 
        posts={posts ?? []} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
      <PostListingPage posts={posts ?? []} />
    </>
  );
}