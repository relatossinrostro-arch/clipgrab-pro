import { Header } from "../../components/Header";
import { Download, Chrome, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ClipGrab Chrome Extension – Download Videos Instantly",
    description: "Download videos from YouTube, TikTok, Instagram and more using the ClipGrab Chrome Extension.",
};

export default function ExtensionPage() {
    const steps = [
        { title: "Download Zip", desc: "Click the button below to download the extension package." },
        { title: "Extract Files", desc: "Unzip the downloaded file to a folder on your computer." },
        { title: "Chrome Extensions", desc: "Open Chrome and go to chrome://extensions in your address bar." },
        { title: "Developer Mode", desc: "Enable 'Developer Mode' in the top right corner." },
        { title: "Load Unpacked", desc: "Click 'Load unpacked' and select the extracted extension folder." }
    ];

    return (
        <main className="min-h-screen bg-[#0f172a] overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-glow-pulse opacity-30" />

                <div className="max-w-4xl mx-auto relative z-10 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-morphism border border-white/5 text-[10px] uppercase font-black tracking-[0.3em] text-primary">
                        <Chrome size={14} /> Official Chrome Extension
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                        ClipGrab <br />
                        <span className="gradient-text">Chrome Extension</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                        Download videos directly from your browser with a single click. Faster, easier, and completely free.
                    </p>

                    <a
                        href="/downloads/clipgrab-extension.zip"
                        download
                        className="premium-button !py-6 !px-12 inline-flex items-center gap-4 group"
                    >
                        <Download size={22} className="group-hover:translate-y-0.5 transition-transform" />
                        <span className="text-lg uppercase font-black tracking-widest">Download Extension Zip</span>
                    </a>
                </div>
            </section>

            {/* Installation Guide */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="glass-morphism rounded-[48px] p-12 md:p-20 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="grid lg:grid-cols-2 gap-20 relative z-10">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Installation Guide</h2>
                                <p className="text-slate-400 font-medium">Follow these simple steps to get started in seconds.</p>
                            </div>

                            <div className="space-y-8">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            {i + 1}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-lg">{step.title}</h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight">How to Use</h2>
                                <p className="text-slate-400 font-medium">The most intuitive way to capture content.</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Visit YouTube, TikTok or Instagram",
                                    "Click the ClipGrab Extension icon",
                                    "Press 'Download Current Video'",
                                    "Boom! Your video is ready"
                                ].map((text, i) => (
                                    <div key={i} className="glass-morphism p-6 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-all border border-white/5 group">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="font-bold">{text}</span>
                                        <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Shield size={20} />
                                    <span className="font-black text-sm uppercase tracking-widest">Privacy First</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Our extension doesn't track your browsing history or collect personal data. It only captures the URL of the video you want to download.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 px-6 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                © 2026 ClipGrab Pro. All rights reserved.
            </footer>
        </main>
    );
}
