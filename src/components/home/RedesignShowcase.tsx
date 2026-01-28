import { useState } from "react";
import beforeImage from "@/assets/house-before.png";
import afterImage from "@/assets/house-after.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RedesignShowcase() {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, x)));
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, x)));
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                        Transformation Showcase
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-display uppercase tracking-tight">
                        The Cowboy <span className="text-primary">Difference</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Swipe or move your mouse over the image to see how we transformed this home's exterior with a complete renovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <div
                            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
                            onMouseMove={handleMouseMove}
                            onTouchMove={handleTouchMove}
                        >
                            {/* After Image (Background) */}
                            <img
                                src={afterImage}
                                alt="After Redesign"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Before Image (Foreground with Clip Path) */}
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <img
                                    src={beforeImage}
                                    alt="Before Redesign"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Slider Handle */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-3 bg-primary/30 rounded-full" />
                                        <div className="w-1 h-3 bg-primary/30 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg text-white text-sm font-bold pointer-events-none">
                                BEFORE
                            </div>
                            <div className="absolute bottom-6 right-6 px-4 py-2 bg-accent/80 backdrop-blur-md rounded-lg text-white text-sm font-bold pointer-events-none">
                                AFTER
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-foreground">Complete Renovation</h3>
                            <p className="text-muted-foreground">
                                This project involved a full exterior redesign including:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Premium Architectural Shingles",
                                    "Modern Charcoal Siding",
                                    "Energy-Efficient Windows",
                                    "Stunning Wood Accents"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 bg-secondary/50 rounded-xl border border-secondary">
                            <p className="font-bold text-foreground mb-4">Ready for your transformation?</p>
                            <Button className="w-full" asChild>
                                <Link to="/contact">Get a Free Quote</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
