"use client";

import { motion } from "framer-motion";
import { DownloadTool } from "./DownloadTool";

export function Hero() {
    const platforms = ["TikTok", "Instagram", "Facebook", "YouTube", "Twitter/X", "Vimeo"];

    return (
        <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-glow-pulse opacity-30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-background-primary to-transparent z-10" />

            <div className="max-w-4xl mx-auto relative z-20 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full glass-morphism border border-white/5 text-[10px] uppercase font-black tracking-[0.3em] text-primary">
                        Universal Video Downloader
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
                        Download Videos <br />
                        <span className="gradient-text">From Any Platform.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                        Paste your link and download your favorite content in stunning 4K quality instantly.
                        Direct. Simple. Professional.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative"
                >
                    <DownloadTool />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-4"
                >
                    {platforms.map((platform) => (
                        <span key={platform} className="text-[10px] font-black uppercase tracking-widest text-text-secondary/40">
                            {platform}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
