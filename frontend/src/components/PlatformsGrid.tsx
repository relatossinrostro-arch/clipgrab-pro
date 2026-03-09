"use client";

import { motion } from "framer-motion";
import { Download, Instagram, Facebook, Youtube, Twitter, Play, Pin, Video } from "lucide-react";
import Link from "next/link";

const platforms = [
    { name: "TikTok", icon: <Video size={24} />, color: "hover:text-[#ff0050]", slug: "tiktok-video-downloader" },
    { name: "Instagram", icon: <Instagram size={24} />, color: "hover:text-[#e1306c]", slug: "instagram-video-downloader" },
    { name: "YouTube", icon: <Youtube size={24} />, color: "hover:text-[#ff0000]", slug: "youtube-video-downloader" },
    { name: "Facebook", icon: <Facebook size={24} />, color: "hover:text-[#1877f2]", slug: "facebook-video-downloader" },
    { name: "Twitter / X", icon: <Twitter size={24} />, color: "hover:text-[#1da1f2]", slug: "twitter-video-downloader" },
    { name: "Reddit", icon: <Play size={24} />, color: "hover:text-[#ff4500]", slug: "reddit-video-downloader" },
    { name: "Pinterest", icon: <Pin size={24} />, color: "hover:text-[#bd081c]", slug: "pinterest-video-downloader" },
    { name: "Vimeo", icon: <Video size={24} />, color: "hover:text-[#1ab7ea]", slug: "vimeo-video-downloader" },
];

export function PlatformsGrid() {
    return (
        <section id="platforms" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Supported Platforms</h2>
                <p className="text-text-secondary max-w-xl mx-auto font-medium">Download high-quality content from almost any video hosting service.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {platforms.map((platform, i) => (
                    <Link key={platform.name} href={`/${platform.slug}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`glass-morphism h-full p-10 flex flex-col items-center justify-center gap-6 cursor-pointer group transition-all duration-500 rounded-3xl ${platform.color} border border-white/5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10`}
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                {platform.icon}
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] group-hover:text-text-primary transition-colors">
                                {platform.name}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
