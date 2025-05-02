import PostList from './PostList';
import Pagination from './Pagination';
import { Post } from "@/types";

interface Props {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function BaiVietPage({ posts, currentPage, totalPages }: Props) {
  return (
    <div>
      <PostList posts={posts} currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}