import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LoadingScreen } from "@/components/LoadingScreen";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ParticleBackground } from "@/components/ParticleBackground";
import { PageTransition } from "@/components/PageTransition";
import { ThemeAura } from "@/components/ThemeAura";
import { siteConfig } from "@/lib/site-config";

// Inline, executes BEFORE React hydrates -> no theme flash when reloading.
const THEME_INIT_SCRIPT = `(()=>{try{var k='imran-portfolio-theme';var valid=['forest','aurora','sunset','ocean','cosmos'];var s=localStorage.getItem(k);var t=valid.indexOf(s)>-1?s:'forest';var h=document.documentElement;valid.forEach(function(x){h.classList.remove('theme-'+x)});h.classList.add('theme-'+t);h.setAttribute('data-theme',t);}catch(e){document.documentElement.classList.add('theme-forest');}})();`;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Imran Sabir",
    "Frontend Developer",
    "Pakistan",
    "Corvit",
    "Three.js",
    "React",
    "Next.js",
    "Cinematic web",
    "Portfolio",
    "Web Animation",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#022c22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} theme-forest`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-emerald-glow focus:px-4 focus:py-2 focus:text-sm focus:text-midnight-deep"
        >
          Skip to content
        </a>
        <Providers>
          <LoadingScreen />
          <ThemeAura />
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          <CustomCursor />
          <main id="main" className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
