'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';

const TinyEditor = dynamic(() => import('@/app/admin/components/TinyEditor'), {
  ssr: false,
});


export default function PostForm({ post }: { post?: any }) {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let imageUrl = post?.image_url || '';

  const payload = { title, slug, content};
 
  if (image) {

    const formData = new FormData();
    formData.append('file', image);
    const res = await fetch('/api/posts/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    imageUrl = data.url;
    payload.image_url = imageUrl;
  }

  
  const method = post ? 'PUT' : 'POST';
  const endpoint = post ? `/api/posts/${post.id}` : '/api/posts';

  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
        const errorText = await res.text();
        alert(errorText || 'Thêm bài viết lỗi!');
        return;
      }

    const data = await res.json();

    if (data.success) {    
      router.push('/admin/posts');
    } else {
      alert('Thêm bài viết lỗi!');
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Slug (không dấu, không khoảng trắng)"
        value={slug}
        onChange={e => setSlug(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
        <TinyEditor
          value={content} onChange={(val) => setContent(val)} 
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {post ? 'Cập nhật' : 'Tạo mới'}
      </button>
    </form>
  );
}