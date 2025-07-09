'use client';

import { useState, useEffect } from 'react';

export default function ImageManagerPage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alt, setAlt] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    totalPages: 1,
  });

  const fetchImages = async () => {
    const res = await fetch(`/api/images/list?page=${page}&limit=${pagination.limit}`);
    const data = await res.json();
    setImages(data.images);
    setPagination(data.pagination);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    form.append('alt', alt);
    setLoading(true);
    const res = await fetch('/api/images/upload', { method: 'POST', body: form });
    await res.json();
    setLoading(false);
    setFile(null);
    setAlt('');
    fetchImages();
  };

  const handleDelete = async (slug: string) => {
    await fetch('/api/images/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    fetchImages();
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Quản lý hình ảnh</h1>

        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
         <input
        type="text"
        placeholder="Alt"
        value={alt}
        onChange={e => setAlt(e.target.value)}
        className="w-full mt-4 border p-2 rounded"
        required
      />
        <button onClick={handleUpload} disabled={loading || !file} className="mt-4 ml-2 bg-blue-600 text-white px-4 py-1 rounded">
          {loading ? 'Đang tải...' : 'Tải lên'}
        </button>
      </div>  

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Alt</th>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {images && images.map((img: any, index) => (
              <tr key={img.id} className="border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{img.alt}</td>
                <td className="p-2 border">
                  {img.slug && <img src={`${img.slug}`} width="100px" className="h-16 object-cover" />}
                </td>
                <td className="p-2 border">{`${img.slug}`}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(img.slug)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Xóa
                  </button>
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