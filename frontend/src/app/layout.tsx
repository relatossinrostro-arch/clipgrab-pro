import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "ClipGrab Pro - Universal Video Downloader",
  description: "The most professional way to download videos from TikTok, Instagram, YouTube and more in high quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background-primary text-text-primary selection:bg-primary/30`}>
        {children}
      </body>
    </html>
  );
}
