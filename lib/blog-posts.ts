export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  cover: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-cinematic-web-experiences",
    title: "Building Cinematic Web Experiences with React Three Fiber",
    excerpt:
      "How to design web experiences that feel less like a website and more like an interactive film — without sacrificing performance.",
    date: "2025-02-12",
    readingMinutes: 8,
    tags: ["Three.js", "R3F", "Animation"],
    cover:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=80",
    author: "Imran Sabir",
    content: `Cinematic on the web is not about copying movies — it is about pacing, light, and intent.

## 1. Story before scene
Every scroll is a beat. Plan your camera, your reveals, and your transitions like a director storyboards a film.

## 2. Lighting is the frame
Volumetric fog, soft rim lights, and sunset rim glow do more for atmosphere than any extra polygon.

## 3. Performance is the budget
60 FPS on mid-range mobile is the floor. Use \`useDetectGPU\`, instancing, DPR clamps, and dynamic imports.

## 4. Motion has gravity
Every interaction should ease — never linear, never abrupt. GSAP's \`expo.out\` is the secret weapon.

## 5. Sound seals the world
Even a 30-second ambient loop, gated behind a toggle, doubles immersion when used sparingly.`,
  },
  {
    slug: "the-art-of-glassmorphism",
    title: "The Art of Glassmorphism in Modern Web UI",
    excerpt:
      "When glass works, when it fails, and how to layer translucency for premium product UI.",
    date: "2025-01-28",
    readingMinutes: 6,
    tags: ["UI", "Design", "CSS"],
    cover:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&q=80",
    author: "Imran Sabir",
    content: `Glassmorphism is not a trick — it is a hierarchy tool.

## Background matters
Glass on a flat color is just blur. Glass over depth — fog, gradient, photography — feels alive.

## Layer your light
A 1px inner highlight + soft outer shadow = the difference between premium and cheap.

## Watch contrast
Always ensure text-on-glass passes WCAG AA. If it doesn't, add a subtle dark veil behind the glass.

## Animate the blur
On hover, easing backdrop-filter from 12px → 20px gives that "focus" feel premium apps use.`,
  },
  {
    slug: "from-corvit-to-creative-engineer",
    title: "From Corvit to Creative Engineer: My Frontend Journey",
    excerpt:
      "The road from a web development course to building cinematic, production-grade interfaces.",
    date: "2025-01-04",
    readingMinutes: 5,
    tags: ["Career", "Story"],
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80",
    author: "Imran Sabir",
    content: `Every senior was once a beginner. This is mine.

## Corvit was the launchpad
The fundamentals — HTML, CSS, JavaScript, the DOM — drilled into reflex.

## The first project
A typing test. Crude, but mine. Shipping it taught me more than any tutorial.

## The leap
React, Tailwind, and motion design opened a new door. Suddenly the browser felt like a stage.

## Today
Three.js, GSAP, scroll choreography. Building experiences, not just pages.

The journey continues.`,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
