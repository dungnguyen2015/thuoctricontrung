'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Người dùng' },
  { href: '/admin/posts', label: 'Bài viết' },
  { href: '/admin/images', label: 'Ảnh (Images)' },
  { href: '/admin/products', label: 'Sản phẩm' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-1/6 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              pathname.startsWith(link.href) ? 'bg-gray-700' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}