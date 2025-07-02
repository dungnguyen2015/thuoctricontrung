'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';
import { toSlug } from '@/utils/slug';

const TinyEditor = dynamic(() => import('@/app/admin/components/TinyEditor'), {
  ssr: false,
});


export default function PostForm({ post }: { post?: any }) {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [visible, setVisible] = useState(post?.visible || 2);
  const [image_url, setImageUrl] = useState(post?.image_url || '');
  const [description, setDescription] = useState(post?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const method = post ? 'PUT' : 'POST';

  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();
  let payload: any = { title, slug, content, visible, description };
 
  if (image_url != "") {
    payload.image_url = image_url;
  }
  
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

  const getColorClass = () => {
    if (visible === 1) return 'bg-green-100 text-green-800 border-green-400';
    return 'bg-red-100 text-red-800 border-red-400';
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    setVisible(newValue);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTitle(newValue);
    setSlug(toSlug(newValue));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={changeTitle}
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
      <div className="py-2">
        <label className="block text-sm font-medium text-gray-700">Phần mô tả</label>
        <input
          type="text"
          placeholder="Phần mô tả"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="py-2">
        <label className="block text-sm font-medium text-gray-700">Ẩn / Hiện</label>
        <select
        value={visible}
        onChange={handleChange}
        className={`border rounded px-3 py-2 transition-colors duration-200 ${getColorClass()}`}
      >
        <option value={0}>Ẩn</option>
        <option value={1}>Hiện</option>
        <option value={2}>Đang chờ</option>
      </select>
      </div>
      {image_url != '' && <div className="my-2"><img src={image_url} width="100px" className="h-16 object-cover" /></div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <input
            type="text"
            placeholder="Tiêu đề"
            value={image_url}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
        <TinyEditor
          value={content} onChange={(val) => setContent(val)} 
        />
      </div>
      <div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {post ? 'Cập nhật' : 'Tạo mới'}
      </button>
      </div>
    </form>
  );
}