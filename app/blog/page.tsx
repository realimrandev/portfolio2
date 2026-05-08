import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog-posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on cinematic web design, motion engineering, and the craft of frontend.",
};

export default function BlogPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32 pt-40">
      <SectionHeading
        eyebrow="Insights"
        title="Notes on craft, motion, and code."
        description="Long-form thoughts on building interactive experiences for the web."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition hover:border-emerald-glow/30 hover:shadow-[0_30px_80px_-30px_rgba(52,245,182,0.4)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.cover}
                alt={p.title}
                width={800}
                height={500}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep via-midnight-deep/30 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="glass">
                    {t}
                  </Badge>
                ))}
              </div>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-emerald-glow text-midnight-deep opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-2xl font-light leading-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">
                {p.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(p.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {p.readingMinutes} min read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
