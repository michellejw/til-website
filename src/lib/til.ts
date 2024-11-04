import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TilPost {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  content: string;
}

const TIL_PATH = path.join(process.cwd(), 'src/content/til');

// Get all category folders
export function getTilCategories() {
  return fs.readdirSync(TIL_PATH).filter(item => 
    fs.statSync(path.join(TIL_PATH, item)).isDirectory()
  );
}

// Get all markdown files in a category
export function getTilFiles(category: string) {
  const categoryPath = path.join(TIL_PATH, category);
  return fs.readdirSync(categoryPath).filter((path) => /\.md$/.test(path));
}

// Get a single TIL post by its slug and category
export function getTilBySlug(category: string, slug: string): TilPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(TIL_PATH, category, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    category,
    title: data.title,
    summary: data.summary,
    tags: data.tags,
    date: data.date,
    content: content
  };
}

// Get all TIL posts
export function getAllTils(): TilPost[] {
  const categories = getTilCategories();
  const posts = categories.flatMap(category => {
    const slugs = getTilFiles(category);
    return slugs.map(slug => getTilBySlug(category, slug));
  });
  
  return posts.sort((a, b) => 
    (new Date(b.date)).getTime() - (new Date(a.date)).getTime()
  );
}