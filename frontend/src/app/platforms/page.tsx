import { Header } from "../../components/Header";
import { PlatformsGrid } from "../../components/PlatformsGrid";
import { SeoSitemap } from "../../components/SeoSitemap";
import { DownloadTool } from "../../components/DownloadTool";

export default function PlatformsPage() {
    return (
        <main className="min-h-screen bg-background-primary overflow-x-hidden">
            <Header />
            <section className="pt-48 pb-20 px-6 text-center">
                <div className="max-w-5xl mx-auto space-y-12">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Supported <span className="gradient-text">Platforms</span>
                    </h1>
                    <DownloadTool />
                </div>
            </section>
            <PlatformsGrid />
            <SeoSitemap />
            <footer className="py-20 px-6 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/50">
                © 2026 ClipGrab Pro. All rights reserved.
            </footer>
        </main>
    );
}
