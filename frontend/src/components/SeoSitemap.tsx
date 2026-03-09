"use client";

import { allSeoPages } from "../lib/seo-data";

export function SeoSitemap() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-t border-white/5">
            <div className="space-y-4">
                <h3 className="text-2xl font-black">Browse All Tools</h3>
                <p className="text-text-secondary text-sm font-medium">Over 500 specialized downloading tools for every platform and quality.</p>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allSeoPages.map(page => (
                    <li key={page.slug}>
                        <a href={`/${page.slug}`} className="text-[11px] font-bold text-text-secondary hover:text-white transition-colors">
                            {page.title}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
