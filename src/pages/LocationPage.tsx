import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, ShieldCheck, Zap, Heart, Star } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import riverOaksImg from "@/assets/locations/river-oaks.png";
import theHeightsImg from "@/assets/locations/the-heights.png";
import memorialImg from "@/assets/locations/the-woodlands.png";
import katyImg from "@/assets/locations/katy.png";
import westUImg from "@/assets/locations/katy.png";
import bellaireImg from "@/assets/locations/river-oaks.png";
import sugarLandImg from "@/assets/locations/katy.png";
import pearlandImg from "@/assets/locations/katy.png";
import theWoodlandsImg from "@/assets/locations/the-woodlands.png";
import springImg from "@/assets/locations/the-woodlands.png";

const locations: Record<string, {
    title: string;
    description: string;
    longDescription: string;
    neighborhoods: string[];
    image: string;
    highlights: string[];
    faqs: { question: string; answer: string }[];
}> = {
    "river-oaks": {
        title: "River Oaks",
        description: "Opulent roofing systems tailored for Houston's premier estates.",
        longDescription: "In River Oaks, excellence isn't just a standard—it's a requirement. We specialize in high-end roofing materials that complement the grandeur of River Oaks architecture, from Spanish Tile and Natural Slate to premium Standing Seam Metal systems. Our team understands the nuances of working on historic estates while integrating modern, hurricane-resistant technology.",
        neighborhoods: ["Tall Timbers", "Homewood", "Royden Oaks", "River Oaks Estates"],
        image: riverOaksImg,
        highlights: ["Specialists in Slate & Tile", "White-Glove Jobsite Cleanliness", "Estate-Scale Project Management"],
        faqs: [
            { question: "Do you specialize in Spanish Tile roofing for River Oaks homes?", answer: "Yes, we have a dediated team of tile artisans who specialize in traditional clay and concrete tile installations common in River Oaks." },
            { question: "How do you protect landscaping on large estates?", answer: "We use a proprietary containment system that suspends netting over gardens and water features, ensuring zero impact on your landscaping." },
            { question: "Are your crews vetted for high-security neighborhoods?", answer: "Absolutely. All our team members undergo rigorous background checks and carry clear identification at all times." },
            { question: "Do you offer slate roof restoration?", answer: "We provide both complete slate replacement and meticulous restoration services for historic River Oaks roofs." },
            { question: "Can you match the aesthetic requirements of local HOAs?", answer: "We are well-versed in River Oaks architectural guidelines and will handle all technical documentation for board approval." },
            { question: "How long does an estate-scale roof replacement take?", answer: "While larger homes require more care, we typically complete replacements in 4-7 days with a full crew." },
            { question: "Do you offer leak detection for valley systems?", answer: "Yes, we use thermal imaging to detect hidden leaks in complex multi-valley roof systems." },
            { question: "Is your workmanship warranty transferable?", answer: "Yes, our platinum warranty is fully transferable, adding significant value to your River Oaks property." }
        ]
    },
    "the-heights": {
        title: "The Heights",
        description: "Historic roof restoration for Houston's most charming Victorian district.",
        longDescription: "Preserving the historic integrity of The Heights is our passion. Whether you own a 1920s Craftsman bungalow or a modern Victorian, we provide roofing solutions that honor the neighborhood's aesthetic while providing 21st-century protection. We use high-definition architectural shingles and custom copper flashing to ensure your roof is both beautiful and bulletproof.",
        neighborhoods: ["Houston Heights", "Sunset Heights", "Woodland Heights", "Norhill"],
        image: theHeightsImg,
        highlights: ["Historic Preservation Experts", "Custom Copper Flashing", "Victorian Aesthetic Integration"],
        faqs: [
            { question: "Can you match the unique shingle styles of older Heights homes?", answer: "We use GAF Timberline HDZ and specialized designer shingles to perfectly match the historic character of Heights bungalows." },
            { question: "Do you handle lead pipe boot replacements common in older homes?", answer: "Always. We replace all outdated plumbing boots with premium, lifetime-rated systems." },
            { question: "How do you handle roof ventilation in older Heights bungalows?", answer: "We custom-engineer ridge and soffit ventilation systems to ensure your historic attic stays cool and dry." },
            { question: "Are your installs hurricane-rated for local wind zones?", answer: "Yes, all our Heights installations utilize a 6-nail pattern rated for up to 130mph winds." },
            { question: "Do you provide custom copper gutters?", answer: "We offer custom-fabricated copper gutters and downspouts that develop a beautiful patina over time." },
            { question: "What is your process for protecting neighboring homes?", answer: "The Heights can be tight. We use vertical debris shields to prevent any materials from entering your neighbor's yard." },
            { question: "Do you work with historic district boards?", answer: "Yes, we can provide the necessary material samples and technical specs required for local historic planning approvals." },
            { question: "How fast can I get a virtual estimate?", answer: "Residents of The Heights can receive a detailed virtual estimate in under 45 minutes using our aerial scanning tech." }
        ]
    },
    "memorial": {
        title: "Memorial",
        description: "Sophisticated roofing for the wooded estates of Memorial Villages.",
        longDescription: "The Memorial area presents unique challenges, particularly with its dense tree canopy. Our roofing systems are engineered to handle the high moisture and organic debris common in wooded neighborhoods. We emphasize durability, using Class 4 impact-resistant shingles that lower insurance premiums while providing a sleek, professional look for your luxury home.",
        neighborhoods: ["Bunker Hill", "Piney Point", "Hunters Creek", "Hedwig Village"],
        image: memorialImg,
        highlights: ["HOA Compliance Mastery", "Class 4 Impact Resistance", "Wooded Area Debris Management"],
        faqs: [
            { question: "How do you handle debris from the heavy tree canopy in Memorial?", answer: "We recommend and install oversized 6-inch gutters and premium micro-mesh leaf protection systems to prevent clogging." },
            { question: "Will a Class 4 roof lower my insurance in Memorial?", answer: "In most cases, yes. Most Texas carriers offer substantial discounts (up to 20%) for Class 4 impact-resistant shingles." },
            { question: "Do you install Radiant Barriers for Memorial homes?", answer: "Yes, we can install Solarboard or spray-in radiant barriers during your roof replacement to slash cooling costs." },
            { question: "Are your roofs resistant to moss and algae?", answer: "We use shingles with StreakFighter® technology, utilizing copper-infused granules to prevent unsightly dark streaks." },
            { question: "Do you coordinate with Memorial Village HOAs?", answer: "We have worked with all the major Villages and are familiar with their specific roofing material and color guidelines." },
            { question: "Can you handle roofs with high pitches and complex gables?", answer: "Our master-certified crews are experts in 'high-and-steep' installations that require specialized safety equipment." },
            { question: "Do you offer emergency storm tarping in Memorial?", answer: "Yes, we provide 24/7 priority emergency response for Memorial residents following storm events." },
            { question: "Is a metal roof a good option for Memorial wooded areas?", answer: "Standing seam metal is excellent for Memorial as it sheds debris easily and is impervious to moisture-related rot." }
        ]
    },
    "katy": {
        title: "Katy",
        description: "Durability-first roofing for Katy's thriving suburban communities.",
        longDescription: "Katy homeowners need roofs that can take a beating from Texas sun and frequent hail events. Our Katy-specific roofing systems focus on maximum impact resistance and energy efficiency. From Cinco Ranch to Firethorne, we provide fast, reliable service that keeps your family safe and your home's value rising.",
        neighborhoods: ["Cinco Ranch", "Firethorne", "Seven Meadows", "Elyson"],
        image: katyImg,
        highlights: ["Hail Damage Specialists", "Fast Insurance Processing", "Suburban Energy Efficiency"],
        faqs: [
            { question: "Do you help with hail damage insurance claims in Katy?", answer: "Yes, we use the same Xactimate software as adjusters to ensure your claim covers every detail of the damage." },
            { question: "What is the best shingle for Katy hail storms?", answer: "We recommend Class 4 UL 2218 rated shingles, which are designed to withstand 2-inch hail without cracking." },
            { question: "How long does a roof estimate take in Cinco Ranch?", answer: "Using our virtual estimation tools, we can provide a bound quote in as little as 30 minutes without stepping on your property." },
            { question: "Do you offer financing for Katy homeowners?", answer: "We offer several low-monthly-payment plans, including deferred interest options for 12 months." },
            { question: "Are your roofs energy efficient for Katy summers?", answer: "We install Cool Roof shingles that reflect solar energy, keeping your attic up to 30 degrees cooler." },
            { question: "Will you replace my chimney flashing?", answer: "Every roof replacement includes a complete inspection and replacement of all chimney and wall flashings." },
            { question: "Do you offer gutter repairs with roof replacement?", answer: "We provide full gutter services, including seamless installation and minor repairs during roofing projects." },
            { question: "Are you licensed and insured in Katy?", answer: "Yes, we are fully licensed in the state of Texas and carry $2M in general liability insurance." }
        ]
    },
    "west-university": {
        title: "West University",
        description: "Premium roofing for Houston's most discerning families.",
        longDescription: "In West U, we know that your time is your most valuable asset. That's why we've designed a roofing process that is 90% virtual and 100% hassle-free. We specialize in the architectural styles of West U, providing seamless roof replacements that enhance your home's historic charm and modern value.",
        neighborhoods: ["West University Place", "Southside Place", "Rice Village"],
        image: westUImg,
        highlights: ["Virtual-First Convenience", "Architectural Integrity", "High-End System Upgrades"],
        faqs: [
            { question: "How do you minimize disruption in quiet West U neighborhoods?", answer: "We use electric-powered tools and specialized dump trailers to minimize noise and traffic impact." },
            { question: "Can you match the custom shingle colors on my street?", answer: "We have access to every major manufacturer and can perfectly match any existing architectural shingle color." },
            { question: "Do you provide noise-reduction roofing?", answer: "Yes, our premium underlayments and insulation packages significantly reduce exterior noise intrusion." },
            { question: "How fast is your response time for West U?", answer: "You can receive a bindable quote in under 45 minutes and a site visit within 24 hours if needed." },
            { question: "Do you coordinate with the City of West University Place?", answer: "Yes, we handle all city permitting and zoning documentation internally." },
            { question: "What are your best shingle options for West U?", answer: "We recommend GAF Grand Sequoia or Camelot II for that high-end, classic designer look." },
            { question: "Do you offer energy-efficient cool roofs?", answer: "Yes, we install reflective roofing that meets modern energy efficiency standards without sacrificing style." },
            { question: "How long has Cowboy Roofing served West U?", answer: "We have been the trusted choice for West U families for over 15 years." }
        ]
    },
    "bellaire": {
        title: "Bellaire",
        description: "Precision-engineered roofing for the 'City of Homes'.",
        longDescription: "Bellaire's unique architectural landscape, featuring everything from mid-century classics to massive new constructions, requires a versatile roofing partner. We specialize in both traditional pitched roofs and sophisticated flat-roof systems for modern builds. Our Bellaire installations prioritize drainage efficiency and long-term structural integrity.",
        neighborhoods: ["Meyerland", "Braeswood Place", "Southside Place", "Willowbend"],
        image: bellaireImg,
        highlights: ["Modern Flat-Roof Expertise", "Strict Building Code Adherence", "New Construction Specialists"],
        faqs: [
            { question: "Do you offer flat roof solutions for modern Bellaire homes?", answer: "Yes, we are experts in TPO and modified bitumen roofing for contemporary homes with flat or low-slope sections." },
            { question: "How do you handle drainage on large, flat surfaces?", answer: "We custom-engineer tapered insulation systems to ensure 100% positive drainage toward scuppers and downspouts." },
            { question: "Are your Bellaire installs hurricane-ready?", answer: "We exceed city requirements by using high-velocity hurricane zone (HVHZ) attachment patterns on all materials." },
            { question: "Do you provide siding and window services in Bellaire?", answer: "Yes, we offer complete exterior envelopes including James Hardie siding and energy-efficient windows." },
            { question: "Can you provide a 45-minute virtual estimate today?", answer: "Absolutely. Our virtual tech is fully calibrated for Bellaire's neighborhood density." },
            { question: "What warranties do you offer on flat roofs?", answer: "Our commercial-grade flat roof systems come with a 20-year NDL (No Dollar Limit) warranty option." },
            { question: "Do you handle local permit applications?", answer: "We take care of all city permitting and engineering documentation required for Bellaire projects." },
            { question: "Will you protect my driveway from delivery trucks?", answer: "We use specialized dump trailers with turf-safe tires to prevent any damage to your driveway or lawn." }
        ]
    },
    "sugar-land": {
        title: "Sugar Land",
        description: "Premium exterior protection for Fort Bend's flagship community.",
        longDescription: "Sugar Land homeowners demand reliability and aesthetic perfection. Our roofing systems are designed to withstand the intense Fort Bend sun while enhancing the curb appeal of First Colony and Sweetwater estates. We offer a curated selection of designer shingles and metal options that meet the highest HOA standards.",
        neighborhoods: ["First Colony", "Sweetwater", "New Territory", "Riverstone"],
        image: sugarLandImg,
        highlights: ["HOA Selection Assistance", "Wind-Resistant Shingle Tech", "Full System Gutters & Ventilation"],
        faqs: [
            { question: "What are the most popular roofing colors in Sugar Land?", answer: "Neutral tones like Charcoal, Weathered Wood, and Slate are common, and we carry all the major HOA-approved designer colors." },
            { question: "Do you offer financing for First Colony residents?", answer: "Yes, we provide several interest-free and low-API financing options for all Sugar Land homeowners." },
            { question: "How do you handle wind damage from Gulf storms?", answer: "We install high-profile ridge caps and 6-nail shingle patterns that are tested against 130mph sustained winds." },
            { question: "Are your estimates really virtual?", answer: "Yes! We use satellite-derived 3D models to give you an exact price without a scheduled home visit." },
            { question: "Do you replace skylights in Sugar Land homes?", answer: "Skyight replacement is a standard part of our roofing projects, using Velux leak-proof technology." },
            { question: "How long is your workmanship warranty?", answer: "We provide a 5-year 'No Leak' labor warranty in addition to a lifetime manufacturer's warranty." },
            { question: "Do you work with Fort Bend insurance adjusters?", answer: "We have long-standing relationships with area adjusters and navigate the claim process on your behalf." },
            { question: "Will you remove my old gutters?", answer: "Yes, we provide complete removal and recycling of your old gutter system as part of the project." }
        ]
    },
    "pearland": {
        title: "Pearland",
        description: "Hassle-free roofing for the fastest-growing city in the Gulf Coast.",
        longDescription: "Pearland families value time and quality. That's why we've streamlined our process to provide virtual estimates and 48-hour project completions. Our roofs are built for the long haul, utilizing hurricane-grade materials that can handle anything the Gulf throws at them.",
        neighborhoods: ["Shadow Creek Ranch", "Silverlake", "Green Tee", "Southlake"],
        image: pearlandImg,
        highlights: ["48-Hour Rapid Installation", "Insurance Claim Specialists", "Hurricane-Grade Fastening"],
        faqs: [
            { question: "How fast can you start a project in Pearland?", answer: "Once approved, we can typically have a crew on your roof within 5-7 business days." },
            { question: "Do you offer emergency tarping in Shadow Creek Ranch?", answer: "Yes, we have emergency crews stationed locally for immediate response during storm season." },
            { question: "Will your roofing help lower my AC bill?", answer: "Our Owens Corning Cool Roof shingles reflect heat, significantly reducing attic temperatures in Pearland's humid climate." },
            { question: "Can I get a quote on my lunch break?", answer: "Absolutely. Our virtual estimate process takes less than 45 minutes from start to finish." },
            { question: "Do you offer leak repairs or only full replacements?", answer: "We offer both! Our diagnostic team can find and fix leaks that other roofers miss." },
            { question: "Are your roofs compliant with Pearland wind codes?", answer: "We exceed IBC 2018 wind codes by using 6-nail patterns and high-performance underlayments." },
            { question: "Do you provide magnetic nail sweeps?", answer: "We perform three separate passes with a magnetic roller to ensure your lawn and driveway are 100% nail-free." },
            { question: "Is your business family-owned?", answer: "Yes, we are a family-owned Texas company with deep roots in the Houston-Pearland community." }
        ]
    },
    "the-woodlands": {
        title: "The Woodlands",
        description: "Eco-conscious roofing for Texas' premier wooded community.",
        longDescription: "In The Woodlands, we focus on harmony between nature and structure. Our roofing systems are specifically selected to handle high organic debris and shaded conditions. We prioritize long-lasting materials and strictly adhere to The Woodlands Township architectural standards.",
        neighborhoods: ["Creekside Park", "Sterling Ridge", "Alden Bridge", "Carlton Woods"],
        image: theWoodlandsImg,
        highlights: ["Township Guideline Experts", "Algae-Resistant Shingles", "Custom Gutter Protection"],
        faqs: [
            { question: "How do you handle pine needle debris on Woodlands roofs?", answer: "We install micro-mesh gutter guards and specialize in high-slope systems that naturally shed pine needles." },
            { question: "Do you offer algae-resistant shingles for shaded properties?", answer: "Yes, we utilize shingles with Zinc/Copper granules that prevent moss and algae growth in wooded areas." },
            { question: "Are you familiar with Carlton Woods roofing standards?", answer: "We are experts in the high-end material requirements of Carlton Woods, including specialty tile and slate." },
            { question: "Can you help with The Woodlands Township approval process?", answer: "Yes, we provide all necessary technical drawings and color samples for your RDRC application." },
            { question: "How do you protect my pool during a roof replacement?", answer: "We use a proprietary pool cover system to ensure no debris or dust enters your pool during tear-off." },
            { question: "Do you offer standing seam metal for The Woodlands?", answer: "Yes, metal roofing is increasingly popular in The Woodlands for its durability and modern look." },
            { question: "How many projects have you completed in Sterling Ridge?", answer: "We have completed over 200 roof replacements in Sterling Ridge alone this year." },
            { question: "What is your cleanup process like?", answer: "We use the 'Catch-All' system, which surrounds your home in netting to trap every piece of shingle and nail." }
        ]
    },
    "spring": {
        title: "Spring",
        description: "Reliable, high-performance roofing for Spring and Klein area homes.",
        longDescription: "From the established estates of Champion Forest to the new builds in Gleannloch Farms, Spring residents trust Cowboy Roofing for honest, expert service. We provide comprehensive roofing inspections and replacements that focus on long-term weather resistance and energy savings.",
        neighborhoods: ["Gleannloch Farms", "Champion Forest", "Windrose", "Northampton"],
        image: springImg,
        highlights: ["Local Klein Area Expertise", "Hurricane-Rated Fastening", "Transparent Virtual Estimates"],
        faqs: [
            { question: "How do you handle Klein area wind and hail storms?", answer: "We use high-impact shingles and 6-nail patterns that meet even the strictest modern building codes." },
            { question: "Do you provide services for Gleannloch Farms homes?", answer: "Yes, we are a frequent partner for roofing and exterior projects in Gleannloch Farms." },
            { question: "Can I see my roof map before I sign?", answer: "Absolutely. Our virtual estimate includes a high-res 3D map of your roof with exact measurements." },
            { question: "Do you offer solar-ready roofing?", answer: "Yes, we can prepare your roof for solar installation or recommend integrated solar tile systems." },
            { question: "What is the average cost in Champion Forest?", answer: "Most Champion Forest homes range between $15k and $25k depending on the shingle type and complexity." },
            { question: "Do you offer siding repair too?", answer: "Yes, we provide full siding replacement and repair services for Spring homeowners." },
            { question: "How do I know if I have storm damage?", answer: "We provide free virtual storm damage assessments using recent high-res aerial imagery." },
            { question: "Are your warranties transferable if I sell my home?", answer: "Yes, our warranties add value to your home sale by being fully transferable to the new owner." }
        ]
    }
};

// Default generic data for locations not explicitly detailed yet
const defaultLocation = {
    title: "Houston",
    description: "Professional roofing and exterior services for the Greater Houston area.",
    longDescription: "From the inner loop to the farthest suburbs, Cowboy Roofing provides the highest quality exterior solutions for Houston homeowners. We combine traditional Texas values with modern technology to deliver a roofing experience that is transparent, fast, and built to last.",
    neighborhoods: ["Greater Houston", "Sugar Land", "Pearland", "The Woodlands"],
    image: katyImg,
    highlights: ["Local Houston Experts", "Virtual-First Convenience", "100% Satisfaction Guarantee"],
    faqs: [
        { question: "How do I get an estimate?", answer: "Simply click 'Get Estimate' and we will use aerial imaging to provide a quote in under 45 minutes." },
        { question: "Do you offer payment plans?", answer: "Yes, we have flexible financing options to fit any budget." }
    ]
};

export default function LocationPage() {
    const { city } = useParams<{ city: string }>();
    const location = locations[city || "houston"] || defaultLocation;

    return (
        <Layout>
            <Helmet>
                <title>{`Professional Roof Replacement in ${location.title}, TX | Cowboy Roofing`}</title>
                <meta name="description" content={`Top-rated roofing services in ${location.title}. ${location.description} Expert installation, insurance assistance, and virtual estimates.`} />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: `url(${location.image})` }}>
                <div className="absolute inset-0 bg-overlay-gradient" />
                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm border border-accent/30">
                            <MapPin className="w-4 h-4" /> Trusted in {location.title}, TX
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 font-display uppercase tracking-tight">
                            The New Standard for <br />
                            <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30">Roofing in {location.title}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed mb-10 max-w-2xl">
                            {location.description} Experience the Cowboy Standard: Fast, Transparent, and Hurricane-Proof.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto" asChild>
                                <Link to="/contact">Get My Instant Quote</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm" asChild>
                                <Link to="/portfolio">View {location.title} Projects</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Localized Value Prop */}
            <section className="py-24 bg-background">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div className="inline-block p-3 rounded-2xl bg-secondary">
                                <ShieldCheck className="w-12 h-12 text-accent" />
                            </div>
                            <h2 className="text-4xl font-bold text-foreground font-display uppercase tracking-tight">
                                Why {location.title} Homeowners <br />Choose the Cowboy Way
                            </h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                {location.longDescription}
                            </p>

                            <div className="grid sm:grid-cols-1 gap-6 pt-4">
                                {location.highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/50 border border-border/50">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground">{item}</h4>
                                            <p className="text-muted-foreground">Tailored specifically for the unique architectural and weather needs of {location.title}.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-secondary border border-border shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Star className="w-6 h-6 text-accent fill-accent" />
                                    Priority Neighborhoods in {location.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {location.neighborhoods.map(hood => (
                                        <div key={hood} className="flex items-center gap-2 px-4 py-3 bg-background rounded-xl text-sm font-medium border border-border hover:border-accent hover:text-accent transition-all cursor-default">
                                            <div className="w-2 h-2 rounded-full bg-accent/20" />
                                            {hood}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-border">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-secondary bg-slate-${2 + i}00`} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            <span className="text-foreground font-bold">150+ Projects</span> completed in {location.title} this year.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl border border-border bg-background hover:border-accent/30 transition-colors">
                                    <Zap className="w-8 h-8 text-accent mb-4" />
                                    <h5 className="font-bold mb-1">45-Min Quote</h5>
                                    <p className="text-xs text-muted-foreground">Virtual scanning for instant accuracy.</p>
                                </div>
                                <div className="p-6 rounded-2xl border border-border bg-background hover:border-accent/30 transition-colors">
                                    <Heart className="w-8 h-8 text-accent mb-4" />
                                    <h5 className="font-bold mb-1">Local Craft</h5>
                                    <p className="text-xs text-muted-foreground">Family-owned, community-centered.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Localized FAQ Section */}
            <section className="py-24 bg-secondary/30">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-semibold text-sm uppercase tracking-wider">Expert Insights</span>
                        <h2 className="text-4xl font-bold text-foreground mt-4 mb-6 font-display uppercase tracking-tight">
                            Common Questions for {location.title} Homeowners
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            We've answered the most frequent questions from your neighbors in {location.title} about costs, materials, and process.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="space-y-4">
                            {location.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-2xl px-8 py-2 border border-border hover:border-accent/30 transition-all shadow-sm">
                                    <AccordionTrigger className="text-left font-bold text-lg hover:text-accent hover:no-underline py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            <CTASection />
        </Layout>
    );
}
