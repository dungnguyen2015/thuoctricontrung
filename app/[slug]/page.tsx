import { getPostBySlug } from "@/lib/posts";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import PostSchema from '@/components/PostSchema';
import FAQSchema from '@/components/FAQSchema';
import { decode } from 'he';
import ArticleContent from '@/components/ArticleContent';

export const revalidate = 7200; // 2 hours

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết',
      description: 'Bài viết không tồn tại',
    };
  }

  return {
    title: post.title,
    description: post.description || post.title,
  };
}  

export default async function BaiViet({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) return <div className="p-10 py-10 h1 text-center">Bài viết không tồn tại.</div>;

  return (   
      <main className="max-w-4xl mx-auto px-4 py-10 main-article">
        <article id={`post-${post.id}`} className="prose">
          <header>
            <h1 className="font-bold mb-6 text-center text-red-700">{post.title}</h1>
          </header>
          <ArticleContent htmlContent={post.content} />
        </article>
        {/* Schema cho SEO */}
      <PostSchema
        title={post.title}
        description={post.description}
        author={post.author}
        publishedAt={post.created_at}
        updatedAt={post.updated_at}
        image={post.thumbnail}
      />
      <FAQSchema
        question={post.title}
      />
      </main>    
  );
}
