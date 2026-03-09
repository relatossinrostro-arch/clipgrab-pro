"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Image, Smartphone, Globe, RefreshCcw } from "lucide-react";

const features = [
    {
        title: "Fast Downloads",
        desc: "Experience high-speed server response for instant video acquisition.",
        icon: <Zap size={24} />,
    },
    {
        title: "HD Quality",
        desc: "Download in 4K, 1080p, and 720p without any resolution loss.",
        icon: <Globe size={24} />,
    },
    {
        title: "MP3 Conversion",
        desc: "Easily convert any video link directly to high-quality audio files.",
        icon: <RefreshCcw size={24} />,
    },
    {
        title: "Safe & Secure",
        desc: "No software installation required. Secure browser-based tool.",
        icon: <Shield size={24} />,
    },
    {
        title: "Universal Support",
        desc: "Works perfectly with TikTok, Instagram, YouTube, and many more.",
        icon: <Smartphone size={24} />,
    },
    {
        title: "Watermark Free",
        desc: "Get clean TikTok videos without original app watermarks.",
        icon: <Image size={24} />,
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Premium Features</h2>
                <p className="text-text-secondary max-w-xl mx-auto font-medium">Why millions of users choose ClipGrab Pro for their video needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-morphism p-10 rounded-[32px] border border-white/5 space-y-6 hover:bg-white/5 transition-colors group"
                    >
                        <div className="w-14 h-14 bg-main-gradient rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
