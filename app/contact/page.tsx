"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

const CHANNELS = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phoneIntl}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat now",
    href: siteConfig.contact.whatsapp,
    external: true,
    primary: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@realimrandev",
    href: siteConfig.social.github,
    external: true,
  },
  ...(siteConfig.social.linkedin ? [{
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect",
    href: siteConfig.social.linkedin,
    external: true,
  }] : []),
  ...(siteConfig.social.instagram ? [{
    icon: Instagram,
    label: "Instagram",
    value: "Follow",
    href: siteConfig.social.instagram,
    external: true,
  }] : []),
  ...(siteConfig.social.tiktok ? [{
    icon: MessageCircle,
    label: "TikTok",
    value: "Follow",
    href: siteConfig.social.tiktok,
    external: true,
  }] : []),
];

function MapBackground() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="absolute inset-0 h-full w-full opacity-30"
      aria-hidden
    >
      <defs>
        <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34f5b6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#34f5b6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#mapGrad)" />
      {Array.from({ length: 25 }).map((_, row) =>
        Array.from({ length: 50 }).map((_, col) => {
          const x = col * 16 + 8;
          const y = row * 16 + 8;
          const r = Math.random() > 0.6 ? 1.2 : 0.6;
          const dx = Math.abs(x - 480);
          const dy = Math.abs(y - 220);
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 280 && Math.random() > 0.7) return null;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r={r}
              fill="#34f5b6"
              opacity={Math.max(0.05, 0.5 - d / 600)}
            />
          );
        }),
      )}
      <circle cx="480" cy="220" r="4" fill="#34f5b6" />
      <circle cx="480" cy="220" r="14" fill="none" stroke="#34f5b6" strokeWidth="1">
        <animate attributeName="r" from="4" to="36" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-40">
        <SectionHeading
          eyebrow="Contact"
          title="Let&apos;s build something cinematic."
          description="Open for freelance, contracts, and select full-time roles. Reply window: under 24 hours."
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-midnight-deep/50 p-8 backdrop-blur-2xl sm:p-12">
          <MapBackground />
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="font-display text-3xl font-light leading-tight text-white sm:text-4xl">
                Reach me on any channel.
              </h3>
              <p className="mt-3 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-emerald-glow" />
                  {siteConfig.location}
                </span>
              </p>
              <div className="mt-8 grid gap-3">
                {CHANNELS.map((c, i) => (
                  <motion.a
                    key={c.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${c.primary ? "border-emerald-glow/40 bg-emerald-glow/10 hover:bg-emerald-glow/15" : "border-white/10 bg-white/[0.03] hover:border-emerald-glow/30 hover:bg-white/[0.06]"}`}
                  >
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${c.primary ? "bg-emerald-glow text-midnight-deep" : "bg-white/5 text-emerald-glow"}`}
                    >
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {c.label}
                      </p>
                      <p className="text-sm text-white">{c.value}</p>
                    </div>
                    <span className="text-emerald-glow opacity-0 transition group-hover:opacity-100">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <GlassCard glow tint="emerald">
                <ContactForm />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
