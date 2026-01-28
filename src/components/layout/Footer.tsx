import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import cowboyLogo from "@/assets/cowboy-full-logo.png";

const residentialServices = [
  { name: "Roof Replacement", href: "/services/roof-replacement" },
  { name: "Roof Repair", href: "/services/roof-repair" },
  { name: "Landscaping & Hardscape", href: "/services/landscaping" },
  { name: "Metal Roofing", href: "/services/metal-roofing" },
  { name: "Siding & Gutters", href: "/services/siding" },
];

const commercialServices = [
  { name: "TPO / Flat Roofing", href: "/commercial/roof-replacement" },
  { name: "Multi-Family / HOA", href: "/commercial/multi-family" },
  { name: "Retail & Industrial", href: "/commercial/roofing" },
  { name: "Maintenance Plans", href: "/commercial/roof-repair" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a2240] text-white overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
      <div className="container relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block group">
              <img
                src={cowboyLogo}
                alt="Cowboy Roofing & Exteriors"
                className="h-10 sm:h-14 md:h-16 lg:h-18 w-auto transition-all duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed font-medium max-w-sm">
              Texas-bred precision. Radical transparency. We coordinate Houston's premium roof installations with a virtual-first process that puts the homeowner in control.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 border border-white/10 group"
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Precision Navigation - Residential */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-white text-xl font-black uppercase tracking-widest italic border-l-4 border-accent pl-4 leading-none py-1">
              Residential
            </h3>
            <ul className="space-y-5">
              {residentialServices.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-accent font-bold transition-all text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Precision Navigation - Commercial */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-white text-xl font-black uppercase tracking-widest italic border-l-4 border-accent pl-4 leading-none py-1">
              Commercial
            </h3>
            <ul className="space-y-5">
              {commercialServices.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-accent font-bold transition-all text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-span-4 space-y-10">
            <h3 className="text-white text-xl font-black uppercase tracking-widest italic border-l-4 border-accent pl-4 leading-none py-1">
              Contact Us
            </h3>
            <div className="grid gap-6">
              <a
                href="tel:+17135550123"
                className="group flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-lg shadow-accent/10">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">Get Free Estimate</p>
                  <p className="text-white font-black text-xl tracking-tight">(713) 555-0123</p>
                </div>
              </a>

              <div className="flex items-start gap-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0 border border-white/5">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Houston Operations</p>
                  <p className="text-gray-300 font-bold leading-relaxed">
                    123 Main Street<br />
                    Houston, TX 77007
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultimate Bottom Bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-12 gap-y-6">
            {companyLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-400 hover:text-accent transition-colors font-black uppercase tracking-[0.25em] text-[10px] md:text-[11px]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 text-gray-500 font-bold text-[11px] uppercase tracking-widest text-center md:text-left">
            <p>© 2026 Cowboy Roofing & Exteriors. All rights reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors underline decoration-white/10 underline-offset-8">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors underline decoration-white/10 underline-offset-8">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
