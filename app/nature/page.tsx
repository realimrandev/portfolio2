"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bird, Leaf, Mountain, Sun, Moon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const NatureWorld = dynamic(
  () => import("@/components/3d/NatureWorld").then((m) => m.NatureWorld),
  { ssr: false },
);

const HOTSPOTS = [
  {
    icon: Mountain,
    label: "Layered Terrain",
    body: "Procedural mesh deformation gives every horizon a unique skyline.",
  },
  {
    icon: Leaf,
    label: "Drifting Leaves",
    body: "Hundreds of instanced leaves drift on stochastic wind currents.",
  },
  {
    icon: Bird,
    label: "Birds in Flight",
    body: "An instanced flock circles the sky, each with its own rhythm.",
  },
];

export default function NaturePage() {
  const [day, setDay] = useState(true);

  return (
    <>
      <section className="relative h-[80vh] w-full overflow-hidden">
        <NatureWorld daytime={day} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-deep/40 via-transparent to-midnight-deep" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 pt-32">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-glow/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-emerald-glow"
          >
            <Leaf className="h-3 w-3" /> Nature Experience
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            className="mt-6 max-w-4xl font-display text-6xl font-light leading-[0.95] text-white sm:text-7xl md:text-8xl"
          >
            Step into a <span className="gradient-text">living world</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-6 max-w-xl text-base text-white/70"
          >
            A full-screen 3D scene built with React Three Fiber. Toggle day or
            night — the entire atmosphere recomposes in real time.
          </motion.p>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => setDay(true)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${day ? "border-emerald-glow/40 bg-emerald-glow/10 text-emerald-glow" : "border-white/10 bg-white/5 text-white/60"}`}
            >
              <Sun className="h-3 w-3" /> Day
            </button>
            <button
              onClick={() => setDay(false)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${!day ? "border-emerald-glow/40 bg-emerald-glow/10 text-emerald-glow" : "border-white/10 bg-white/5 text-white/60"}`}
            >
              <Moon className="h-3 w-3" /> Night
            </button>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Hotspots"
          title="What you&apos;re seeing."
          description="Every element in this world is custom-built for performance. Here&apos;s a look behind the scene."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOTSPOTS.map((h, i) => (
            <GlassCard
              key={h.label}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/30">
                <h.icon className="h-5 w-5 text-emerald-glow" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-light text-white">
                {h.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {h.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
