export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  liveUrl: string;
  sourceUrl?: string;
  tags: string[];
  category: "web-app" | "tool" | "showcase";
  year: string;
  accentColor: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "typing-test",
    title: "Typing Test",
    subtitle: "Real-time speed & accuracy benchmarking",
    description:
      "A clean, responsive typing-speed test that measures words-per-minute and accuracy with live keystroke feedback.",
    longDescription:
      "Built from scratch with vanilla JavaScript and tuned for ultra-low input latency. Features a rolling word window, mistake highlighting, live WPM/accuracy meters, and a celebratory results screen.",
    liveUrl: "https://realimrandev.github.io/typing-test/",
    sourceUrl: "https://github.com/realimrandev/typing-test",
    tags: ["JavaScript", "HTML5", "CSS3", "DOM", "UX"],
    category: "tool",
    year: "2024",
    accentColor: "#34f5b6",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "Personal finance, beautifully visualized",
    description:
      "Track income and expenses with persistent storage, animated category breakdowns, and a clean dashboard UI.",
    longDescription:
      "A lightweight money-management app with localStorage persistence, dynamic transaction list, categorical totals, and instant balance recalculation. Designed mobile-first with smooth micro-interactions.",
    liveUrl: "https://realimrandev.github.io/expense-tracker/",
    sourceUrl: "https://github.com/realimrandev/expense-tracker",
    tags: ["JavaScript", "LocalStorage", "Charts", "Responsive"],
    category: "web-app",
    year: "2024",
    accentColor: "#ff8a3d",
  },
  {
    slug: "active-user",
    title: "Active User",
    subtitle: "Live presence & user activity dashboard",
    description:
      "An interactive dashboard demonstrating real-time presence indicators and animated user states.",
    longDescription:
      "A clean presence UI with animated avatars, live status indicators, and smooth state transitions. A great study in subtle motion design and accessible micro-interactions.",
    liveUrl: "https://realimrandev.github.io/activeuser/",
    sourceUrl: "https://github.com/realimrandev/activeuser",
    tags: ["JavaScript", "Animation", "UI", "Real-time"],
    category: "showcase",
    year: "2024",
    accentColor: "#60a5fa",
  },
  {
    slug: "mini-project",
    title: "Mini Project",
    subtitle: "Compact UI experiment & component sandbox",
    description:
      "A fast, focused mini-project showcasing layout, interactivity, and responsive component patterns.",
    longDescription:
      "A small but polished build that doubles as a component playground — exploring layout grids, hover patterns, and responsive breakpoints with attention to motion polish.",
    liveUrl: "https://realimrandev.github.io/mini/",
    sourceUrl: "https://github.com/realimrandev/mini",
    tags: ["HTML", "CSS", "JavaScript", "Components"],
    category: "showcase",
    year: "2024",
    accentColor: "#a78bfa",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
