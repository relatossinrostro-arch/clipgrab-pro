import { Header } from "@/components/Header";
import { FAQ } from "@/components/FAQ";
import { SeoSitemap } from "@/components/SeoSitemap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background-primary overflow-x-hidden">
            <Header />
            <section className="pt-48 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-10">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary font-medium">
                        Find answers about downloads, supported platforms, browser extension setup, and troubleshooting.
                    </p>
                    <div className="pt-6">
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-morphism border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest text-white group">
                            Go to Downloader
                            <ChevronRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
            <FAQ />
            <SeoSitemap />
            <footer className="py-20 px-6 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/50">
                © 2026 ClipGrab Pro. All rights reserved.
            </footer>
        </main>
    );
}
