import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import cowboyLogo from "@/assets/cowboy-full-logo.png";

const navigation = [
  {
    name: "Residential",
    href: "#",
    children: [
      { name: "Roof Replacement", href: "/services/roof-replacement" },
      { name: "Roof Repair", href: "/services/roof-repair" },
      { name: "Metal Roofing", href: "/services/metal-roofing" },
      { name: "Siding Replacement", href: "/services/siding" },
      { name: "Window Replacement", href: "/services/windows" },
      { name: "Gutters", href: "/services/gutters" },
      { name: "Emergency Repair", href: "/services/emergency-repair" },
    ],
  },
  {
    name: "Commercial",
    href: "#",
    children: [
      { name: "Commercial Roofing", href: "/commercial/roofing" },
      { name: "Flat Roof Replacement (TPO)", href: "/commercial/roof-replacement" },
      { name: "Leak Repair & Maintenance", href: "/commercial/roof-repair" },
      { name: "Multi-Family & HOA", href: "/commercial/multi-family" },
      { name: "Metal Roofing Systems", href: "/commercial/metal-roofing" },
      { name: "Commercial Siding", href: "/commercial/siding" },
      { name: "Commercial Windows", href: "/commercial/windows" },
      { name: "Industrial Gutters", href: "/commercial/gutters" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  {
    name: "Neighborhoods",
    href: "#",
    children: [
      { name: "River Oaks", href: "/locations/river-oaks" },
      { name: "The Heights", href: "/locations/the-heights" },
      { name: "Memorial", href: "/locations/memorial" },
      { name: "West University", href: "/locations/west-university" },
      { name: "Bellaire", href: "/locations/bellaire" },
      { name: "Katy", href: "/locations/katy" },
      { name: "Sugar Land", href: "/locations/sugar-land" },
      { name: "Pearland", href: "/locations/pearland" },
      { name: "The Woodlands", href: "/locations/the-woodlands" },
      { name: "Spring", href: "/locations/spring" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-[#0a2240] text-white py-2.5 border-b border-white/10">
        <div className="container flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="hidden md:block">
            Precision Roof Replacement • Houston, TX
          </span>
          <a
            href="tel:+17135550123"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <Phone className="h-3 w-3" />
            (713) 555-0123
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container flex items-center justify-between py-5">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={cowboyLogo}
            alt="Cowboy Roofing & Exteriors"
            className="h-10 sm:h-14 md:h-16 lg:h-18 w-auto transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0a2240] hover:text-accent transition-all">
                  {item.name}
                  <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-4 w-72 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-white rounded-xl shadow-2xl border-t-4 border-accent py-5 px-3">
                      <p className="px-4 pb-3 mb-3 text-[10px] font-black text-accent uppercase tracking-widest border-b border-primary/5">Solutions</p>
                      <div className="grid grid-cols-1 gap-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-4 py-2.5 text-[13px] font-bold rounded-lg transition-all ${isActive(child.href)
                              ? "bg-accent/5 text-accent"
                              : "text-[#0a2240] hover:bg-[#0a2240]/5 hover:text-accent"
                              }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-[11px] font-black uppercase tracking-widest transition-all hover:translate-y-[-1px] ${isActive(item.href)
                  ? "text-accent border-b-2 border-accent"
                  : "text-[#0a2240] hover:text-accent"
                  }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Button variant="cta" size="lg" className="bg-[#b3191d] hover:bg-[#8b1316] text-white font-black uppercase tracking-tighter px-6 xl:px-8 h-12 shadow-xl shadow-red-900/20" asChild>
            <Link to="/contact">Get 45-Min Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container py-4 space-y-2">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full py-2 text-foreground/80"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block py-2 text-sm text-foreground/60 hover:text-accent"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-foreground/80 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <Button variant="cta" className="w-full mt-4" asChild>
              <Link to="/contact">Get Free Estimate</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
