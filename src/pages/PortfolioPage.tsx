import { Layout } from "@/components/layout/Layout";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import roofReplacement from "@/assets/roof-replacement.jpg";
import metalRoofing from "@/assets/metal-roofing.jpg";
import homeNewRoof from "@/assets/home-new-roof.jpg";

const projects = [
  {
    title: "Complete Roof Replacement - Austin",
    category: "Residential",
    image: roofReplacement,
  },
  {
    title: "Metal Roof Installation - Cedar Park",
    category: "Residential",
    image: metalRoofing,
  },
  {
    title: "New Construction Roofing - Round Rock",
    category: "Residential",
    image: homeNewRoof,
  },
  {
    title: "Storm Damage Repair - Georgetown",
    category: "Emergency",
    image: roofReplacement,
  },
  {
    title: "Standing Seam Metal Roof - Dripping Springs",
    category: "Residential",
    image: metalRoofing,
  },
  {
    title: "Full Exterior Renovation - Pflugerville",
    category: "Commercial",
    image: homeNewRoof,
  },
];

export default function PortfolioPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6 font-display uppercase tracking-tight">
              Portfolio
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Tailored Roofing Services for Homes & Businesses. At Cowboy
              Roofing, we take pride in delivering top-quality professional
              roofing services.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Description */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display uppercase tracking-tight">
              Your Home, Built Right with Cowboy
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our portfolio showcases a range of expertly completed projects,
              from roof repairs and replacements to full-scale roofing
              installations. Each project highlights our commitment to
              durability, craftsmanship, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Projects Grid */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display uppercase tracking-tight">
              Recent Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-card bg-background"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-primary-foreground font-display uppercase tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 group-hover:hidden">
                  <span className="text-sm text-accent font-medium">
                    {project.category}
                  </span>
                  <h3 className="font-semibold text-foreground mt-1 font-display uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
