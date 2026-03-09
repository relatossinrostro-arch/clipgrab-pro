import { Metadata } from "next";
import Home from "../page";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const platform = params.slug.split("-")[0].charAt(0).toUpperCase() + params.slug.split("-")[0].slice(1);
    return {
        title: `The Best ${platform} Video Downloader - No Watermark - ClipGrab Pro`,
        description: `Download ${platform} videos and reels in 1080p/4K instantly. No watermark, high-speed MP4 and MP3 conversion. Try ClipGrab Pro today.`,
    };
}

export default function SEOPage({ params }: { params: { slug: string } }) {
    const platform = params.slug.split("-")[0].charAt(0).toUpperCase() + params.slug.split("-")[0].slice(1);
    return (
        <div className="relative">
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 text-center pointer-events-none">
                <div className="glass py-2 px-6 inline-block mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary border-primary/20">
                    Specialized {platform} Downloader
                </div>
            </div>
            <Home />
        </div>
    );
}
