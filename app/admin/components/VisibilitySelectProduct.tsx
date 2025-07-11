'use client';

import { useState } from 'react';

export default function VisibilitySelectProduct({ initialValue = 'active', id }) {
  const [visibility, setVisibility] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setVisibility(newValue);
    setLoading(true);

    try {
      const res = await fetch('/api/products/update-visible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: newValue,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert('Cập nhật thất bại!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ!');
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = () => {
    if (visibility === 'active') return 'bg-green-100 text-green-800 border-green-400';
    return 'bg-red-100 text-red-800 border-red-400';
  };

  return (
    <div className="mb-4">
      <select
        value={visibility}
        onChange={handleChange}
        className={`border rounded px-3 py-2 transition-colors duration-200 ${getColorClass()}`}
        disabled={loading}
      >
        <option value={'hidden'}>Ẩn</option>
        <option value={'active'}>Hiện</option>
      </select>
      {loading && <p className="text-sm text-gray-500 mt-1">Đang cập nhật...</p>}
    </div>
  );
}