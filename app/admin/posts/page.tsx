
import PostTable from '@/app/admin/components/PostTable';

export default function BaiVietPage() {
 return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý bài viết</h1>
      <PostTable />
    </main>
  );
}