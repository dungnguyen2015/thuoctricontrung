'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from "@/types";
import VisibilitySelect from './VisibilitySelect';


export default function ProductTable() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    totalPages: 0,
  });

 useEffect(() => {
  fetch(`/api/admin/posts?page=${page}&limit=${pagination.limit}`)
    .then(res => res.json())
    .then(data => {
      setPosts(data.data);
      setPagination(data.pagination);
    });
}, [page]);

  const deletePost = async (id: number) => {
      if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (data.success) {
          alert('Xóa thành công!');
          setPosts(posts.filter(p => p.id !== id));
        } else {
          alert(`Lỗi khi xóa: ${data.message || 'Không rõ lỗi'}`);
        }
      } catch (error) {
      
        alert('Xảy ra lỗi khi kết nối đến server.');
      }
    };

  return (
    <div className="overflow-x-auto">
      <Link href="/admin/posts/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        + Tạo bài viết
      </Link>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Ảnh</th>
            <th className="p-2 border">Ẩn/Hiện</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, index) => (
            <tr key={post.id} className="border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">
                <Link href={`/admin/posts/${post.id}`} className="text-blue-600">{post.title}</Link>
              </td>
              <td className="p-2 border">
                {post.image_url && <img src={post.image_url} width="100px" className="h-16 object-cover" />}
              </td>
              <td className="p-2 border"><VisibilitySelect initialValue={post.visible} postId={post.id} />
              </td>
              <td className="p-2 border">
                <Link href={`/admin/posts/${post.id}`} className="text-blue-600 mr-2">Sửa</Link>
                <button onClick={() => deletePost(post.id)} className="text-red-600">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-4 text-right">
        <button className="text-blue-600"
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page <= 1}
        >
          Trang trước
        </button>
        <span>Trang {page} / {pagination.totalPages}</span>
        <button className="text-blue-600"
          onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
          disabled={page >= pagination.totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}