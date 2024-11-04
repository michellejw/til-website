import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const TIL_PATH = path.join(process.cwd(), 'src/content/til');

export async function GET() {
  try {
    const categories = fs.readdirSync(TIL_PATH).filter(item => 
      fs.statSync(path.join(TIL_PATH, item)).isDirectory()
    );

    const posts = categories.flatMap(category => {
      const categoryPath = path.join(TIL_PATH, category);
      const files = fs.readdirSync(categoryPath).filter((path) => /\.md$/.test(path));
      
      return files.map(filename => {
        const filePath = path.join(categoryPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug: filename.replace(/\.md$/, ''),
          category,
          title: data.title,
          summary: data.summary,
          tags: data.tags,
          date: data.date,
          content: content
        };
      });
    });

    // Sort posts by date
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}