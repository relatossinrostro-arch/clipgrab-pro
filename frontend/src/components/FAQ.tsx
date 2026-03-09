"use client";

import { HelpCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "Is ClipGrab Pro completely free?", a: "Yes, our universal downloader is free to use. Our Pro plan offers unlimited 4K downloads, higher processing speeds, and a zero-ads experience." },
        { q: "Which platforms are supported?", a: "We support TikTok (no watermark), Instagram (Reels & Stories), YouTube, Facebook, Twitter, Reddit, Pinterest, and Vimeo." },
        { q: "Can I extract high-quality audio?", a: "Absolutely. Our tool allows you to convert any video source directly to high-quality MP3 audio files with one click." },
        { q: "Is it safe to use ClipGrab Pro?", a: "Security is our priority. ClipGrab Pro is a 100% cloud-based tool and does not require any local software or extensions installation." },
    ];

    return (
        <section id="faq" className="max-w-4xl mx-auto py-32 px-6 space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Support FAQ</h2>
                <p className="text-text-secondary max-w-xl mx-auto font-medium">Everything you need to know about the platform.</p>
            </div>

            <div className="space-y-4 text-left">
                {faqs.map((item, i) => (
                    <div key={i} className="glass-morphism overflow-hidden rounded-[32px] border-white/5">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-8 flex items-center justify-between text-left group hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <HelpCircle size={20} />
                                </div>
                                <h4 className="font-bold text-lg">{item.q}</h4>
                            </div>
                            <ChevronDown
                                className={`text-text-secondary transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : ''}`}
                                size={20}
                            />
                        </button>
                        <motion.div
                            initial={false}
                            animate={{ height: openIndex === i ? "auto" : 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-8 pt-0 pl-[72px] text-text-secondary leading-relaxed font-medium">
                                {item.a}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
