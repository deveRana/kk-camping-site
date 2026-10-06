'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Badge } from '@/components/ui/Badge';

export interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-mist overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden bg-mist">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="forest" size="sm">
              {post.category}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-forest-deep/60">
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h3 className="font-display text-xl font-semibold text-forest-deep group-hover:text-forest transition line-clamp-2 leading-snug">
              {post.title}
            </h3>

            <p className="text-xs text-forest-deep/70 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-mist flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover border border-mist"
            />
            <div>
              <p className="text-xs font-semibold text-forest-deep">{post.author.name}</p>
              <p className="text-[10px] text-forest-deep/60">{post.author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
