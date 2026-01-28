import { Building2, Wrench, HardHat, Warehouse, ShieldAlert, Hammer, AppWindow, Ruler } from "lucide-react";

export const commercialServices = {
    "roofing": {
        title: "Commercial Roofing Services",
        description: "Comprehensive roofing solutions for Houston businesses, industrial facilities, and multi-family properties.",
        fullDescription: "Protect your bottom line with commercial roofing built for Texas weather. From TPO to metal, we deliver industrial-grade durability with minimal business disruption.",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1590400976239-2d7c07da1b1f?auto=format&fit=crop&q=80",
        features: [
            "Industrial & Warehouse Roofing",
            "Retail & Office Complexes",
            "Multi-Family & HOA Compliance",
            "Leak Detection & Maintenance Plans"
        ],
        benefits: [
            {
                title: "Minimize Downtime",
                description: "We work around your schedule to ensure your operations continue smoothly during repairs or replacement."
            },
            {
                title: "Energy Efficiency",
                description: "Cool roof systems (TPO/PVC) that reduce utility costs and lower the heat load on your HVAC systems."
            },
            {
                title: "Long-Term ROI",
                description: "Durable materials and commercial-grade warranties designed to maximize the lifespan of your asset."
            }
        ],
        process: [
            {
                title: "Site Assessment",
                description: "Comprehensive inspection of the existing roof system, drainage, and structural integrity."
            },
            {
                title: "Custom Proposal",
                description: "Detailed scope of work with material options, timelines, and transparent pricing."
            },
            {
                title: "Professional Execution",
                description: "OSHA-compliant installation by certified commercial roofing crews."
            },
            {
                title: "Final Inspection",
                description: " rigorous quality control walkthrough and warranty issuance."
            }
        ]
    },
    "roof-repair": {
        title: "Commercial Roof Repair",
        description: "Rapid response leak repair and maintenance for commercial properties.",
        fullDescription: "Don't let a leak disrupt your business. Our emergency commercial repair teams identify and stop water intrusion fast, preventing inventory loss and structural damage.",
        icon: Wrench,
        image: "https://images.unsplash.com/photo-1632759132029-4d6d63946027?auto=format&fit=crop&q=80",
        features: [
            "24/7 Emergency Response",
            "Ponding Water Correction",
            "Flashing & Penetration Repairs",
            "Storm Damage Mitigation"
        ],
        benefits: [
            {
                title: "Stop Water Intrusion",
                description: "Immediate temporary sealing followed by permanent repairs to protect your assets."
            },
            {
                title: "Extend Roof Life",
                description: "Proactive repairs prevent minor issues from becoming capital expenditure replacements."
            }
        ]
    },
    "roof-replacement": {
        title: "Commercial Roof Replacement",
        description: "Expert installation of TPO, PVC, and Flat Roof systems.",
        fullDescription: "When it's time to replace, choose a partner who understands commercial needs. We specialize in TPO, PVC, and EPDM flat roof systems that offer superior durability and energy savings.",
        icon: HardHat,
        image: "https://images.unsplash.com/photo-1517646331032-9e8563c523a1?auto=format&fit=crop&q=80",
        features: [
            "TPO & PVC Single-Ply membranes",
            "Modified Bitumen",
            "Roof Coatings & Restorations",
            "NDL (No Dollar Limit) Warranties"
        ],
        benefits: [
            {
                title: "Energy Cost Reduction",
                description: "Reflective white membranes can significantly lower cooling costs in Houston's heat."
            },
            {
                title: "Leak-Free Guarantee",
                description: "Heat-welded seams provide a monolithic, waterproof barrier against standing water."
            }
        ]
    },
    "multi-family": {
        title: "Multi-Family & HOA Roofing",
        description: "Scalable roofing solutions for apartments, condos, and managed communities.",
        fullDescription: "We partner with property managers and HOAs to deliver large-scale roofing projects on time and on budget. We handle tenant communications and site safety to ensure a smooth process.",
        icon: Warehouse,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
        features: [
            "Apartment Complexes",
            "Condominium Associations",
            "Townhome Communities",
            "Budget Planning & CapEx Consulting"
        ],
        benefits: [
            {
                title: "Tenant Safety First",
                description: "Strict safety protocols and clean jobsites to protect residents and liability."
            },
            {
                title: "Uniform Aesthetics",
                description: "Consistent material selection and installation for enhanced curb appeal across the community."
            }
        ]
    },
    "metal-roofing": {
        title: "Commercial Metal Roofing",
        description: "High-performance standing seam and architectural metal roofing.",
        fullDescription: "Combine industrial durability with premium aesthetics. Our commercial metal roofing systems resist wind, fire, and impact, making them ideal for retail centers and office buildings.",
        icon: ShieldAlert,
        image: "https://images.unsplash.com/photo-1618386828590-db876c24388e?auto=format&fit=crop&q=80",
        features: [
            "Standing Seam Metal",
            "R-Panel / PBR",
            "Architectural Metal Siding",
            "Custom Fabricated Trim"
        ],
        benefits: [
            {
                title: "Extreme Durability",
                description: "Resistant to hail, high winds, and fire, often lowering insurance premiums."
            },
            {
                title: "Low Maintenance",
                description: "Metal roofs can last 40+ years with minimal upkeep required."
            }
        ]
    },
    "siding": {
        title: "Commercial Siding",
        description: "Durable fiber cement and metal siding for commercial structures.",
        fullDescription: "Upgrade your building's exterior with James Hardie fiber cement or commercial metal siding. We improve energy efficiency and modernize the look of aging commercial properties.",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80",
        features: [
            "James Hardie Fiber Cement",
            "Commercial Metal Wall Panels",
            "Vinyl Siding (Multi-Family)",
            "Exterior Cladding Solutions"
        ],
        benefits: [
            {
                title: "Curb Appeal Update",
                description: "Modern materials and colors that attract high-value tenants and customers."
            },
            {
                title: "Weather Resistance",
                description: "Materials engineered to withstand Houston humidity, rot, and pests."
            }
        ]
    },
    "windows": {
        title: "Commercial Windows",
        description: "Energy-efficient glazing and storefront replacements.",
        fullDescription: "Reduce noise and energy costs with high-performance commercial windows. We specialize in multi-story window replacement and storefront glass upgrades.",
        icon: AppWindow,
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
        features: [
            "Storefront Glass",
            "Multi-Family Window Replacement",
            "Impact-Resistant Glass",
            "Energy Star Rated Units"
        ],
        benefits: [
            {
                title: "Security & Safety",
                description: "Laminated and tempered glass options for enhanced security and impact resistance."
            },
            {
                title: "Noise Reduction",
                description: "Sound-dampening glass ideal for properties near highways or busy streets."
            }
        ]
    },
    "gutters": {
        title: "Commercial Gutters",
        description: "Industrial box gutters and drainage systems.",
        fullDescription: "Proper drainage is critical for large roof surface areas. We install box gutters, downspouts, and custom drainage solutions designed to handle heavy Texas downpours.",
        icon: Ruler,
        image: "https://images.unsplash.com/photo-1621255760824-2c5e53381a1a?auto=format&fit=crop&q=80",
        features: [
            "Box Gutters",
            "Custom Fabricated Downspouts",
            "Scuppers & Collector Heads",
            "Leaf Protection Systems"
        ],
        benefits: [
            {
                title: "Foundation Protection",
                description: "Directs water away from the building foundation, preventing shifting and structural damage."
            },
            {
                title: "High Capacity",
                description: "Systems designed to manage high volumes of water runoff from large commercial roofs."
            }
        ]
    }
};
