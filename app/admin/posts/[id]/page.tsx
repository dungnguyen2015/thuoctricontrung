import PostForm from '@/app/admin/components/PostForm';

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EditPostPage({ params }: Props) {

  const { id } = await params;
  const post = await getPost(id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài viết</h1>
      <PostForm post={post} />
    </main>
  );
}