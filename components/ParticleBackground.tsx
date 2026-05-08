"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useThemeMode } from "@/components/ThemeContext";
import type { ParticleMode } from "@/lib/themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: number;
  life: number;
  rot: number;
  spin: number;
}

interface ModeConfig {
  densityMul: number;
  draw: (ctx: CanvasRenderingContext2D, p: Particle) => void;
  step: (p: Particle, w: number, h: number) => void;
  spawn: (w: number, h: number) => Particle;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeConfig(mode: ParticleMode): ModeConfig {
  switch (mode) {
    case "aurora":
      return {
        densityMul: 1.2,
        spawn: (w, h) => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.2, 0.2),
          vy: rand(-0.35, -0.1),
          r: rand(0.6, 1.8),
          alpha: rand(0.2, 0.7),
          hue: 180 + Math.random() * 110, // cyan → violet
          life: 0,
          rot: 0,
          spin: 0,
        }),
        step: (p, w, h) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        },
        draw: (ctx, p) => {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.9)`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        },
      };
    case "embers":
      return {
        densityMul: 1.4,
        spawn: (w, h) => ({
          x: Math.random() * w,
          y: h + Math.random() * 40,
          vx: rand(-0.15, 0.15),
          vy: rand(-1.1, -0.4),
          r: rand(0.8, 2.2),
          alpha: rand(0.45, 0.95),
          hue: 14 + Math.random() * 32, // warm amber → coral
          life: 0,
          rot: 0,
          spin: 0,
        }),
        step: (p, w, h) => {
          p.x += p.vx + Math.sin((p.y + p.x) * 0.01) * 0.15;
          p.y += p.vy;
          p.alpha -= 0.002;
          if (p.y < -20 || p.alpha <= 0) {
            p.y = h + 10;
            p.x = Math.random() * w;
            p.alpha = rand(0.45, 0.95);
          }
        },
        draw: (ctx, p) => {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
          ctx.shadowBlur = 18;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.9)`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        },
      };
    case "bubbles":
      return {
        densityMul: 0.85,
        spawn: (w, h) => ({
          x: Math.random() * w,
          y: h + Math.random() * 40,
          vx: 0,
          vy: rand(-0.6, -0.2),
          r: rand(1.4, 4.4),
          alpha: rand(0.25, 0.6),
          hue: 190 + Math.random() * 30,
          life: Math.random() * Math.PI * 2,
          rot: 0,
          spin: rand(0.02, 0.06),
        }),
        step: (p, w, h) => {
          p.life += p.spin;
          p.x += Math.sin(p.life) * 0.35;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
        },
        draw: (ctx, p) => {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${p.hue}, 95%, 75%, ${p.alpha})`;
          ctx.fillStyle = `hsla(${p.hue}, 95%, 80%, ${p.alpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${p.hue}, 95%, 75%, 0.6)`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        },
      };
    case "stars":
      return {
        densityMul: 1.8,
        spawn: (w, h) => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          r: rand(0.3, 1.6),
          alpha: rand(0.2, 0.9),
          hue: 280 + Math.random() * 60, // magenta → violet
          life: Math.random() * Math.PI * 2,
          rot: 0,
          spin: rand(0.01, 0.04),
        }),
        step: (p) => {
          p.life += p.spin;
        },
        draw: (ctx, p) => {
          const tw = 0.5 + 0.5 * Math.sin(p.life);
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 100%, 80%, ${p.alpha * tw})`;
          ctx.shadowBlur = 10 * tw;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, 0.9)`;
          ctx.arc(p.x, p.y, p.r * (0.6 + 0.4 * tw), 0, Math.PI * 2);
          ctx.fill();
        },
      };
    case "leaves":
    default:
      return {
        densityMul: 1,
        spawn: (w, h) => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.15, 0.15),
          vy: rand(-0.3, -0.08),
          r: rand(0.4, 1.7),
          alpha: rand(0.2, 0.7),
          hue: 150 + Math.random() * 30,
          life: 0,
          rot: 0,
          spin: 0,
        }),
        step: (p, w, h) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        },
        draw: (ctx, p) => {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 75%, 72%, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(52, 245, 182, 0.6)";
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        },
      };
  }
}

export function ParticleBackground({
  density = 0.00012,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced || !mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = makeConfig(theme.particle);
    let particles: Particle[] = [];
    let raf = 0;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const count = Math.max(
        40,
        Math.floor(
          window.innerWidth * window.innerHeight * density * cfg.densityMul,
        ),
      );
      particles = Array.from({ length: count }, () =>
        cfg.spawn(window.innerWidth, window.innerHeight),
      );
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        cfg.step(p, window.innerWidth, window.innerHeight);
        cfg.draw(ctx, p);
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, reduced, theme.particle, mounted]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none fixed inset-0 -z-10 opacity-70"}
    />
  );
}
