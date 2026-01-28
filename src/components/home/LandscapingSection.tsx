import { TreeDeciduous, Palmtree, Hammer, Flame, UtensilsCrossed, Check } from "lucide-react";
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

const landscapingServices = [
    {
        title: "Masterful Hardscapes",
        subtitle: "Built to Last",
        description: "Transform your yard with high-end stone patios, custom fire pits, and structural retaining walls designed for the Texas climate.",
        features: [
            "Custom Stone Patios & Walkways",
            "Designer Fire Pits & Seating",
            "Structural Retaining Walls",
            "Professional Exterior Lighting",
            "Natural Stone & Paver Options"
        ],
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1558905619-79f493068c83?q=80&w=800&auto=format&fit=crop", // Hardscape placeholder
        action: "Design Your Patio",
    },
    {
        title: "Premium Softscapes",
        subtitle: "Lush & Sustainable",
        description: "Year-round beauty with premium artificial turf and native Texas plantings that thrive with minimal maintenance.",
        features: [
            "Luxury Artificial Turf Install",
            "Native Texas Xeriscaping",
            "Smart Irrigation Systems",
            "Privacy Tree Installation",
            "Low-Maintenance Gardening"
        ],
        icon: TreeDeciduous,
        image: "https://images.unsplash.com/photo-1592150621344-82d67bdb19ca?q=80&w=800&auto=format&fit=crop", // Turf/Greenery placeholder
        action: "Green Your Space",
    },
    {
        title: "Outdoor Living",
        subtitle: "Gourmet Exteriors",
        description: "The ultimate entertainment hub with custom outdoor kitchens, gourmet grills, and designer pergolas.",
        features: [
            "Custom Outdoor Kitchens",
            "Designer Pergolas & Pavilions",
            "Built-in Gourmet Grills",
            "Outdoor Bars & Island Units",
            "Weather-Proof Entertainment"
        ],
        icon: UtensilsCrossed,
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop", // Outdoor kitchen placeholder
        action: "Build Your Kitchen",
    }
];

export function LandscapingSection() {
    return (
        <section className="py-32 bg-[#0a2240]/5 relative overflow-hidden" id="landscaping">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b3191d]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0a2240]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container relative z-10 px-4">
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6 animate-fade-in">
                    <Badge className="bg-[#b3191d] hover:bg-[#b3191d] text-white font-black px-6 py-2 uppercase tracking-[0.2em] rounded-none">
                        Exterior Excellence
                    </Badge>
                    <h2 className="text-5xl md:text-7xl font-black font-display text-[#0a2240] uppercase tracking-tighter">
                        Landscaping & <span className="text-[#b3191d] italic text-4xl md:text-6xl block mt-2">Outdoor Living</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                        We don't just fix roofs. We create destinations. From professional hardscapes to lush, maintenance-free turf.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {landscapingServices.map((service, index) => (
                        <Card
                            key={index}
                            className="group relative flex flex-col h-full overflow-hidden border-2 border-primary/10 hover:border-[#b3191d]/30 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(10,34,64,0.12)] rounded-2xl bg-white"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2240]/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#b3191d] rounded-xl flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">{service.title}</h3>
                                        <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">{service.subtitle}</p>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-8 flex-1">
                                <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-wide mb-8">
                                    {service.description}
                                </p>
                                <ul className="space-y-4">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-[#b3191d] mt-1 shrink-0" />
                                            <span className="text-sm font-bold text-[#0a2240] italic">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="p-8 pt-0">
                                <Button
                                    className="w-full h-14 bg-white hover:bg-[#0a2240] text-[#0a2240] hover:text-white border-2 border-[#0a2240] font-black uppercase tracking-widest transition-all group-hover:bg-[#0a2240] group-hover:text-white"
                                    asChild
                                >
                                    <Link to="/contact">
                                        {service.action}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button
                        className="bg-[#b3191d] hover:bg-[#8b1316] text-white text-xl px-12 h-20 font-black uppercase tracking-widest rounded-none shadow-2xl shadow-red-900/40 hover:scale-105 transition-all"
                        asChild
                    >
                        <Link to="/contact">
                            Schedule a Landscaping Consultation
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
