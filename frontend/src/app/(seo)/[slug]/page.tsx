import { Metadata } from "next";
import { allSeoPages } from "../../../lib/seo-data";
import { Header } from "../../../components/Header";
import { DownloadTool } from "../../../components/DownloadTool";
import { Features } from "../../../components/Features";
import { FAQ } from "../../../components/FAQ";
import { HowItWorks } from "../../../components/HowItWorks";
import { PlatformsGrid } from "../../../components/PlatformsGrid";
import { Download, CheckCircle2, Star } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return allSeoPages.map((page) => ({
        slug: page.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const pageData = allSeoPages.find(p => p.slug === params.slug);
    if (!pageData) {
        return {
            title: "Not Found",
            description: "Page not found"
        };
    }
    return {
        title: pageData.title,
        description: pageData.description,
    };
}

export default function SeoLandingPage({ params }: { params: { slug: string } }) {
    const pageData = allSeoPages.find(p => p.slug === params.slug);

    if (!pageData) {
        return notFound();
    }

    // Determine platform loosely from slug for UI display
    const platformMatch = pageData.slug.split("-")[0];
    const displayPlatform = ["youtube", "tiktok", "instagram", "facebook", "twitter"].includes(platformMatch)
        ? platformMatch.charAt(0).toUpperCase() + platformMatch.slice(1)
        : "Video";

    const instructions = [
        `Copy the ${displayPlatform} video URL you want to download.`,
        `Paste the link into the ClipGrab Pro analysis box.`,
        `Click "Analyze" and wait for the conversion to complete.`,
        `Select your preferred quality and hit Download.`,
    ];

    const benefits = [
        {
            title: "High Speed",
            desc: "Our servers process downloads in seconds.",
        },
        {
            title: "Top Quality",
            desc: "Support for 4K, 1080p, and HD formats.",
        },
        {
            title: "Safe & Private",
            desc: "We don't track your downloads or history.",
        },
    ];

    // Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ClipGrab Pro",
        "operatingSystem": "Windows, macOS, Android, iOS",
        "applicationCategory": "MultimediaApplication",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1250",
        },
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
        },
    };

    return (
        <main className="min-h-screen bg-background-primary overflow-x-hidden">
            <title>{pageData.title}</title>
            <meta name="description" content={pageData.description} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            {/* Hero Section for SEO Platform */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-glow-pulse opacity-30" />

                <div className="max-w-5xl mx-auto relative z-20 space-y-10">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-morphism border border-white/5 text-[10px] uppercase font-black tracking-[0.3em] text-primary">
                        {displayPlatform} Specialist Downloader
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                        {pageData.title} <br />
                        <span className="gradient-text">Safe & Fast Online.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                        {pageData.description}
                    </p>

                    <div className="relative pt-10">
                        <DownloadTool />
                    </div>
                </div>
            </section>

            {/* Specialized Platform Description */}
            <section className="py-24 px-6 max-w-5xl mx-auto space-y-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black tracking-tight">
                            Best {displayPlatform} Downloader
                        </h2>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            ClipGrab Pro is optimized specifically for {displayPlatform} users.
                            Whether you're looking for high-quality downloads or
                            simple video saves, our tool delivers unparalleled performance.
                        </p>
                        <div className="space-y-4">
                            {instructions.map((step, i) => (
                                <div key={i} className="flex items-center gap-4 text-sm font-bold text-text-secondary">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
                                        {i + 1}
                                    </div>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-morphism p-10 rounded-[40px] border-white/5 space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                            <span className="text-xl font-bold">Trusted by millions</span>
                        </div>
                        <div className="space-y-6">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="text-green-500" size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="font-bold text-sm">{benefit.title}</h5>
                                        <p className="text-xs text-text-secondary">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <HowItWorks />
            <PlatformsGrid />
            <Features />
            <FAQ />

            {/* Internal Linking / See Also */}
            <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="space-y-10">
                    <h3 className="text-2xl font-black">See Also</h3>
                    <div className="flex flex-wrap gap-4">
                        {allSeoPages.slice(0, 20).map((page) => (
                            <a
                                key={page.slug}
                                href={`/${page.slug}`}
                                className="glass-morphism px-6 py-3 rounded-2xl text-xs font-bold text-text-secondary hover:text-primary hover:border-primary/30 transition-all uppercase tracking-widest"
                            >
                                {page.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="py-32 px-6 border-t border-white/5 mt-32 relative overflow-hidden text-center md:text-left">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                    <div className="space-y-8 col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="w-10 h-10 bg-main-gradient rounded-2xl flex items-center justify-center">
                                <Download size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-black gradient-text tracking-tight">ClipGrab Pro</span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            Professional video downloader for {displayPlatform} and more.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
