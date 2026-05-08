import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { GlassCard } from "@/components/ui/GlassCard";
import { testimonials } from "@/lib/testimonials";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Kind words from people I've collaborated with.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-40">
        <SectionHeading
          eyebrow="Testimonials"
          title="Words from collaborators."
          description="Five-star reviews from product teams, founders, and design leads I&apos;ve worked with."
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-20">
        <TestimonialCarousel />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <GlassCard
              key={t.id}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-3.5 w-3.5 fill-emerald-glow text-emerald-glow"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-glow/40 to-forest-700/40 ring-1 ring-emerald-glow/30">
                  <span className="text-xs text-white">
                    {t.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
