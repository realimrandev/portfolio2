import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Timeline } from "@/components/Timeline";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { siteConfig } from "@/lib/site-config";
import { GraduationCap, Sparkles, Code2, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — a frontend developer specializing in cinematic 3D web experiences, born from a foundation at Corvit.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title="From Corvit to creative engineering."
              description="My obsession is the moment when light, motion, and code meet — when a webpage stops feeling like a document and starts feeling like a place."
            />
            <div className="mt-10 space-y-5 text-base leading-relaxed text-white/70">
              <p>
                I&apos;m {siteConfig.name}, a frontend developer based in Pakistan.
                My journey began at <span className="text-emerald-glow">Corvit Systems</span>,
                where I completed the Web Development course and discovered that
                code is just paint waiting for a story.
              </p>
              <p>
                Since then, I&apos;ve been building tools, dashboards, and
                cinematic interfaces — sweating motion polish and performance
                in equal measure. I love the moments when a hover state feels
                like a small reward and a scroll feels like a story.
              </p>
              <p>
                When I&apos;m not in the editor, I&apos;m studying film,
                photography, and game design — the disciplines that make me a
                better web designer.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <AnimatedButton href="/projects" size="lg">
                See my work
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="glass" size="lg">
                Get in touch
              </AnimatedButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-glow/15 via-forest-700/15 to-midnight-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <Image
                src={siteConfig.avatar}
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight-deep via-midnight-deep/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-grid-emerald bg-[size:32px_32px] opacity-[0.06] mix-blend-overlay" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-display text-2xl font-light leading-tight text-white">
                  &ldquo;Code is just paint
                  <br />
                  <span className="gradient-text">waiting for a story.&rdquo;</span>
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
                  — {siteConfig.name}
                </p>
              </div>
              <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-glow/20 ring-1 ring-emerald-glow/50 backdrop-blur">
                <Sparkles className="h-5 w-5 text-emerald-glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Journey"
          title="The path so far."
          description="From writing my first <div> to shipping interactive 3D worlds."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Timeline />
          </div>
          <div className="space-y-4 lg:col-span-5">
            <GlassCard glow tint="emerald">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-emerald-glow" />
                <h4 className="font-display text-xl text-white">Education</h4>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Web Development — <strong className="text-white">Corvit Systems</strong>.
                The launchpad: HTML, CSS, JavaScript, the DOM, and the discipline
                of shipping.
              </p>
            </GlassCard>
            <GlassCard glow>
              <div className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-emerald-glow" />
                <h4 className="font-display text-xl text-white">Stack</h4>
              </div>
              <p className="mt-3 text-sm text-white/70">
                React, Next.js, TypeScript, Three.js, GSAP, Framer Motion,
                Tailwind. Polished with tools like Lenis, Drei, and shadcn/ui.
              </p>
            </GlassCard>
            <GlassCard glow tint="sunset">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-sunset-glow" />
                <h4 className="font-display text-xl text-white">Off-screen</h4>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Cinema, photography, and long walks. Inspiration rarely arrives
                while staring at a screen.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
