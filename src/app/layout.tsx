import type { Metadata } from "next";
import { Silkscreen, Space_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-silkscreen" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
const plexMono = IBM_Plex_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "3AM OS",
  description: "a hub for late-night internet surfers",
};

const vibeBootstrap = `try{var v=localStorage.getItem("3amos-vibe");document.documentElement.dataset.vibe=(v==="light"||v==="midnight")?v:"midnight"}catch(e){document.documentElement.dataset.vibe="midnight"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: vibeBootstrap }} />
      </head>
      <body className={`${silkscreen.variable} ${spaceMono.variable} ${plexMono.variable}`}>
        {children}
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
