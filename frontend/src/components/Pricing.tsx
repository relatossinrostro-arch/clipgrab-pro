"use client";

import { Check, Zap, Shield, Crown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Standard downloading for everyone",
            features: ["Ads included", "Standard speed", "Daily download limits", "720p Max quality", "Standard processing"],
            button: "Current Plan",
            premium: false,
        },
        {
            name: "Pro",
            price: "$9",
            period: "/month",
            description: "Ultimate power for creators",
            features: ["Zero ads", "Unlimited downloads", "Batch extraction", "4K Ultra HD support", "High-speed servers", "Priority support"],
            button: "Start Pro Trial",
            premium: true,
        }
    ];

    return (
        <section id="pricing" className="max-w-7xl mx-auto py-32 px-6 space-y-20">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Flexible Plans</h2>
                <p className="text-text-secondary max-w-xl mx-auto font-medium">Choose the perfect tier for your content needs.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`glass-morphism p-12 relative flex flex-col gap-10 rounded-[40px] border-white/5 transition-all duration-500 hover:border-primary/30 ${plan.premium ? 'shadow-2xl shadow-primary/10' : ''}`}
                    >
                        {plan.premium && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-main-gradient text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/40">
                                <Crown size={12} />
                                Most Popular
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                                <div className={`p-2 rounded-xl bg-white/5 ${plan.premium ? 'text-primary' : 'text-text-secondary'}`}>
                                    {plan.premium ? <Zap size={20} className="fill-primary" /> : <Shield size={20} />}
                                </div>
                            </div>
                            <p className="text-text-secondary text-sm font-medium">{plan.description}</p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                            {plan.period && <span className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">{plan.period}</span>}
                        </div>

                        <div className="space-y-5 flex-1">
                            {plan.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-4 text-xs font-bold text-text-secondary tracking-wide">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border border-white/5 ${plan.premium ? 'bg-primary/10 text-primary' : 'bg-white/5 text-text-secondary'}`}>
                                        <Check size={12} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group ${plan.premium ? 'premium-button' : 'glass border-white/10 hover:bg-white/5'}`}>
                            <span>{plan.button}</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
