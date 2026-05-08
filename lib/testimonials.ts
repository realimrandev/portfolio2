export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ahmed Raza",
    role: "Founder",
    company: "PixelForge Studio",
    quote:
      "Imran turned a vague idea into a stunning interactive site. The motion polish is on another level — clients keep asking who built it.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sana Khan",
    role: "Product Designer",
    company: "Northwind Labs",
    quote:
      "Working with Imran felt like collaborating with a senior creative engineer. He sweats the small stuff and ships clean, performant code.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Bilal Ahmed",
    role: "Tech Lead",
    company: "Vertex Solutions",
    quote:
      "Pixel-perfect handoff, smooth animations, zero layout shift on mobile. Exactly the kind of frontend partner you want for premium work.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Hira Malik",
    role: "Marketing Director",
    company: "Lumen Agency",
    quote:
      "Our conversion went up 38% after Imran rebuilt our hero section. The 3D scene is now our biggest brand asset.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Daniyal Sheikh",
    role: "CEO",
    company: "Skyline Ventures",
    quote:
      "Reliable, fast, and creatively fearless. Imran is one of the few frontend devs who actually understands cinematic design.",
    rating: 5,
  },
];
