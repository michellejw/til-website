"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ChevronDown, ChevronRight, FolderOpen, Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

interface TilPost {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  content: string;
}

interface TILProps {
  initialPosts: TilPost[];
}

const TIL: React.FC<TILProps> = ({ initialPosts }) => {
  const [mounted, setMounted] = useState(false);
  const [posts] = useState(initialPosts);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const categories = ["all", ...new Set(posts.map((post) => post.category))];
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTag && matchesSearch;
  });

  const toggleCard = (slug: string) => {
    setExpandedId(expandedId === slug ? null : slug);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Today I Learned
          </h1>
          <p className="text-gray-600 mb-6">
            A collection of mini coding snippets, tips, things I thought were
            neat, etc.
          </p>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search TILs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning
            />
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {category !== "all" && <FolderOpen className="w-4 h-4" />}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${
                    selectedTag === tag
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg
                ${expandedId === post.slug ? "md:col-span-2 lg:col-span-3" : ""}`}
              onClick={() => toggleCard(post.slug)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{post.title}</span>
                    {expandedId === post.slug ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span
                    className="text-sm text-gray-400"
                    suppressHydrationWarning
                  >
                    {format(new Date(post.date + "T12:00:00"), "MMM d, yyyy")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expandedId === post.slug ? (
                  <div className="prose max-w-none">
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(selectedTag === tag ? null : tag);
                          }}
                          className={`px-2 py-1 rounded-full text-sm transition-colors
                            ${
                              selectedTag === tag
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]} // Add this line
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            const isInline = !match;
                            return isInline ? (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            ) : (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-md"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            );
                          },
                          // img handler
                          img: ({ src, alt, ...props }) => {
                            if (!src) return null;

                            // Parse size from alt text if it includes a size marker
                            const [altText, width] = (alt || "").split("|");

                            // Convert width to number if it exists, or use default
                            const imageWidth = width ? parseInt(width) : 400;
                            // Calculate height proportionally (using 3:2 aspect ratio as example)
                            const imageHeight = Math.round(
                              imageWidth * (2 / 3)
                            );

                            return (
                              <Image
                                src={src.startsWith("/") ? src : `/${src}`}
                                alt={altText || "Article image"}
                                width={imageWidth}
                                height={imageHeight}
                                className="mx-auto rounded-lg"
                              />
                            );
                          },
                        }}
                      >
                        {post.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(selectedTag === tag ? null : tag);
                          }}
                          className={`px-2 py-1 rounded-full text-sm transition-colors
                            ${
                              selectedTag === tag
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TIL;
