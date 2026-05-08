"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, MousePointer2 } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const ForestScene = dynamic(
  () => import("@/components/3d/ForestScene").then((m) => m.ForestScene),
  { ssr: false },
);

const SKILLS_MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "Tailwind",
  "Shaders",
  "WebGL",
  "Lenis",
  "Drei",
  "Node.js",
];

const STATS = [
  { value: "20+", label: "Projects shipped" },
  { value: "60", label: "FPS standard" },
  { value: "100%", label: "Mobile ready" },
  { value: "1y", label: "Since Corvit" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <ForestScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-deep/30 via-transparent to-midnight-deep" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-glow/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-emerald-glow"
          >
            <Sparkles className="h-3 w-3" />
            <span>Frontend Developer · Pakistan · Available for work</span>
          </motion.div>

          <h1 className="font-display text-[12vw] font-light leading-[0.92] tracking-tight text-white sm:text-[10vw] lg:text-[8.5vw]">
            <AnimatedText text="Imran" as="span" delay={0.6} />
            <br />
            <span className="gradient-text">
              <AnimatedText text="Sabir" as="span" delay={0.9} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Crafting cinematic, performant web experiences with React, Three.js,
            and motion design — born from a foundation built at{" "}
            <span className="text-emerald-glow">Corvit Web Development</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <AnimatedButton href="/projects" size="lg">
              Explore Projects
            </AnimatedButton>
            <AnimatedButton
              href="/contact"
              variant="glass"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Start a Project
            </AnimatedButton>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ScrollIndicator />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative border-y border-white/5 bg-midnight-deep/40 py-8 backdrop-blur">
        <Marquee speed={28}>
          {SKILLS_MARQUEE.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-3 font-display text-3xl font-light tracking-tight text-white/30"
            >
              {s}
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow/50" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* INTRO */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Welcome"
              title="A digital craftsman building immersive interfaces."
              description="I design and engineer high-performance web experiences with cinematic motion, dynamic 3D, and obsessive attention to detail."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {STATS.map((s, i) => (
              <GlassCard
                key={s.label}
                glow
                tint={i % 2 === 0 ? "emerald" : "neutral"}
                className="flex flex-col justify-between"
              >
                <p className="font-display text-5xl font-light text-white">
                  {s.value}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-emerald-glow/70">
                  {s.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects, polished &amp; shipped."
          />
          <AnimatedButton href="/projects" variant="outline" size="sm">
            View All
          </AnimatedButton>
        </div>

        <div className="space-y-12">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectShowcase key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <SectionHeading
          eyebrow="What I do"
          title="Cinema-grade web, end-to-end."
          description="From the first sketch to the final pixel, here is what I bring to the table."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "Cinematic Frontend", body: "Pixel-perfect interfaces with motion that feels expensive." },
            { icon: Zap, title: "Performance", body: "60fps on mid-range mobile. Tight bundles, lazy 3D, smart caching." },
            { icon: MousePointer2, title: "Interaction Design", body: "Every hover, scroll, and tap deserves intent." },
            { icon: ArrowRight, title: "Ship Fast", body: "From Figma to production in days, not months." },
          ].map((f, i) => (
            <GlassCard
              key={f.title}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/30">
                <f.icon className="h-5 w-5 text-emerald-glow" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-light text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {f.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <SectionHeading
          eyebrow="Kind words"
          title="What collaborators say."
          align="center"
          className="mb-16"
        />
        <TestimonialCarousel />
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-6 pb-32">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-glow/20 bg-gradient-to-br from-emerald-glow/10 via-white/[0.03] to-sunset/5 p-12 text-center backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50 blur-3xl" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-glow">
            Let&apos;s build
          </p>
          <h3 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Have a vision?
            <br />
            <span className="gradient-text">Let&apos;s make it cinematic.</span>
          </h3>
          <p className="mx-auto mt-6 max-w-md text-sm text-white/60">
            Available for freelance projects and select full-time roles.
            Reach out via {siteConfig.contact.phone}.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AnimatedButton href="/contact" size="lg">
              Start a project
            </AnimatedButton>
            <AnimatedButton
              href={siteConfig.contact.whatsapp}
              variant="glass"
              size="lg"
              external
            >
              Chat on WhatsApp
            </AnimatedButton>
          </div>
        </div>
      </section>
    </>
  );
}
