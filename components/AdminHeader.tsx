'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout');
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Quản trị viên</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Đăng xuất
      </button>
    </header>
  );
}