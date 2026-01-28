import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-display uppercase tracking-tight">
          Get a Free Inspection in 24 Hours
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Ready to start your project? Let's make your vision a reality. All
          services come with a 3-year warranty.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" asChild>
            <Link to="/contact">Schedule Now</Link>
          </Button>
          <Button variant="hero-outline" asChild>
            <a href="tel:+15551234567">
              <Phone className="h-5 w-5 mr-2" />
              (555) 123-4567
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
