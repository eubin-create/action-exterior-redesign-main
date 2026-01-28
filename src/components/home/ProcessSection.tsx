import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScanSearch, FileCheck2, Hammer, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: ScanSearch,
        title: "1. Precision Analysis",
        description: "We skip the ladder and use the same aerial technology as insurance adjusters to measure your roof down to the inch."
    },
    {
        icon: FileCheck2,
        title: "2. Transparency First",
        description: "Review a clear, line-itemed proposal over a quick Zoom call. We explain Good, Better, and Best options simply."
    },
    {
        icon: Hammer,
        title: "3. Stress-Free Install",
        description: "Licensed local crews, daily photo updates, and a spotless cleanup. You don't pay the balance until you're happy."
    }
];

export function ProcessSection() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display uppercase tracking-tight">
                        A New Roof Without the <span className="text-primary italic">Headache</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We've reimagined the roofing experience to be respectful of your time and space.
                        No more waiting around for 4-hour appointment windows.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-muted/0 via-muted to-muted/0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg hover:border-accent/20 transition-all duration-300 h-full flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative bg-white shadow-inner">
                                    <step.icon className="w-10 h-10 text-primary" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3 font-display uppercase tracking-tight">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="text-lg px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow" asChild>
                        <Link to="/contact" className="gap-2">
                            Start Your Free Estimate <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">
                        No credit card required • Takes less than 2 minutes
                    </p>
                </div>
            </div>
        </section>
    );
}
