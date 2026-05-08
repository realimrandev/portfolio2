/**
 * Single source of truth for site-wide configuration.
 * Edit values here to update name, contact, links, and SEO across the entire site.
 */
export const siteConfig = {
  name: "Imran Sabir",
  shortName: "Imran",
  role: "Frontend Developer & Creative Web Engineer",
  tagline: "Crafting cinematic web experiences with code, motion, and light.",
  description:
    "Imran Sabir — Frontend Developer specializing in cinematic 3D websites, web animation, and immersive user experiences. Corvit Web Development graduate.",
  url: "https://imransabir.dev",
  ogImage: "/og.png",
  // To use your own portrait: save it as public/images/imran.jpg and change this path to "/images/imran.jpg".
  avatar: "/images/imran.jpg",
  location: "Pakistan",
  education: "Web Development — Corvit Systems",
  contact: {
    phone: "03294963776",
    phoneIntl: "+923294963776",
    whatsapp: "https://wa.me/923294963776",
    email: "imransabir2005@gmail.com",
  },
  social: {
    github: "https://github.com/realimrandev",
    linkedin: "https://www.linkedin.com/in/imran-sabir-developer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "",
    instagram: "https://www.instagram.com/cybernaticdream?igsh=aTE2ZWtsbDhsNmxx",
    tiktok: "https://www.tiktok.com/@cybernetic_dream?_r=1&_t=ZS-95MHRW2EZy4",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Services", href: "/services" },
    { label: "Nature", href: "/nature" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
