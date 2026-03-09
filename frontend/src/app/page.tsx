import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PlatformsGrid } from "@/components/PlatformsGrid";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { DownloadHistory } from "@/components/DownloadHistory";
import { SeoSitemap } from "@/components/SeoSitemap";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-primary overflow-x-hidden">
      <Header />
      <Hero />
      <DownloadHistory />
      <HowItWorks />
      <PlatformsGrid />
      <Features />
      <Pricing />
      <FAQ />
      <SeoSitemap />

      {/* Premium Footer */}
      <footer className="py-32 px-6 border-t border-white/5 mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="space-y-8 col-span-1 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-main-gradient rounded-2xl flex items-center justify-center">
                <Download size={20} className="text-white" />
              </div>
              <span className="text-xl font-black gradient-text tracking-tight">ClipGrab Pro</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed font-medium">
              The ultimate professional tool for high-quality video downloads.
              Secure, fast, and universal.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Downloaders</h4>
            <ul className="space-y-4 text-sm font-medium text-text-secondary">
              <li><a href="/tiktok-video-downloader" className="hover:text-white transition-colors">TikTok Downloader</a></li>
              <li><a href="/instagram-video-downloader" className="hover:text-white transition-colors">Instagram Downloader</a></li>
              <li><a href="/youtube-video-downloader" className="hover:text-white transition-colors">YouTube Downloader</a></li>
              <li><a href="/facebook-video-downloader" className="hover:text-white transition-colors">Facebook Downloader</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-text-secondary">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Support FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-text-secondary">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/50">
          <span>© 2026 ClipGrab Pro. All rights reserved.</span>
          <div className="flex gap-8">
            <span>Status: Online</span>
            <span>Region: Universal</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
