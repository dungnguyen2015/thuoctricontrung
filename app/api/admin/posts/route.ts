import { NextResponse } from 'next/server';
import { getAllPosts} from '@/lib/posts';

export async function GET() {

  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
  
}