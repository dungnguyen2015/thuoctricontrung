import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: Props) => {
  return (
    <div className="mb-6 flex justify-center space-x-4">
      {currentPage > 1 && (
        <Link href={`/bai-viet?page=${currentPage - 1}`} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Trước
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={`/bai-viet?page=${currentPage + 1}`} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Sau
        </Link>
      )}
    </div>
  );
};

export default Pagination;