"use client";

import { useEffect, useState } from "react";
import { History, Trash2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DownloadHistory() {
    const [history, setHistory] = useState<any[]>([]);

    const updateHistory = () => {
        const savedHistory = localStorage.getItem("download_history");
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    };

    useEffect(() => {
        updateHistory();
        window.addEventListener("storage_update", updateHistory);
        return () => window.removeEventListener("storage_update", updateHistory);
    }, []);

    const clearHistory = () => {
        localStorage.removeItem("download_history");
        setHistory([]);
    };

    if (history.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto py-24 px-6 space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                        <History size={24} className="text-primary" />
                        Recent Downloads
                    </h3>
                    <p className="text-xs text-text-secondary font-medium uppercase tracking-widest pl-9">Your private session history</p>
                </div>
                <button
                    onClick={clearHistory}
                    className="glass-morphism py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-red-500 transition-all flex items-center gap-2"
                >
                    <Trash2 size={12} />
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {history.map((item, i) => (
                        <motion.div
                            key={`${item.title}-${i}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-morphism p-5 flex flex-col gap-4 group hover:border-primary/30 transition-all cursor-default"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden">
                                <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                <div className="absolute top-2 right-2 glass p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap size={12} className="text-primary fill-primary" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black line-clamp-1">{item.title}</p>
                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{item.platform}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
