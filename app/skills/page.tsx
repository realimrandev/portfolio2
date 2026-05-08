"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const SkillsOrb = dynamic(
  () => import("@/components/3d/SkillsOrb").then((m) => m.SkillsOrb),
  { ssr: false },
);

const CATEGORIES = [
  {
    label: "Frontend",
    color: "#34f5b6",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "HTML & CSS", level: 96 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript ES6+", level: 94 },
    ],
  },
  {
    label: "Animation & 3D",
    color: "#ff8a3d",
    skills: [
      { name: "Three.js / R3F", level: 80 },
      { name: "GSAP", level: 88 },
      { name: "Framer Motion", level: 90 },
      { name: "Lenis", level: 85 },
      { name: "Shaders / GLSL", level: 65 },
    ],
  },
  {
    label: "Tooling",
    color: "#60a5fa",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Figma", level: 78 },
      { name: "Vite / Webpack", level: 72 },
      { name: "Vercel / Netlify", level: 88 },
      { name: "Performance audits", level: 80 },
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-40">
        <SectionHeading
          eyebrow="Skills"
          title="The tools, the craft, the polish."
          description="A snapshot of the technologies I reach for daily — and the depth at which I use them."
        />
      </section>

      {/* 3D ORB */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="absolute inset-0 bg-grid-emerald bg-[size:48px_48px] opacity-[0.05]" />
          <div className="absolute inset-0 bg-radial-glow opacity-50" />
          <SkillsOrb />
          <div className="pointer-events-none absolute bottom-6 left-6 rounded-full border border-white/10 bg-midnight-deep/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/50 backdrop-blur">
            Drag · Auto-rotate
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat, ci) => (
            <GlassCard
              key={cat.label}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-[0.4em]"
                style={{ color: cat.color }}
              >
                {cat.label}
              </p>
              <div className="mt-6 space-y-5">
                {cat.skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-white">{s.name}</span>
                      <span className="font-mono text-xs text-white/40">
                        {s.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + i * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${cat.color}, ${cat.color}aa)`,
                          boxShadow: `0 0 12px ${cat.color}66`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
