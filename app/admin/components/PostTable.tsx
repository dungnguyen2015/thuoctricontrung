'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from "@/types";


export default function PostTable() {

  const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

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
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, index) => (
            <tr key={post.id} className="border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">
                {post.image_url && <img src={post.image_url} width="100px" className="h-16 object-cover" />}
              </td>
              <td className="p-2 border">
                <Link href={`/admin/posts/${post.id}`} className="text-blue-600 mr-2">Sửa</Link>
                <button onClick={() => deletePost(post.id)} className="text-red-600">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}