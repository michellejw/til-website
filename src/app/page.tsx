import { getAllTils } from '@/lib/til';
import TIL from '@/components/TIL';

export default function Home() {
  const posts = getAllTils();
  
  return <TIL posts={posts} />;
}