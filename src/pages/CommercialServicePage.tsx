import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, Building2, FileText, HardHat } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { CTASection } from "@/components/home/CTASection";
import { commercialServices } from "@/data/commercialServices";


interface ServiceData {
    title: string;
    description: string;
    fullDescription: string;
    image: string;
    icon: React.ElementType;
    features: string[];
    benefits: { title: string; description: string; }[];
    process?: { title: string; description: string; }[];
}

export default function CommercialServicePage() {
    const { serviceSlug } = useParams<{ serviceSlug: string }>();
    const service = commercialServices[serviceSlug as keyof typeof commercialServices] as ServiceData | undefined;

    if (!service) {
        return (
            <Layout>
                <Helmet><title>Commercial Service Not Found</title></Helmet>
                <div className="container py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Button asChild>
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Helmet>
                <title>{service.title} | Commercial Roofing Houston</title>
                <meta name="description" content={service.description} />
            </Helmet>

            {/* Hero */}
            <section
                className="relative py-24 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
            >
                <div className="absolute inset-0 bg-overlay-gradient opacity-90" />
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 mb-4 backdrop-blur-md">
                            <Building2 className="w-4 h-4 text-accent" />
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                Commercial Division
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-2 mb-6 font-display uppercase tracking-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button variant="hero" size="lg" asChild>
                                <Link to="/contact">Request Commercial Proposal</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                                <Link to="tel:+15551234567">Call (555) 123-4567</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-background">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground font-display uppercase tracking-tight mb-4">
                                    Built for Business
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {service.fullDescription}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg">{benefit.title}</h3>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="cta" size="lg" asChild>
                                <Link to="/contact">Schedule Site Assessment</Link>
                            </Button>
                        </div>

                        <div className="space-y-8">
                            {/* Features Card */}
                            <div className="bg-secondary rounded-xl p-8 border border-border">
                                <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase tracking-tight flex items-center gap-2">
                                    <HardHat className="w-5 h-5 text-accent" />
                                    Key Capabilities
                                </h3>
                                <ul className="grid gap-4">
                                    {service.features.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border/50">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            <span className="font-medium text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Process Card */}
                            <div className="bg-primary text-primary-foreground rounded-xl p-8">
                                <h3 className="text-xl font-bold mb-6 font-display uppercase tracking-tight flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-accent" />
                                    Our Process
                                </h3>
                                <div className="space-y-6">
                                    {service.process && service.process.map((step, index) => (
                                        <div key={index} className="relative pl-8 border-l border-primary-foreground/20 last:border-0 pb-6 last:pb-0">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent" />
                                            <h4 className="font-bold text-lg">{step.title}</h4>
                                            <p className="text-primary-foreground/70 text-sm mt-1">{step.description}</p>
                                        </div>
                                    ))}
                                    {!service.process && (
                                        <p className="text-primary-foreground/70">Contact us for a detailed project roadmap customized to your facility's needs.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </Layout>
    );
}
