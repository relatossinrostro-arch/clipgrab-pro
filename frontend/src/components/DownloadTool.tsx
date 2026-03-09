"use client";

import React, { useState } from "react";
import {
    Download,
    Link as LinkIcon,
    Loader2,
    Play,
    Clock,
    User,
    FileVideo,
    Music,
    ChevronRight,
    CheckCircle2,
    ExternalLink,
    AlertCircle
} from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE, analyzeVideo } from "../lib/api";

// TikTok SVG Icon for Branding
const TikTokIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
);

interface VideoFormat {
    format_id: string;
    extension: string;
    height: number;
    filesize: number;
    note: string;
}

interface VideoMetadata {
    title: string;
    thumbnail: string;
    duration: number;
    uploader: string;
    platform: string;
    is_playlist: boolean;
    formats: VideoFormat[];
}

export function DownloadTool() {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
    const [loading, setLoading] = useState(false);
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [error, setError] = useState("");

    const saveToHistory = (data: VideoMetadata) => {
        const history = JSON.parse(localStorage.getItem("download_history") || "[]");
        const newItem = { title: data.title, thumbnail: data.thumbnail, platform: data.platform, timestamp: Date.now() };
        const updatedHistory = [newItem, ...history.filter((i: any) => i.title !== data.title)].slice(0, 10);
        localStorage.setItem("download_history", JSON.stringify(updatedHistory));
        window.dispatchEvent(new Event("storage_update"));
    };

    const handleAnalyze = async () => {
        if (!url) return;
        setLoading(true);
        setStatus("idle");
        setMetadata(null);
        setError("");

        try {
            const data = await analyzeVideo(url);
            setMetadata(data);
            setStatus("ready");
            saveToHistory(data);
        } catch (err: any) {
            const errorMessage = err instanceof Error ? err.message : err.toString();
            // If the error message is too generic, provide the fallback explicitly, 
            // otherwise prepend our prefix to the real backend error.
            if (!errorMessage || errorMessage === "Unable to analyze video") {
                setError("No se pudo analizar este enlace. Intenta con otro video.");
            } else {
                setError(`No se pudo analizar este video: ${errorMessage}`);
            }
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (type: 'video' | 'audio', formatLabel?: string) => {
        try {
            const endpoint = type === 'video' ? 'download' : 'audio';
            const queryUrl = encodeURIComponent(url);
            const queryFormat = formatLabel ? `&format=${encodeURIComponent(formatLabel)}` : '';
            window.open(`${API_BASE}/${endpoint}?url=${queryUrl}${queryFormat}`, "_blank");
        } catch (err: any) {
            setError(err.message || `Unable to start ${type} download`);
            setStatus("error");
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12">
            <div className="glass-morphism p-3 rounded-[32px] flex flex-col md:flex-row gap-3 shadow-2xl shadow-indigo-500/10 border-white/5 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[34px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex-1 group">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
                        <LinkIcon size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Paste any link: TikTok, Reels, YouTube..."
                        className="w-full bg-white/5 border border-white/5 focus:border-primary/30 rounded-[24px] py-6 pl-16 pr-8 text-lg font-medium placeholder:text-text-secondary/40 outline-none transition-all"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={loading || !url}
                    className="premium-button min-w-[220px] relative overflow-hidden group/btn"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="font-black uppercase tracking-widest text-sm">Analyze Video</span>
                            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    )}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {status === "error" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 text-center font-bold text-sm tracking-wide">
                        <AlertCircle className="inline-block mr-2" size={18} />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {status === "ready" && metadata && (
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="glass-morphism rounded-[40px] overflow-hidden border-white/5 shadow-3xl">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-[480px] relative aspect-video lg:aspect-auto group/preview">
                                <img src={metadata.thumbnail} className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-700" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                                    <div className="w-20 h-20 glass rounded-full flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300">
                                        <Play size={40} className="text-white fill-white ml-2" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all",
                                        metadata.platform === 'TikTok' ? "bg-[#ff0050] scale-110 shadow-[#ff0050]/20" : "bg-primary/20 shadow-primary/20"
                                    )}>
                                        {metadata.platform === 'TikTok' ? <TikTokIcon /> : <ExternalLink size={16} className="text-primary" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none text-white/40">Broadcasting on</p>
                                        <p className="text-xs font-black uppercase tracking-widest leading-none">{metadata.platform}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 flex-1 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black leading-tight tracking-tight">{metadata.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-text-secondary uppercase tracking-[0.15em]">
                                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            <User size={14} className="text-primary" />
                                            <span>{metadata.uploader}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            <Clock size={14} className="text-primary" />
                                            <span>{Math.floor(metadata.duration / 60)}:{String(metadata.duration % 60).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        <span className="text-xs font-black uppercase tracking-[0.1em] text-white/40">Select Download Format</span>
                                    </div>

                                    <div className="space-y-6">
                                        {metadata.platform === 'TikTok' && (
                                            <button
                                                onClick={() => handleDownload('video', 'best')}
                                                className="w-full bg-[#ff0050] hover:bg-[#ff0050]/90 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#ff0050]/30 hover:shadow-[#ff0050]/40 group border-t border-white/20 active:scale-[0.98]"
                                            >
                                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                    <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                                                </div>
                                                <span className="text-lg tracking-tight">Download TikTok Video (No Watermark)</span>
                                            </button>
                                        )}

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            {metadata.formats.filter(f => f.height).slice(0, 3).map((f) => (
                                                <button
                                                    key={f.format_id}
                                                    onClick={() => handleDownload('video', `${f.height}p`)}
                                                    className="glass-morphism p-5 rounded-3xl hover:border-primary/50 hover:bg-white/5 transition-all text-center space-y-3 group"
                                                >
                                                    <FileVideo size={20} className="mx-auto text-text-secondary group-hover:text-primary transition-colors" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-black">{f.height}p</p>
                                                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">
                                                            {metadata.platform === 'TikTok' ? 'No Watermark' : f.extension}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handleDownload('audio')}
                                                className="glass-morphism p-5 rounded-3xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-center space-y-3 group"
                                            >
                                                <Music size={20} className="mx-auto text-primary" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black">MP3 Audio</p>
                                                    <p className="text-[10px] uppercase font-bold text-primary tracking-widest">320kbps</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
