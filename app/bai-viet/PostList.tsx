'use client';

import Link from 'next/link';
import Image from 'next/image';
import OptimizedImage from '../../components/OptimizedImage';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
  image_url: string;
}

interface Props {
  posts: Post[];
  currentPage: number;
}

const PostList = ({ posts, currentPage }: Props) => {

  if (!posts.length) return <p className="text-center text-gray-500 py-10">Không có bài viết nào.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Danh Sách Bài Viết</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (<div
          key={post.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
        <OptimizedImage
              src={post.image_url ?? null}
              alt={`Hình ảnh bài viết: ${post.title}`}
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto', objectFit: "cover" }} // responsive
              className={"rounded-xl shadow-lg"}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-700">
                <Link href={`/${post.slug}/`} title={post.title}>
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 text-gray-600">{post.excerpt}</p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Ngày đăng: {new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;