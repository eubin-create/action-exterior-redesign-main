import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import roofReplacementImg from "@/assets/roof-replacement.jpg";
import roofRepairImg from "@/assets/roof-repair.jpg";
import metalRoofingImg from "@/assets/metal-roofing.jpg";
import stormDamageImg from "@/assets/storm-damage.jpg";
import sidingImg from "@/assets/siding-service.jpg";
import windowsImg from "@/assets/windows-service.jpg";
import guttersImg from "@/assets/gutters-service.jpg";

// --- Enhanced Data Structure for SEO & AEO ---
interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  // SEO Fields
  metaTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
  schema: object;
}

const servicesData: Record<string, ServiceData> = {
  "roof-replacement": {
    title: "Roof Replacement",
    subtitle: "Turnkey Roof Replacement Systems for Houston Homes",
    description:
      "A roof replacement is a significant investment, but it's also your home's first line of defense against Houston's volatile weather. At Cowboy Roofing, we don't just 'install shingles'—we engineer complete roofing systems designed to withstand hurricane-force winds (up to 130 mph), torrential downpours, and blistering heat. Our process is transparent, efficient, and backed by a 100% satisfaction guarantee. We use only premium materials from trusted manufacturers like GAF and Owens Corning, ensuring your new roof adds lasting value and curb appeal to your property.",
    image: roofReplacementImg,
    metaTitle: "Best Roof Replacement Houston, TX | Cowboy Roofing & Exteriors",
    metaDescription:
      "Top-rated roof replacement in Houston. We offer virtual estimates, hurricane-grade materials, and a 5-star installation process. Get your quote in 45 minutes.",
    features: [
      "Complete tear-off to the deck (no layovers)",
      "Ice & Water Shield in all valleys & penetrations",
      "Synthetic underlayment (better than felt)",
      "High-definition architectural shingles",
      "Hurricane-rated 6-nail installation pattern",
      "Premium starter strips for wind resistance",
      "Lead pipe boot replacement",
      "Magnetic nail sweep (3 passes)",
      "Ridge vent installation for optimal airflow",
      "5-Year Workmanship Warranty",
    ],
    benefits: [
      "Increased home resale value",
      "Lower energy bills (Radiant Barrier options)",
      "Enhanced curb appeal",
      "Peace of mind during hurricane season",
      "Transferable manufacturer warranties",
      "Prevent mold and structural rot",
    ],
    faqs: [
      {
        question: "How much does a new roof cost in Houston?",
        answer:
          "The cost of a roof replacement varies based on size, pitch, and materials. On average, Houston homeowners invest between $12,000 and $22,000 for a high-quality architectural shingle roof. We provide detailed, transparent quotes with no hidden fees.",
      },
      {
        question: "Do you offer financing options?",
        answer:
          "Yes! We partner with top-rated lenders to offer flexible financing plans, including 0% interest options for qualified buyers. You can protect your home now and pay over time with affordable monthly payments.",
      },
      {
        question: "How long will the project take?",
        answer:
          "Efficiency is part of the Cowboy Standard. Most residential roof replacements are completed in just 1-2 days. We arrive early, work diligently, and never leave your roof exposed overnight.",
      },
      {
        question: "What happens if it rains during installation?",
        answer:
          "We closely monitor local weather radar before starting any job. In the event of a sudden pop-up storm, our crews are equipped with heavy-duty tarps to immediately seal your roof and protect your home's interior.",
      },
      {
        question: "Will you protect my landscaping and driveway?",
        answer:
          "Absolutely. We use 'catch-all' netting systems to cover your shrubs and flower beds. We also use dump trailers with rubber tires (not roll-off dumpsters) to protect your driveway from scratches and cracks.",
      },
      {
        question: "Do you use subcontractors?",
        answer:
          "We use dedicated, fully vetted crews who have worked with us for years. Our on-site project managers oversee every step of the installation to ensure it meets our strict quality standards.",
      },
      {
        question: "How do you handle insurance claims?",
        answer:
          "We are insurance claim experts. We use the same software (Xactimate) as insurance adjusters to ensure your claim is accurate. We can meet your adjuster on-site to advocate for all necessary repairs.",
      },
      {
        question: "What is the difference between 3-tab and architectural shingles?",
        answer:
          "Architectural (laminated) shingles are thicker, more durable, and have a multi-dimensional look. They typically come with a higher wind rating (130 mph vs. 60 mph) and a longer warranty than standard 3-tab shingles. We almost exclusively install architectural shingles for their superior performance.",
      },
      {
        question: "Do you replace the decking (wood) underneath?",
        answer:
          "We inspect all decking after tearing off the old shingles. If we find rotten or damaged wood, we will replace it to ensure a solid nailing surface. We typically include a certain amount of wood replacement in our initial quote.",
      },
      {
        question: "What warranties do you offer?",
        answer:
          "We offer a 5-Year Workmanship Warranty on our labor, in addition to the Manufacturer's Warranty (typically Limited Lifetime for materials). Extended Golden Pledge warranties are also available for registered systems.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Roof Replacement",
      provider: {
        "@type": "RoofingContractor",
        name: "Cowboy Roofing & Exteriors",
        areaServed: {
          "@type": "City",
          name: "Houston",
        },
      },
    },
  },
  "roof-repair": {
    title: "Roof Repair",
    subtitle: "Expert Roof Leak Detection & Repair in Houston",
    description:
      "Not every roof needs to be replaced. At Cowboy Roofing, we pride ourselves on honesty—if a repair can extend the life of your roof, that's what we'll recommend. Our repair technicians are master diagnosticians, trained to track water intrusion to its source, whether it's a pipe boot, a flashing failure, or storm damage. We provide long-lasting repairs that blend seamlessly with your existing roof, saving you thousands of dollars while keeping your home dry.",
    image: roofRepairImg,
    metaTitle: "Expert Roof Repair Houston | Leak Fixes & Storm Damage",
    metaDescription:
      "Fast and reliable roof repair in Houston. We fix leaks, missing shingles, and storm damage. 24/7 emergency services available. Call now!",
    features: [
      "Precision leak detection (attic analysis)",
      "Shingle matching technology",
      "Pipe boot & flashing resealing",
      "Chimney cricket repair",
      "Skylight leak repair",
      "Ventilation assessment",
      "Rotten wood replacement",
      "Full debris removal",
    ],
    benefits: [
      "Extend your roof's lifespan by 3-5+ years",
      "Prevent costly interior water damage",
      "Stop mold growth before it starts",
      "Maintain your home's insurance eligibility",
      "Cost-effective alternative to replacement",
    ],
    faqs: [
      {
        question: "How do I know if I need a repair or a replacement?",
        answer:
          "If your roof is relatively young (<15 years) and the damage is localized (e.g., a few missing shingles or a leak at a pipe boot), a repair is usually the best option. If the roof is old, has widespread granular loss, or multiple leaks, replacement might be more cost-effective.",
      },
      {
        question: "Can you match my existing shingle color?",
        answer:
          "We do our absolute best to match your existing shingle color and style. However, due to sun fading and weathering, the new shingles may look slightly different initially. They will often blend in over time as they weather.",
      },
      {
        question: "Do you have a minimum charge for repairs?",
        answer:
          "Yes, we have a standard service call fee that covers the trip, inspection, and minor repairs. This ensures we can dispatch a qualified technician and a fully stocked truck to your home.",
      },
      {
        question: "Will the repair be visible?",
        answer:
          "While we use the closest matching materials available, a 'brand new' patch on an 'aged' roof may be slightly visible. Our goal is a watertight seal first, and aesthetic blending second.",
      },
      {
        question: "Do you warranty your repairs?",
        answer:
          "Yes! We provide a warranty on the specific area we repaired. If it leaks again in that exact spot within the warranty period, we will come back and fix it for free.",
      },
      {
        question: "Can you fix a leak without replacing the whole roof?",
        answer:
          "In 90% of cases, yes. Most leaks occur at 'penetrations' (vents, pipes, chimneys) rather than in the field of the shingles. These can often be resealed or re-flashed without a full roof replacement.",
      },
      {
        question: "What if you find more damage once you start?",
        answer:
          "If we uncover hidden damage (like extensive rotten decking) that wasn't visible during the initial inspection, we will stop, take photos, and discuss the options/costs with you before proceeding.",
      },
      {
        question: "Do you offer emergency tarping?",
        answer:
          "Yes. If you have an active leak during a storm, we can perform emergency tarping to stop the water intrusion immediately, and then return for permanent repairs once the weather clears.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Roof Repair",
      provider: {
        "@type": "RoofingContractor",
        name: "Cowboy Roofing & Exteriors",
      },
    },
  },
  "metal-roofing": {
    title: "Metal Roofing",
    subtitle: "Premium Metal Roofing Systems for Texas",
    description:
      "For the ultimate in durability and energy efficiency, nothing beats a metal roof. Cowboy Roofing specializes in Standing Seam metal roofing, the gold standard for Texas homes. Unlike exposed-fastener systems that can leak over time, our concealed-fastener panels allow for thermal expansion and contraction without compromising the seal. A metal roof is a lifetime investment that reflects radiant heat, withstands hail, and provides a sleek, modern aesthetic that sets your home apart.",
    image: metalRoofingImg,
    metaTitle: "Residential Metal Roofing Houston | Standing Seam Experts",
    metaDescription:
      "Premium metal roofing installation in Houston. Standing seam and metal shingles available. Lasts 50+ years and lowers energy bills. Get a quote.",
    features: [
      "24-Gauge Galvalume Steel panels",
      "Standing Seam (Concealed Fasteners)",
      "Snap-Lock or Mechanical Lock systems",
      "Kynar 500® Paint Finish (No fading)",
      "High-Temp Ice & Water underlayment",
      "Custom-fabricated trim & flashing",
      "Class 4 Impact Resistance",
      "Wind/Hail resistant design",
    ],
    benefits: [
      "Life Expectancy of 50-70+ years",
      "Significantly lowers cooling costs",
      "Insurance discounts for Impact Resistance",
      "Virtually maintenance-free",
      "Fire Resistant (Class A)",
      "Modern, architectural curb appeal",
    ],
    faqs: [
      {
        question: "Is a metal roof noisy when it rains?",
        answer:
          "This is a common myth! When installed over a solid plywood deck with high-quality insulation and underlayment, a metal roof is no noisier than a standard asphalt shingle roof. You'll hear a gentle hum, not a loud clatter.",
      },
      {
        question: "Does metal roofing attract lightning?",
        answer:
          "No. Metal roofing does not increase the likelihood of a lightning strike. In fact, if your home is struck, metal is safer because it is non-combustible and won't catch fire like wood shakes or asphalt.",
      },
      {
        question: "Will a metal roof rust in Houston?",
        answer:
          "We use Galvalume® steel, which is coated with a zinc-aluminum alloy specifically designed to resist corrosion. Coupled with a high-quality Kynar 500® paint finish, your roof is built to withstand humidity and salt air.",
      },
      {
        question: "Can I walk on my metal roof?",
        answer:
          "Yes, but you should do so carefully. We recommend walking on the 'flat' areas of the panels, not the ribs. However, metal roofs are slippery when wet, so we advise leaving maintenance to the professionals.",
      },
      {
        question: "Is metal roofing more expensive than shingles?",
        answer:
          "Yes, the initial investment is higher (typically 2-3x the cost of asphalt), but the lifecycle cost is lower. A metal roof can last 3 times as long as a shingle roof, making it cheaper in the long run.",
      },
      {
        question: "Do you make the panels on-site?",
        answer:
          "Yes! We bring our roll-forming machine to your driveway. This allows us to fabricate continuous panels that run the full length of your roof slope, eliminating horizontal seams where leaks can occur.",
      },
      {
        question: "What colors are available?",
        answer:
          "We offer a wide range of designer colors, from classic Charcoal and Bronze to modern Matte Black and Galvalume. We can provide color chips to help you match your home's exterior.",
      },
      {
        question: "Will it interfere with my Wi-Fi or cell signal?",
        answer:
          "In most residential settings, a metal roof has negligible impact on cell reception or Wi-Fi signals inside the home.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Metal Roofing Installation",
      provider: {
        "@type": "RoofingContractor",
        name: "Cowboy Roofing & Exteriors",
      },
    },
  },
  "emergency-repair": {
    title: "Emergency Roof Repair",
    subtitle: "24/7 Rapid Response & Storm Damage Mitigation",
    description:
      "Roofing emergencies don't wait for business hours. Whether it's a fallen tree, a major leak during a storm, or wind damage exposing your decking, Cowboy Roofing is ready to deploy. Our emergency response team prioritizes stabilizing your home to prevent further water damage (mitigation). We provide professional tarping services and can help document the damage for your insurance claim properly from day one.",
    image: stormDamageImg,
    metaTitle: "24/7 Emergency Roof Repair Houston | Fast Tarping Service",
    metaDescription:
      "Emergency roof repair and tarping in Houston. Available 24/7 for storm damage, fallen trees, and severe leaks. Rapid response team.",
    features: [
      "24/7 Emergency Hotline",
      "Rapid Dispatch (Usually <2 Hours)",
      "Blue Tarp Installation (Securely fastened)",
      "Leak Diverter setup",
      "Structural assessment (if safe)",
      "Insurance photo documentation",
      "Debris clearance",
    ],
    benefits: [
      "Immediate stop to water intrusion",
      "Prevents ceiling collapse & mold",
      "Evidence for insurance claims",
      "Peace of mind during the storm",
      "Professional, safe execution",
    ],
    faqs: [
      {
        question: "How fast can you get here?",
        answer:
          "We prioritize emergency calls. During a major storm event, we triage calls based on severity, but we typically aim to have a crew on-site within 2-4 hours to assess and tarp.",
      },
      {
        question: "How much does emergency tarping cost?",
        answer:
          "Emergency service calls start at a base rate (typically $500+) depending on the size of the tarp needed, the steepness of the roof, and the weather conditions (hazard pay). We provide upfront pricing before we start.",
      },
      {
        question: "Will insurance pay for the tarp?",
        answer:
          "In most cases, yes. Your insurance policy likely requires you to perform 'temporary repairs' to mitigate further damage. The cost of tarping is usually reimbursable as part of your claim.",
      },
      {
        question: "Is tarping a permanent fix?",
        answer:
          "No. A tarp is a temporary bandage designed to keep water out until the storm passes and a permanent repair or replacement can be scheduled. A properly installed tarp can last up to 90 days if needed.",
      },
      {
        question: "Can you fix the roof while it's raining?",
        answer:
          "We cannot perform permanent repairs (like shingling or sealing) while it is actively raining because the materials won't adhere. We CAN install a tarp in light to moderate rain to stop the leak immediately.",
      },
      {
        question: "Do you remove fallen trees?",
        answer:
          "We can remove small branches to clear the roof area for tarping. For large trees that have punctured the structure, we may recommend a tree service removal first, but we can often work around it to secure the home.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Emergency Roof Repair",
      provider: {
        "@type": "RoofingContractor",
        name: "Cowboy Roofing & Exteriors",
      },
    },
  },
  siding: {
    title: "Siding Services",
    subtitle: "James Hardie® Siding Installation Pros",
    description:
      "Your siding is more than just a color choice—it's your home's armor. Cowboy Roofing specializes in James Hardie® Fiber Cement siding, the premier choice for Houston's humid climate. Unlike wood (which rots) or vinyl (which can melt/crack), HardiePlank is engineered to resist moisture, fire, and pests. We install complete exterior systems including house wrap, trim, and soffit replacement.",
    image: sidingImg,
    metaTitle: "Siding Replacement Houston | HardiePlank & Vinyl",
    metaDescription:
      "Expert siding installation in Houston. Boost curb appeal and energy efficiency.",
    features: [
      "James Hardie® Elite Preferred logic",
      "HardiePlank® Lap Siding",
      "Board & Batten styling",
      "Weather barrier installation (Tyvek)",
      "Soffit & Fascia replacement",
      "Exterior painting",
    ],
    benefits: [
      "Impervious to termites",
      "Rot and moisture resistant",
      "Non-combustible (Fire Safe)",
      "Baked-on ColorPlus® Technology",
      "30-Year Non-Prorated Warranty",
    ],
    faqs: [
      {
        question: "Why do you recommend James Hardie siding?",
        answer:
          "James Hardie fiber cement is specifically engineered for our climate zone (HZ10). It resists the shrinking, swelling, and cracking that plagues other materials in Houston's heat and humidity.",
      },
      {
        question: "Vinyl vs. Fiber Cement: Which is better?",
        answer:
          "Vinyl is cheaper upfront but can become brittle and fade. Fiber Cement looks like real wood, lasts significantly longer, and adds more value to your home. We almost always recommend Fiber Cement for long-term value.",
      },
      {
        question: "Do I need to paint my new siding?",
        answer:
          "If you choose pre-finished ColorPlus® technology, no! It comes with a 15-year warranty against peeling and chipping. If you choose primed siding, we will paint it with high-quality exterior paint.",
      },
      {
        question: "How do you handle layers of old siding?",
        answer:
          "We always recommend a full tear-off of old siding to inspect the sheathing underneath for rot. Installing new siding over old siding traps moisture and voids warranties.",
      },
      {
        question: "What about the trim and soffits?",
        answer:
          "We typically replace all trim (corners, window surrounds) and soffits with HardieTrim® during a siding project to ensure the entire exterior is maintenance-free.",
      },
    ],
    schema: {},
  },
  windows: {
    title: "Window Replacement",
    subtitle: "Energy Efficient Window Replacement",
    description:
      "Stop cooling the neighborhood! Old, single-pane aluminum windows are the #1 source of energy loss in Houston homes. Our replacement windows feature double-pane Low-E glass and Argon gas fills to reflect heat and keep your AC bill down. We offer a variety of styles including Vinyl, Aluminum, and Fiberglass to match your budget and aesthetic.",
    image: windowsImg,
    metaTitle: "Window Replacement Houston | Energy Efficient",
    metaDescription:
      "Install energy-efficient windows in Houston to lower AC bills.",
    features: [
      "Double-strength glass",
      "Low-E 366 coatings (UV protection)",
      "Argon gas insulation",
      "Vinyl or Aluminum frames",
      "Custom sizing (Retrofit)",
      "Expert sealing & caulking",
    ],
    benefits: [
      "Reduce energy bills by up to 30%",
      "Significant noise reduction",
      "Smooth operation (easy cleaning)",
      "Impact-resistant options",
      "Enhanced home security",
    ],
    faqs: [
      {
        question: "Will new windows really lower my electric bill?",
        answer:
          "Yes. Replacing single-pane windows with Energy Star® rated double-pane windows can save Houston homeowners 12-33% on heating and cooling costs annually.",
      },
      {
        question: "Do you install 'retrofit' or 'new construction' windows?",
        answer:
          "For most occupied homes, we install 'retrofit' windows. This allows us to replace the sash and frame without damaging your stucco, brick, or interior drywall.",
      },
      {
        question: "What is Low-E glass?",
        answer:
          "Low-Emissivity (Low-E) glass has a microscopic metallic coating that reflects UV rays and heat while letting visible light through. It's essential for keeping your home cool in Texas.",
      },
      {
        question: "How long does installation take?",
        answer:
          "A typical crew can install 8-12 windows per day. Most whole-home projects are completed in 2-3 days with minimal disruption.",
      },
      {
        question: "Do your windows have a warranty?",
        answer:
          "Yes, most of our window products come with a Lifetime Limited Warranty on the vinyl and glass units, including coverage for seal failure (foggy glass).",
      },
    ],
    schema: {},
  },
  gutters: {
    title: "Gutter Services",
    subtitle: "Seamless Aluminum Gutters & Leaf Protection",
    description:
      "Gutters are the unsung heroes of your roof. Without them, rain cascades off your roof, eroding your foundation and ruining your landscaping. We manufacture seamless aluminum gutters ON-SITE to custom fit your home perfectly. Upgrading to 6-inch oversize gutters is highly recommended for Houston's heavy torrential rains.",
    image: guttersImg,
    metaTitle: "Seamless Gutters Houston | Installation & Guards",
    metaDescription:
      "Protect your home with seamless gutters. Custom colors and leaf guards available.",
    features: [
      "6-Inch K-Style Seamless Aluminum",
      "Custom fabrication on-site",
      "Heavy-duty internal hangers (screw-in)",
      "Leaf guard/Screen installation",
      "Proper slope calibration",
      "Downspout extensions",
    ],
    benefits: [
      "Prevents foundation shifting",
      "Protects flower beds/landscaping",
      "Stops splash-back rot on siding",
      "Prevents basement flooding",
      "Clean, finished look",
    ],
    faqs: [
      {
        question: "Do I need 5-inch or 6-inch gutters?",
        answer:
          "In Houston, 6-inch oversize gutters are the standard. They hold 40% more water than 5-inch gutters, which is critical during our heavy tropical downpours to prevent overflow.",
      },
      {
        question: "Are seamless gutters really better?",
        answer:
          "Yes! Sections gutters leak at the seams eventually. Seamless gutters are one continuous piece of aluminum, eliminating leaks and looking much cleaner.",
      },
      {
        question: "What colors do you have?",
        answer:
          "We carry over 30 colors of aluminum coil to match your trim, siding, or roof. The paint is baked-on at the factory and won't peel.",
      },
      {
        question: "Do you install leaf guards?",
        answer:
          "Yes, we offer everything from basic mesh screens to high-end micro-mesh systems that keep even pine needles and grit out of your gutters.",
      },
      {
        question: "How are the gutters attached?",
        answer:
          "We use heavy-duty internal hidden hangers with screws (not spikes). Spikes pull out over time; screws stay secure into the fascia board.",
      },
    ],
    schema: {},
  },
};

export default function ServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = servicesData[serviceSlug || "roof-replacement"];

  if (!service) {
    return (
      <Layout>
        <Helmet><title>Service Not Found</title></Helmet>
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
      {/* Dynamic SEO Head */}
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(service.schema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-overlay-gradient" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6 font-display uppercase tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {service.subtitle}
            </p>
            <Button variant="hero" className="mt-8" asChild>
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display uppercase tracking-tight">
                {service.subtitle}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {service.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For generations, Cowboy Roofing has been providing homeowners
                with high-quality services, including solutions that withstand
                harsh Texas weather. From the smallest jobs to major projects,
                we approach each and every project with care to deliver 100%
                customer satisfaction every time.
              </p>
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">Schedule Free Inspection</Link>
              </Button>
            </div>

            <div className="bg-white rounded-lg p-8 border border-primary/10 shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase tracking-tight">
                What We Offer
              </h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display uppercase tracking-tight">
              Benefits of Our {service.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 text-center shadow-card"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 font-display uppercase tracking-tight">
                Common Questions About {service.title}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border border-primary/10">
                    <AccordionTrigger className="text-left font-semibold hover:text-accent hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Generic Testimonials & CTA */}
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
