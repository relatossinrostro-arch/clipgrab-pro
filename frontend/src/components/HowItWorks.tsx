"use client";

import { motion } from "framer-motion";
import { Link2, Search, Download } from "lucide-react";

const steps = [
    {
        title: "Paste URL",
        desc: "Copy the link of the video you want to download and paste it into our tool.",
        icon: <Link2 size={24} />,
    },
    {
        title: "Analyze",
        desc: "Click analyze and wait a second while we fetch the best quality formats.",
        icon: <Search size={24} />,
    },
    {
        title: "Download",
        desc: "Select your desired quality and download instantly to your device.",
        icon: <Download size={24} />,
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">How It Works</h2>
                <p className="text-text-secondary max-w-xl mx-auto font-medium">Three simple steps to download any video for free.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center space-y-8 relative z-10"
                    >
                        <div className="w-24 h-24 glass rounded-full flex items-center justify-center border-white/5 relative bg-background-secondary shadow-2xl">
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-main-gradient rounded-full flex items-center justify-center text-white text-[10px] font-black">
                                0{i + 1}
                            </div>
                            <div className="text-primary">{step.icon}</div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed max-w-[280px]">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
