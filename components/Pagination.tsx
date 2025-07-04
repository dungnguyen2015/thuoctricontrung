'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const params = useSearchParams();

  return (
    <div className="flex justify-center mt-10 gap-2 flex-wrap">
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          scroll={false}
          className={`px-4 py-2 rounded border ${
            page === currentPage ? 'bg-green-700 text-white' : 'bg-green-600 text-red-700'
          } hover:text-red-800 hover:text-white transition`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}