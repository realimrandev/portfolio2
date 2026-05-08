# Imran Sabir — Cinematic 3D Portfolio

A next-generation, immersive personal portfolio built with **Next.js 15**, **React 19**, **React Three Fiber**, **GSAP**, **Framer Motion**, **Lenis**, **Tailwind CSS**, and **shadcn/ui**.

> Cinematic forest world. Glassmorphic UI. Game-quality transitions.

## Features

- 10 fully-designed pages (Home, About, Projects, Skills, Services, Nature, Testimonials, Blog, Contact, 404)
- Real-time 3D forest hero with volumetric fog, water shader, instanced birds & leaves
- GSAP scroll storytelling + Lenis smooth scroll
- Glass morphism, dynamic shadows, ambient particles
- Custom magnetic cursor, sound toggle, theme toggle
- WhatsApp floating CTA, animated contact form
- Cinematic loading screen and page transitions
- Fully responsive, GPU-aware quality tiers, reduced-motion support
- SEO ready (metadata, sitemap, robots, OG image)

## Stack

| Layer | Tools |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS 3.4 + shadcn/ui + Lucide |
| 3D | three, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| Motion | GSAP, Framer Motion, Lenis, split-type |

## Quick start

```bash
# install (peer-deps flag required for R3F + React 19)
npm install --legacy-peer-deps

# dev server
npm run dev
# → http://localhost:3000

# production build
npm run build
npm start
```

## Configuration

All personal info (name, contact, social links, projects, testimonials) lives in **one** file:

```
lib/site-config.ts
```

Edit there to change phone, email, project URLs, or socials site-wide.

## Project structure

```
app/                Next.js App Router pages
components/         Reusable UI components
components/3d/      React Three Fiber scenes
components/ui/      shadcn-style primitives + custom UI
lib/                Site config, data, utilities
hooks/              Custom React hooks
public/             Static assets, favicons, OG
```

## Pages

1. `/` — Cinematic 3D hero
2. `/about` — Story + animated timeline
3. `/projects` — 4 live projects with iframe previews
4. `/skills` — Interactive 3D logo sphere
5. `/services` — Frontend / UI-UX / Responsive / Animation
6. `/nature` — Fully explorable 3D nature world
7. `/testimonials` — Floating glass carousel
8. `/blog` — Cinematic article grid
9. `/contact` — Form + WhatsApp + map
10. `/404` — Lost-in-the-forest scene

## Deploy

Deploy to Netlify, Vercel, or any Node host. For Netlify use the **Next.js** preset.

## Credits

Designed and engineered for **Imran Sabir** — Frontend Developer, Corvit graduate.

- 📞 03294963776
- 💬 WhatsApp: [wa.me/923294963776](https://wa.me/923294963776)
- 📧 Email: [imransabir@gmail.com](mailto:imransabir@gmail.com)
- 🌐 GitHub: [@realimrandev](https://github.com/realimrandev)

---

© 2025 Imran Sabir. Crafted with code & light.
