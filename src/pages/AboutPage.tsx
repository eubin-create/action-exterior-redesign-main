import { Layout } from "@/components/layout/Layout";
import { Shield, Zap, Search, Users, Trophy, Target } from "lucide-react";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";

export default function AboutPage() {
    return (
        <Layout>
            {/* Aggressive Branding Hero */}
            <section className="relative py-32 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent/20" />
                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-1 bg-accent font-black text-xs uppercase tracking-[0.3em] mb-6 shadow-lg">
                            Our Philosophy
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter mb-8 leading-[0.85]">
                            The Brutal Truth <br />
                            <span className="text-accent italic">About Roofing.</span>
                        </h1>
                        <p className="text-2xl text-gray-300 leading-relaxed font-bold max-w-2xl border-l-4 border-accent pl-8">
                            Houston has 800+ roofing contractors. Most are playing the same game: door-knocking, price wars, and razor-thin margins. We decided to build a better way.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Differentiator */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-black text-primary font-display uppercase tracking-tight">
                                Why We Win (And Why You Join Us)
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The roofing industry is plagued by predatory sales tactics and fake estimates. Homeowners don't trust contractors because the process is built to trick them.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: Zap, title: "Fully Virtual", text: "We close deals without ever stepping on your roof before the contract. Precision aerial imagery makes this possible." },
                                    { icon: Shield, title: "Radical Transparency", text: "No ambush sales. No bait-and-switch. The price we quote is the price you pay." },
                                    { icon: Target, title: "Data-First", text: "We deliver professional proposals in 45 minutes using military-grade measurements." }
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-primary italic uppercase">{item.title}</h4>
                                            <p className="text-muted-foreground">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/5 rounded-2xl -rotate-2 scale-105" />
                            <div className="relative bg-secondary p-12 rounded-2xl border-2 border-primary/10 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-48 h-48 text-primary" />
                                </div>
                                <h3 className="text-3xl font-black text-primary mb-6 font-display italic uppercase">Our Competitive Edge</h3>
                                <p className="text-primary/80 font-bold mb-6 italic text-xl">
                                    "We are NOT a roofing company. We are a virtual sales platform that coordinates premium roof installations."
                                </p>
                                <ul className="space-y-4 text-primary/70 font-semibold">
                                    <li>✓ No crews = No payroll headaches</li>
                                    <li>✓ No trucks = Low overhead</li>
                                    <li>✓ Virtual sales = 4x efficiency</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Partners */}
            <section className="py-24 bg-secondary">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-5xl font-black text-primary font-display uppercase tracking-tight">
                            The Powerhouse Duo
                        </h2>
                        <p className="text-xl text-muted-foreground font-medium italic">
                            Merging sales expertise with marketing automation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Michael */}
                        <div className="group relative">
                            <div className="absolute -inset-2 bg-gradient-to-b from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/5">
                                <div className="h-64 bg-primary flex items-center justify-center overflow-hidden">
                                    <Users className="w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-3xl font-black text-primary mb-1 uppercase tracking-tight">Michael Gevara</h3>
                                    <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">Sales & Operations</span>
                                    <p className="mt-6 text-muted-foreground font-medium leading-relaxed">
                                        The heartbeat of every project. Michael handles virtual consultations, subcontractor vetting, and quality control. He ensures the "Cowboy Standard" is met on every shingle.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Eubin */}
                        <div className="group relative">
                            <div className="absolute -inset-2 bg-gradient-to-b from-accent to-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/5">
                                <div className="h-64 bg-accent flex items-center justify-center overflow-hidden">
                                    <Users className="w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-3xl font-black text-primary mb-1 uppercase tracking-tight">Eubin Kim</h3>
                                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">Marketing & Systems</span>
                                    <p className="mt-6 text-muted-foreground font-medium leading-relaxed">
                                        The architect of the engine. Eubin manages the digital funnel, marketing automation, and aerial tech integrations that make our 45-minute estimate promise a reality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StatsSection />

            <CTASection />
        </Layout>
    );
}
