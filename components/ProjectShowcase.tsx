"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Project } from "@/lib/projects";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const sRx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sRy = useSpring(ry, { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: sRx, rotateY: sRy, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(52,245,182,0.45)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${(mx.get() + 0.5) * 100}% ${(my.get() + 0.5) * 100}%, ${project.accentColor}22, transparent 60%)`,
        }}
      />

      <div className="relative grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-midnight-deep">
            <motion.iframe
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={project.liveUrl}
              loading="lazy"
              title={project.title}
              className="h-full w-full origin-center border-0"
              sandbox="allow-scripts allow-same-origin"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight-deep/60 via-transparent to-transparent" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
              }}
            />

            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-midnight-deep/70 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:border-emerald-glow/40 hover:text-emerald-glow">
                  <Play className="h-3 w-3 fill-current" /> Live Preview
                </button>
              </DialogTrigger>
              <DialogContent className="h-[80vh] w-[90vw] max-w-6xl p-0">
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="h-full w-full rounded-3xl border-0"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-glow/80">
                {project.year} · {project.category.replace("-", " ")}
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl font-light leading-tight text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-white/50">{project.subtitle}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {project.longDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t} variant="glass">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-emerald-glow px-5 text-sm font-medium text-midnight-deep transition hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Live
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white backdrop-blur transition hover:border-emerald-glow/40 hover:text-emerald-glow"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
