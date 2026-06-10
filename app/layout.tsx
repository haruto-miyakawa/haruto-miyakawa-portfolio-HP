import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Sidebar } from "@/components/Sidebar";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/content/content.data";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s ｜ Haruto Miyakawa" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Haruto Miyakawa",
    "宮川 陽翔",
    "Web Engineer",
    "AI Builder",
    "フロントエンド",
    "Next.js",
    "LLM",
    "Explainable AI",
    "ポートフォリオ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@myfuns101010",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#110b09",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haruto Miyakawa",
  alternateName: "宮川 陽翔",
  url: SITE_URL,
  jobTitle: "Web Engineer / AI Builder",
  email: `mailto:${profile.email}`,
  sameAs: [profile.githubUrl, profile.xUrl],
  knowsAbout: ["Frontend Engineering", "AI", "LLM", "Explainable AI", "Next.js", "TypeScript"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${spaceGrotesk.variable} ${zenKaku.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          メインコンテンツへスキップ
        </a>
        <div className="shell">
          <Sidebar />
          <main className="main" id="main">
            {children}
            <SiteFooter />
          </main>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
