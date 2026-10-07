import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BlogCard } from '@/components/sections/BlogCard';
import { getBlogs } from '@/lib/sanity/data';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'Blogs & Guides' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="forest" size="sm">
          Travel Tips &amp; Stories
        </Badge>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Pawna Lake Camping Guides
        </h1>
        <p className="text-sm text-forest-deep/75 leading-relaxed">
          Insider advice on best seasons, route directions, glamping tips, and hidden sunset spots around Lonavala.
        </p>
      </div>

      {/* Featured Main Post Banner */}
      {featuredPost && (
        <div className="bg-white rounded-2xl border border-mist overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative h-64 lg:h-auto min-h-[300px]">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="forest">Featured Guide</Badge>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs text-forest-deep/60">{featuredPost.publishedAt} · {featuredPost.readTime}</span>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep hover:text-forest transition">
                <a href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</a>
              </h2>
              <p className="text-sm text-forest-deep/80 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-mist">
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-mist"
                />
                <div>
                  <p className="text-xs font-semibold text-forest-deep">{featuredPost.author.name}</p>
                  <p className="text-[10px] text-forest-deep/60">{featuredPost.author.role}</p>
                </div>
              </div>

              <a
                href={`/blogs/${featuredPost.slug}`}
                className="text-xs font-semibold text-forest hover:underline"
              >
                Read Full Guide →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
