import { ShieldAlert, FileText, Search, Coins, HeartHandshake, Zap } from "lucide-react";

const trustPoints = [
    {
        icon: Zap,
        title: "No Ambush Sales",
        description: "We provide upfront pricing on our website. No 'let me call my manager' games.",
        color: "text-accent"
    },
    {
        icon: Search,
        title: "No-Climb Inspection",
        description: "Military-grade satellite measurement means we don't need to walk on your roof to quote it.",
        color: "text-primary"
    },
    {
        icon: FileText,
        title: "Exact Proposals",
        description: "Detailed line-item breakdowns. No surprise 'add-ons' halfway through the job.",
        color: "text-accent"
    },
    {
        icon: HeartHandshake,
        title: "Education Over Ego",
        description: "We teach you how to buy a roof, even if you don't buy it from us. Zero pressure.",
        color: "text-primary"
    },
    {
        icon: Coins,
        title: "Value First",
        description: "Tiered Good/Better/Best options so you can choose the protection that fits your budget.",
        color: "text-accent"
    },
    {
        icon: ShieldAlert,
        title: "Radical Honesty",
        description: "If you only need a $500 repair, we won't try to sell you a $15,000 roof replacement.",
        color: "text-primary"
    }
];

export function TrustBuilders() {
    return (
        <section className="py-24 bg-[#f8f9fa] border-y border-primary/5">
            <div className="container px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-primary font-display uppercase tracking-tight">
                        The <span className="text-accent underline decoration-4 underline-offset-4">Cowboy</span> Standard.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        Most roofers play a game of hide-the-price. We play a game of radical transparency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trustPoints.map((point) => (
                        <div
                            key={point.title}
                            className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5 group hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary transition-colors">
                                <point.icon className={`w-7 h-7 ${point.color} group-hover:text-white transition-colors`} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3 font-display uppercase tracking-tight">{point.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
