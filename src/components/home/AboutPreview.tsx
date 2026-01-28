import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import homeImage from "@/assets/home-new-roof.jpg";

export function AboutPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={homeImage}
              alt="Beautiful home with new roof"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-3xl font-bold">3 Year</p>
              <p className="text-sm">Warranty on All Services</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              About Our Company
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display uppercase tracking-tight">
              Professional Roofing Backed by a Family Legacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We are a family-owned business that has built trusting
              relationships in the community and surrounding areas. Our team of
              experts has a history of installing and repairing thousands of
              residential and commercial roofing systems, and we are committed
              to completing every project with Performance, Precision, and
              Pride.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As proud members of the community, we stand behind our work and
              are committed to delivering unmatched customer service. In fact,
              the name Cowboy Roofing is synonymous with exceptional service and
              craftsmanship throughout Texas.
            </p>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-xl font-bold text-accent font-display uppercase tracking-tight">Integrity</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-xl font-bold text-accent font-display uppercase tracking-tight">Diligence</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-xl font-bold text-accent font-display uppercase tracking-tight">Generosity</p>
              </div>
            </div>

            <Button variant="cta" size="lg" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
