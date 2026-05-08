import type { Metadata } from "next";
import {
  Code2,
  Layers,
  Smartphone,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Frontend development, UI/UX, responsive design, and web animation services by Imran Sabir.",
};

const SERVICES = [
  {
    icon: Code2,
    title: "Frontend Development",
    color: "#34f5b6",
    description:
      "Production-grade React, Next.js, and TypeScript builds — fast, accessible, and battle-tested.",
    deliverables: [
      "Component architecture",
      "Type-safe APIs",
      "SEO-optimized routing",
      "CI/CD ready",
    ],
  },
  {
    icon: Layers,
    title: "UI / UX Design",
    color: "#ff8a3d",
    description:
      "Interfaces that feel alive — Figma to code, with attention to every spacing, weight, and tone.",
    deliverables: [
      "Design systems",
      "Wireframes & prototypes",
      "Accessibility audits",
      "Pixel-perfect handoff",
    ],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    color: "#60a5fa",
    description:
      "Mobile-first layouts that hold up from a 320px phone to a 4K monitor without compromise.",
    deliverables: [
      "Fluid typography",
      "Container queries",
      "Touch-first patterns",
      "Performance budgets",
    ],
  },
  {
    icon: Wand2,
    title: "Web Animation",
    color: "#a78bfa",
    description:
      "GSAP, Framer Motion, and React Three Fiber — the secret sauce for cinematic interactions.",
    deliverables: [
      "Scroll storytelling",
      "3D scenes",
      "Page transitions",
      "Hover & micro-interactions",
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", body: "We align on goals, audience, and brand voice." },
  { step: "02", title: "Design", body: "Wireframes → high-fidelity → motion direction." },
  { step: "03", title: "Build", body: "Component-driven, type-safe, performance-first." },
  { step: "04", title: "Polish", body: "Audit, optimize, and ship with confidence." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-40">
        <SectionHeading
          eyebrow="Services"
          title="What I&apos;ll build for you."
          description="Four lenses I bring to every engagement. Pick one, mix two, or commission the full stack."
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <GlassCard
              key={s.title}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl ring-1"
                style={{
                  background: `${s.color}20`,
                  borderColor: `${s.color}50`,
                }}
              >
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <h3 className="mt-6 font-display text-3xl font-light leading-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {s.description}
              </p>
              <ul className="mt-6 space-y-2">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: s.color }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <SectionHeading
          eyebrow="Process"
          title="A simple, focused way of working."
          align="center"
          className="mb-16"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <GlassCard
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-glow/70">
                {p.step}
              </span>
              <h4 className="mt-3 font-display text-2xl font-light text-white">
                {p.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {p.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 pb-32">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-glow/20 bg-gradient-to-br from-emerald-glow/10 via-white/[0.03] to-sunset/5 p-12 text-center backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50 blur-3xl" />
          <h3 className="relative font-display text-3xl font-light leading-tight text-white sm:text-4xl">
            Tell me about your project — I&apos;ll reply within hours.
          </h3>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <AnimatedButton href="/contact" size="lg">
              Start the conversation
            </AnimatedButton>
          </div>
        </div>
      </section>
    </>
  );
}
