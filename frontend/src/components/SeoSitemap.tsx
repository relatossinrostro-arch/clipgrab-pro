"use client";

import { generateSeoSlugs } from "@/lib/seo-data";

export function SeoSitemap() {
    const slugs = generateSeoSlugs();

    // Group by platform for better organization
    const groupedLinks: Record<string, string[]> = {};
    slugs.forEach(slug => {
        const platform = slug.split("-")[0];
        if (!groupedLinks[platform]) groupedLinks[platform] = [];
        groupedLinks[platform].push(slug);
    });

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-t border-white/5">
            <div className="space-y-4">
                <h3 className="text-2xl font-black">Browse All Tools</h3>
                <p className="text-text-secondary text-sm font-medium">Over 500 specialized downloading tools for every platform and quality.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
                {Object.entries(groupedLinks).map(([platform, links]) => (
                    <div key={platform} className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{platform}</h4>
                        <ul className="space-y-2">
                            {links.slice(0, 10).map(slug => (
                                <li key={slug}>
                                    <a
                                        href={`/${slug}`}
                                        className="text-[11px] font-bold text-text-secondary hover:text-white transition-colors capitalize"
                                    >
                                        {slug.replace(/-/g, " ")}
                                    </a>
                                </li>
                            ))}
                            {links.length > 10 && (
                                <li className="text-[10px] font-black text-primary uppercase tracking-widest pt-2">
                                    + {links.length - 10} more
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
