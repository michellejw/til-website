"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ChevronRight, FolderOpen, Search, ChevronLeft } from "lucide-react";
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
  const [isTagsVisible, setIsTagsVisible] = useState(false);

  const categories = useMemo(
    () => ["all", ...new Set(posts.map((post) => post.category))],
    [posts]
  );

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expandedId) return;

      const currentIndex = filteredPosts.findIndex(
        (post) => post.slug === expandedId
      );
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        const nextIndex =
          currentIndex === filteredPosts.length - 1 ? 0 : currentIndex + 1;
        setExpandedId(filteredPosts[nextIndex].slug);
      } else if (e.key === "ArrowLeft") {
        const prevIndex =
          currentIndex === 0 ? filteredPosts.length - 1 : currentIndex - 1;
        setExpandedId(filteredPosts[prevIndex].slug);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedId, filteredPosts]);

  if (!mounted) return null;

  const navigatePost = (direction: "next" | "prev") => {
    const currentIndex = filteredPosts.findIndex(
      (post) => post.slug === expandedId
    );
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next") {
      newIndex =
        currentIndex === filteredPosts.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredPosts.length - 1 : currentIndex - 1;
    }
    setExpandedId(filteredPosts[newIndex].slug);
  };

  const TagButton: React.FC<{
    tag: string;
    onClick: (e: React.MouseEvent) => void;
  }> = ({ tag, onClick }) => (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-full text-sm transition-colors focus:outline-none
        ${
          selectedTag === tag
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      #{tag}
    </button>
  );

  const PostContent: React.FC<{ post: TilPost }> = ({ post }) => (
    <div className="prose max-w-none dark:prose-invert overflow-hidden">
      <div className="mb-4 flex gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTag(selectedTag === tag ? null : tag);
            }}
          />
        ))}
      </div>
      <div className="mt-4">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;
              return isInline ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                    customStyle={{
                      margin: 0,
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            },
            img: ({ src, alt }) => {
              if (!src) return null;
              const [altText, width] = (alt || "").split("|");
              const imageWidth = width ? parseInt(width) : 400;
              const imageHeight = Math.round(imageWidth * (2 / 3));

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
  );

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

          <div className="mb-6">
            <button
              onClick={() => setIsTagsVisible(!isTagsVisible)}
              className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm transition-colors hover:bg-gray-300"
            >
              {isTagsVisible ? "Hide Tags" : "Show Tags"}
            </button>
            {isTagsVisible && (
              <div className="flex gap-2 flex-wrap mb-6">
                {allTags.map((tag) => (
                  <TagButton
                    key={tag}
                    tag={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <React.Fragment key={post.slug}>
              <Card
                className="cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => setExpandedId(post.slug)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{post.title}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {format(new Date(post.date + "T12:00:00"), "MMM d, yyyy")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <TagButton
                          key={tag}
                          tag={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(selectedTag === tag ? null : tag);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Dialog
                open={expandedId === post.slug}
                onOpenChange={(open) => {
                  if (!open) setExpandedId(null);
                }}
              >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ChevronLeft
                        className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => navigatePost("prev")}
                      />
                      <div>
                        <DialogTitle className="text-xl font-bold">
                          {post.title}
                        </DialogTitle>
                        <div className="text-sm text-gray-500">
                          {format(
                            new Date(post.date + "T12:00:00"),
                            "MMM d, yyyy"
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => navigatePost("next")}
                      />
                    </div>
                  </DialogHeader>
                  <PostContent post={post} />
                </DialogContent>
              </Dialog>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TIL;
