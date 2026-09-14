'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { MOCK_BLOGS } from '@/lib/mock-data/blogs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = MOCK_BLOGS.find((b) => b.slug === resolvedParams.slug);
  const { showToast } = useToast();

  if (!post) {
    return notFound();
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast({
      type: 'success',
      message: 'Article link copied to clipboard!',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Blogs', href: '/blogs' },
          { label: post.title },
        ]}
      />

      {/* Header */}
      <div className="space-y-4">
        <Badge variant="terracotta">{post.category}</Badge>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-terracotta-deep leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-cream-dark">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-cream-dark"
            />
            <div>
              <p className="text-sm font-semibold text-terracotta-deep">{post.author.name}</p>
              <p className="text-xs text-terracotta-deep/60">
                {post.publishedAt} · {post.readTime}
              </p>
            </div>
          </div>

          <Button onClick={handleShare} variant="outline" size="sm">
            Share Article
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-cream-dark">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-2xl p-8 md:p-12 border border-cream-dark prose prose-stone max-w-none space-y-6 text-terracotta-deep/90 leading-relaxed text-base">
        <p className="text-lg font-medium text-terracotta-deep leading-relaxed italic border-l-4 border-terracotta pl-4 bg-cream/30 py-2">
          {post.excerpt}
        </p>

        <div className="whitespace-pre-line space-y-4">{post.content}</div>

        {/* Tags */}
        <div className="pt-8 border-t border-cream-dark flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-deep/60 mr-2">
            Tags:
          </span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="cream">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>
    </div>
  );
}
