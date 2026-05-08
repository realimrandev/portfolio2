"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MessageCircle, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-midnight-deep/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-midnight-deep/60" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-display text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-glow/30 to-forest-700/30 ring-1 ring-emerald-glow/30">
                <Sparkles className="h-4 w-4 text-emerald-glow" />
              </span>
              <span>
                {siteConfig.name}
                <span className="text-emerald-glow">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              {siteConfig.tagline} Available for freelance work and select
              full-time roles.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/40">
              {siteConfig.education}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-glow/80">
                Navigate
              </h4>
              <ul className="mt-4 space-y-2">
                {siteConfig.nav.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-glow/80">
                More
              </h4>
              <ul className="mt-4 space-y-2">
                {siteConfig.nav.slice(6).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-glow/80">
                Contact
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phoneIntl}`}
                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-glow/70" />
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-glow/70" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-emerald-glow/70" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5 text-emerald-glow/70" />
                    GitHub
                  </a>
                </li>
                {siteConfig.social.linkedin && (
                  <li>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-emerald-glow/70" />
                      LinkedIn
                    </a>
                  </li>
                )}
                {siteConfig.social.instagram && (
                  <li>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                    >
                      <Instagram className="h-3.5 w-3.5 text-emerald-glow/70" />
                      Instagram
                    </a>
                  </li>
                )}
                {siteConfig.social.tiktok && (
                  <li>
                    <a
                      href={siteConfig.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-glow/70" />
                      TikTok
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Crafted with code &amp; light.
          </p>
          <p className="font-mono uppercase tracking-[0.3em]">
            v1.0 — Built in Pakistan 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}
