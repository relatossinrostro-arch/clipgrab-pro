"use client";

import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-8">
            <nav className="max-w-7xl mx-auto glass-morphism rounded-3xl px-8 py-4 flex items-center justify-between shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-main-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Download size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-black bg-clip-text text-transparent bg-main-gradient tracking-tight">ClipGrab Pro</span>
                </div>

                <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary">
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                    <a href="/platforms" className="hover:text-primary transition-colors">Platforms</a>
                    <a href="/features" className="hover:text-primary transition-colors">Features</a>
                    <a href="/extension" className="hover:text-primary transition-colors">Extension</a>
                    <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
                </div>

                <button className="premium-button !py-3 !px-6 text-xs uppercase tracking-widest font-black">
                    <span>Download Video</span>
                    <ChevronRight size={14} />
                </button>
            </nav>
        </header>
    );
}
