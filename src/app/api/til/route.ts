import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface TilPost {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  content: string;
}

export async function GET() {
  try {
    const TIL_PATH = path.join(process.cwd(), "src/content/til");

    if (!fs.existsSync(TIL_PATH)) {
      console.error(`Directory not found: ${TIL_PATH}`);
      return NextResponse.json(
        { error: "Content directory not found" },
        { status: 404 }
      );
    }

    const categories = fs.readdirSync(TIL_PATH).filter((item) => {
      const itemPath = path.join(TIL_PATH, item);
      try {
        return fs.statSync(itemPath).isDirectory();
      } catch (error) {
        console.error(`Error accessing directory ${item}:`, error);
        return false;
      }
    });

    const posts = categories.flatMap((category) => {
      const categoryPath = path.join(TIL_PATH, category);
      try {
        const files = fs
          .readdirSync(categoryPath)
          .filter((path) => /\.md$/.test(path));

        return files
          .map((filename) => {
            const filePath = path.join(categoryPath, filename);
            try {
              const fileContents = fs.readFileSync(filePath, "utf8");
              const { data, content } = matter(fileContents);

              const post: TilPost = {
                slug: filename.replace(/\.md$/, ""),
                category,
                title: data.title || "Untitled",
                summary: data.summary || "",
                tags: data.tags || [],
                date: data.date || new Date().toISOString().split("T")[0],
                content: content,
              };
              return post;
            } catch (error) {
              console.error(`Error reading file ${filename}:`, error);
              return null;
            }
          })
          .filter((post): post is TilPost => post !== null); // Type predicate to ensure non-null
      } catch (error) {
        console.error(`Error reading category ${category}:`, error);
        return [];
      }
    });

    // Sort posts by date with type safety
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
