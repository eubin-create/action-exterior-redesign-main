import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Laura M.",
    text: "I couldn't believe I got a full quote in 45 minutes without anyone climbing on my roof. The virtual consultation was so easy and professional.",
    rating: 5
  },
  {
    name: "Terri S.",
    text: "Cowboy Roofing changed my mind about contractors. No pressure, no sales tricks—just clear pricing and options. The 'Good/Better/Best' breakdown was super helpful.",
    rating: 5
  },
  {
    name: "Carol J.",
    text: "What a perfect experience! I signed the contract on my phone and the crew showed up exactly when they said they would. The daily photo updates were a nice touch.",
    rating: 5
  },
  {
    name: "Theresa B.",
    text: "We discovered a roof leak after a big storm. Michael hopped on a Zoom call with us, showed us the damage from aerial photos, and arranged a repair team for the next day.",
    rating: 5
  },
  {
    name: "Scott S.",
    text: "I highly recommend Cowboy Roofing. The fact that they don't have to send a salesperson to my house for 2 hours made my life so much easier.",
    rating: 5
  },
  {
    name: "John S.",
    text: "They were fast on getting me a quote. They stayed late to make sure the roof was done before any rain got on it. Great to work with!",
    rating: 5
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a2240] text-white overflow-hidden relative">
      {/* Decorative stars overlay */}
      <div className="absolute top-10 right-10 opacity-5">
        <Star className="w-64 h-64 fill-white" />
      </div>
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-4">
          <span className="text-white/60 font-black text-xs uppercase tracking-[0.3em]">
            Customer Proof
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-display uppercase tracking-tight italic">
            Word on the <span className="text-white">Street.</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 md:h-5 md:w-5 fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              5-Star Google Rating
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-sm group hover:bg-white transition-all duration-500 rounded-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8">
                <Quote className="h-10 w-10 text-accent opacity-20 group-hover:opacity-100 transition-opacity mb-6" />
                <p className="text-gray-300 group-hover:text-primary leading-relaxed mb-8 font-medium italic text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 group-hover:border-primary/10 pt-6">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white group-hover:text-primary uppercase tracking-tight">
                      {testimonial.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
