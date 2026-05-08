import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="relative mx-auto max-w-3xl px-6 pb-32 pt-40">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-emerald-glow"
      >
        <ArrowLeft className="h-3 w-3" /> All articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="default">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="mt-6 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min read
          </span>
          <span className="text-white/60">{post.author}</span>
        </div>
      </header>

      <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
        <Image
          src={post.cover}
          alt={post.title}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
          unoptimized
        />
      </div>

      <div className="prose prose-invert mt-12 max-w-none">
        {post.content.split("\n\n").map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="mt-12 font-display text-3xl font-light leading-tight text-white"
              >
                {block.slice(3)}
              </h2>
            );
          }
          return (
            <p key={i} className="mt-6 text-base leading-relaxed text-white/80">
              {block}
            </p>
          );
        })}
      </div>
    </article>
  );
}
