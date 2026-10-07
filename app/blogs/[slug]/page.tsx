import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { getBlogBySlug } from '@/lib/sanity/data';
import { ShareButton } from '@/components/ui/ShareButton';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Lakeora`,
    description: post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

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
        <Badge variant="forest">{post.category}</Badge>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-mist">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-mist"
            />
            <div>
              <p className="text-sm font-semibold text-forest-deep">{post.author.name}</p>
              <p className="text-xs text-forest-deep/60">
                {post.publishedAt} · {post.readTime}
              </p>
            </div>
          </div>

          <ShareButton />
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-mist">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-2xl p-8 md:p-12 border border-mist prose prose-stone max-w-none space-y-6 text-forest-deep/90 leading-relaxed text-base">
        <p className="text-lg font-medium text-forest-deep leading-relaxed italic border-l-4 border-forest pl-4 bg-paper/30 py-2">
          {post.excerpt}
        </p>

        <div className="space-y-4 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-forest-deep [&_h3]:mt-6 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1">
          <PortableText value={post.body} />
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-mist flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-deep/60 mr-2">
            Tags:
          </span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="paper">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>
    </div>
  );
}
