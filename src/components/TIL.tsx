"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';
import type { TilPost } from '@/lib/til';

interface TILProps {
  posts: TilPost[];
}

const TIL: React.FC<TILProps> = ({ posts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from posts
  const categories = ['all', ...new Set(posts.map(post => post.category))];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const toggleCard = (slug: string) => {
    setExpandedId(expandedId === slug ? null : slug);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Today I Learned</h1>
          <p className="text-gray-600 mb-6">A collection of quick coding lessons and tips</p>
          
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <div className="flex items-center gap-2">
                  {category !== 'all' && <FolderOpen className="w-4 h-4" />}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card 
              key={post.slug}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg
                ${expandedId === post.slug ? 'md:col-span-2 lg:col-span-3' : ''}`}
              onClick={() => toggleCard(post.slug)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{post.title}</span>
                    {expandedId === post.slug 
                      ? <ChevronDown className="w-4 h-4 text-gray-400" />
                      : <ChevronRight className="w-4 h-4 text-gray-400" />
                    }
                  </div>
                  <span className="text-sm text-gray-400">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expandedId === post.slug ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 whitespace-pre-wrap">
                      {post.content}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
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