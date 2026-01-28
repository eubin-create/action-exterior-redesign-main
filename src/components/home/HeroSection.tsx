import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-roofing.jpg";
import { CheckCircle2, ShieldCheck, Clock, Award, ArrowDown } from "lucide-react";
import { EstimateCalculator } from "@/components/home/EstimateCalculator";

const neighborhoods = [
  "Houston",
  "River Oaks",
  "The Heights",
  "Memorial",
  "West University",
  "Bellaire",
  "Katy",
  "Sugar Land",
  "Pearland",
  "The Woodlands",
  "Spring"
];

export function HeroSection() {
  const [neighborhoodIndex, setNeighborhoodIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setNeighborhoodIndex((prev) => (prev + 1) % neighborhoods.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-20 overflow-hidden bg-primary">
      {/* Background with Dark Branding Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110 motion-safe:animate-slow-zoom"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2240]/95 via-[#0a2240]/85 to-[#0a2240]/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-accent/20 rounded-full backdrop-blur-md border border-accent/30 border-l-4 border-l-accent">
              <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></span>
              <span className="text-white text-sm font-black uppercase tracking-widest">
                Serving Houston's Best Neighborhoods
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-display uppercase tracking-tighter drop-shadow-2xl">
              The Easiest Roof <br />
              Replacement in <br />
              <span className={`text-accent italic transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0 underline decoration-8 decoration-accent/30 underline-offset-8"}`}>
                {neighborhoods[neighborhoodIndex]}.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium max-w-2xl drop-shadow-md">
              Skip the sales pressure. Get a precision aerial estimate in 45 minutes—without anyone climbing on your roof.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex flex-col gap-4">
                {[
                  "No-Climb Virtual Estimates",
                  "Insurance Software Precision",
                  "Zero Down Financing Available"
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40 group-hover:bg-accent transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-accent group-hover:text-white" />
                    </div>
                    <span className="text-lg text-white font-bold drop-shadow-sm">{point}</span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:flex flex-col gap-6 pl-8 border-l border-white/10">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10 text-accent/80" />
                  <div className="text-white/80">
                    <p className="font-black text-xl leading-none">LICENSED</p>
                    <p className="text-[10px] tracking-widest font-bold opacity-70">TEXAS ROOFING</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10 text-accent/80" />
                  <div className="text-white/80">
                    <p className="font-black text-xl leading-none">5-STAR</p>
                    <p className="text-[10px] tracking-widest font-bold opacity-70">HOUSTON GOOGLE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 animate-bounce">
              <ArrowDown className="text-white/40 w-8 h-8" />
            </div>
          </div>

          {/* Right Column: Hero Calculator */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto animate-scale-in delay-300">
            <div className="relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-[2rem] blur-2xl group-hover:bg-accent/30 transition-all duration-700 opacity-60" />
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent to-transparent rounded-2xl opacity-20" />
              <EstimateCalculator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
