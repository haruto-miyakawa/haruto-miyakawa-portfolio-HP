import type { Metadata } from "next";
import { Space_Grotesk, Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
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
  title: "Haruto Miyakawa — Web Engineer / AI Builder",
  description:
    "フロントエンドとAIを軸に、課題を解決するプロダクトを開発しています。Web Engineer / AI Builder, Haruto Miyakawa のポートフォリオ。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${spaceGrotesk.variable} ${zenKaku.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="shell">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
