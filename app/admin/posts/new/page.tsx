import PostForm from '@/app/admin/components/PostForm';

export default function CreatePostPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tạo bài viết mới</h1>
      <PostForm />
    </main>
  );
}