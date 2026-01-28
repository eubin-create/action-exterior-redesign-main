import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
    {
        name: "Good",
        subtitle: "Professional Protection",
        price: "From $199/mo",
        description: "Reliable architectural shingle system. $0 Down Available.",
        features: [
            "CertainTeed Landmark Shingles",
            "25-Year Manufacturer Warranty",
            "5-Year Workmanship Warranty",
            "Standard Attic Ventilation",
            "Synthetic Underlayment",
        ],
        action: "Get Good Quote",
        popular: false,
        color: "bg-white",
    },
    {
        name: "Better",
        subtitle: "Impact Resistant System",
        price: "From $249/mo",
        description: "The Smartest Choice for Texas storms. $0 Down Financing.",
        features: [
            "Class 3 or 4 Impact Resistant Shingles",
            "Insurance Premium Discounts",
            "50-Year Manufacturer Warranty",
            "10-Year Workmanship Warranty",
            "Enhanced Ridge Ventilation",
            "Ice & Water Shield in Valleys",
        ],
        action: "Cowboy's Choice",
        popular: true,
        color: "bg-[#0a2240]/5",
    },
    {
        name: "Forever",
        subtitle: "Luxury / Lifetime Metal",
        price: "From $399/mo",
        description: "The last roof you'll ever buy. $0 Down / 144 Months.",
        features: [
            "Standing Seam Metal or Luxury Stone",
            "Lifetime Non-Prorated Warranty",
            "Highest Hail & Wind Resistance",
            "Premium Thermal Ventilation",
            "Maximized Home Resale Value",
            "Priority White-Glove Scheduling",
        ],
        action: "Get Forever Quote",
        popular: false,
        color: "bg-white",
    },
];

export function ServicesSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden" id="pricing">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a2240] via-[#b3191d] to-[#0a2240]" />
            <div className="container relative z-10 px-4">
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6 animate-fade-in">
                    <Badge className="bg-[#0a2240] hover:bg-[#0a2240] text-white font-black px-6 py-2 uppercase tracking-[0.2em] rounded-none">
                        Transparent Pricing
                    </Badge>
                    <h2 className="text-5xl md:text-7xl font-black font-display text-[#0a2240] uppercase tracking-tighter">
                        Good, Better, <span className="text-[#b3191d] italic">Forever.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                        The smartest way to buy a roof in Texas. Choose your level of protection and see your estimate instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                    {tiers.map((tier) => (
                        <Card
                            key={tier.name}
                            className={`relative flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(10,34,64,0.15)] border-2 ${tier.popular ? "border-[#b3191d] shadow-2xl md:scale-105 z-20" : "border-primary/10 shadow-sm"} rounded-2xl overflow-hidden group`}
                        >
                            {tier.popular && (
                                <div className="bg-[#b3191d] text-white px-5 py-2 font-black text-[10px] uppercase tracking-widest shadow-lg italic">
                                    Cowboy's Choice
                                </div>
                            )}

                            <CardHeader className={`${tier.color} p-10 border-b border-primary/5 relative`}>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-black font-display text-[#0a2240] uppercase tracking-tight">{tier.name}</h3>
                                    <p className="text-[10px] font-black text-[#b3191d] uppercase tracking-[0.2em]">{tier.subtitle}</p>
                                </div>
                                <div className="mt-8 flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-[#0a2240] font-display tracking-tighter italic">{tier.price}</span>
                                </div>
                                <CardDescription className="mt-6 text-sm font-bold text-primary/60 leading-relaxed uppercase tracking-wide">
                                    {tier.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="bg-white flex-1 p-10">
                                <ul className="space-y-6">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#b3191d]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#b3191d]/20">
                                                <Check className="w-3.5 h-3.5 text-[#b3191d] font-black" />
                                            </div>
                                            <span className="text-sm font-bold text-[#0a2240] italic leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="bg-muted/30 p-10 border-t border-primary/5">
                                <Button
                                    className={`w-full text-lg h-16 font-black uppercase tracking-widest group-hover:scale-[1.02] transition-all ${tier.popular ? "bg-[#b3191d] hover:bg-[#8b1316] text-white shadow-xl shadow-red-900/20" : "bg-[#0a2240] hover:bg-[#0a2240]/95 text-white shadow-lg"}`}
                                    asChild
                                >
                                    <Link to="/contact" className="gap-2">
                                        {tier.action}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center bg-[#0a2240] p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12" />
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#b3191d] flex items-center justify-center shadow-lg shadow-[#b3191d]/40">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black font-display uppercase tracking-tight italic">Standard In Every Quote</span>
                        </div>
                        <p className="text-gray-300 font-bold max-w-xl text-left border-l border-white/20 pl-8">
                            Complete tear-off, decking inspection, ice & water shield, pipe boot replacement, and magnet sweep. No hidden fees. Just quality.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
