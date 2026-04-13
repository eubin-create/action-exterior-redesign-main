// SolarClaw — Mock Data & Types

export type UrgencyLabel = "Critical" | "Aging" | "Newer";
export type ProposalStatus = "Sent" | "Opened" | "Replied" | "Pending";
export type PipelineStatus =
  | "scanned"
  | "scored"
  | "solar_analyzed"
  | "owner_found"
  | "itc_calculated"
  | "rendered"
  | "proposal_sent";

export interface Owner {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  deliverability: number; // 0-100
}

export interface ITC {
  systemCost: number;
  federalItc: number; // base 30%
  maxItc: number; // with all bonuses 50%
  savings25yr: number;
  paybackYears: number;
  safeHarborDeadline: string;
}

export interface SolarData {
  panelCount: number;
  systemKw: number;
  annualKwh: number;
  sunHoursPerYear: number;
  roofSqft: number;
  maxArrayAreaM2: number;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  yearBuilt: number;
  roofAge: number;
  urgencyScore: number;
  urgencyLabel: UrgencyLabel;
  painSignals: string[];
  pipelineStatus: PipelineStatus;
  solar: SolarData;
  owner: Owner;
  itc: ITC;
  proposalStatus: ProposalStatus;
  proposalSentAt?: string;
  roofRenderUrl?: string;
  footprintPolygon: [number, number][];
}

export type ActivityEventType =
  | "roof_captured"
  | "aging_detected"
  | "solar_scored"
  | "owner_identified"
  | "email_verified"
  | "itc_calculated"
  | "pain_signal"
  | "proposal_sent"
  | "proposal_opened"
  | "campaign_started"
  | "error";

export interface ActivityEvent {
  id: string;
  buildingId: string;
  buildingName: string;
  type: ActivityEventType;
  message: string;
  detail?: string;
  timestamp: string;
  icon: string;
}

export interface Campaign {
  id: string;
  name: string;
  city: string;
  state: string;
  radiusMiles: number;
  status: "running" | "paused" | "complete";
  startedAt: string;
  buildingsScanned: number;
  buildingsQualified: number;
  proposalsSent: number;
  totalPipelineValue: number;
}

// ─── Mock Buildings ────────────────────────────────────────────────────────────

export const BUILDINGS: Building[] = [
  {
    id: "bldg-001",
    name: "Shamrock Foods Company",
    address: "3900 E Camelback Rd",
    city: "Phoenix",
    state: "AZ",
    lat: 33.5096,
    lng: -112.0027,
    yearBuilt: 1978,
    roofAge: 48,
    urgencyScore: 96,
    urgencyLabel: "Critical",
    painSignals: [
      "Family-owned since 1922",
      "24/7 refrigeration load",
      "620,000 sqft warehouse",
      "Food processing & distribution",
    ],
    pipelineStatus: "proposal_sent",
    solar: {
      panelCount: 9750,
      systemKw: 3900,
      annualKwh: 7_020_000,
      sunHoursPerYear: 3872,
      roofSqft: 620_000,
      maxArrayAreaM2: 57_600,
    },
    owner: {
      name: "Kent McClelland",
      title: "President & CEO",
      company: "Shamrock Foods Company",
      email: "k.mcclelland@shamrockfoods.com",
      phone: "+1 (602) 477-2800",
      emailVerified: true,
      deliverability: 98,
    },
    itc: {
      systemCost: 10_920_000,
      federalItc: 3_276_000,
      maxItc: 5_460_000,
      savings25yr: 25_272_000,
      paybackYears: 3.2,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Opened",
    proposalSentAt: "2026-04-10T09:14:22Z",
    footprintPolygon: [
      [33.5094, -112.0031],
      [33.5098, -112.0031],
      [33.5098, -112.0023],
      [33.5094, -112.0023],
    ],
  },
  {
    id: "bldg-002",
    name: "Mesa Cold Storage LLC",
    address: "1245 N Dobson Rd",
    city: "Mesa",
    state: "AZ",
    lat: 33.4372,
    lng: -111.8851,
    yearBuilt: 1987,
    roofAge: 39,
    urgencyScore: 84,
    urgencyLabel: "Critical",
    painSignals: [
      "Refrigerated storage 24/7",
      "High electricity load",
      "Owned by Vasquez family",
    ],
    pipelineStatus: "itc_calculated",
    solar: {
      panelCount: 4200,
      systemKw: 1680,
      annualKwh: 3_024_000,
      sunHoursPerYear: 3780,
      roofSqft: 268_000,
      maxArrayAreaM2: 24_800,
    },
    owner: {
      name: "Carlos Vasquez",
      title: "Owner & General Manager",
      company: "Mesa Cold Storage LLC",
      email: "cvasquez@mesacoldstorage.com",
      phone: "+1 (480) 833-1900",
      emailVerified: true,
      deliverability: 94,
    },
    itc: {
      systemCost: 4_704_000,
      federalItc: 1_411_200,
      maxItc: 2_352_000,
      savings25yr: 10_886_400,
      paybackYears: 3.8,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Pending",
    footprintPolygon: [
      [33.437, -111.8855],
      [33.4374, -111.8855],
      [33.4374, -111.8847],
      [33.437, -111.8847],
    ],
  },
  {
    id: "bldg-003",
    name: "Southwest Beverage Distributors",
    address: "5900 W McDowell Rd",
    city: "Phoenix",
    state: "AZ",
    lat: 33.4773,
    lng: -112.1671,
    yearBuilt: 1994,
    roofAge: 32,
    urgencyScore: 72,
    urgencyLabel: "Aging",
    painSignals: [
      "Regional beverage distributor",
      "Fleet charging facility",
      "Manufacturing & processing",
    ],
    pipelineStatus: "owner_found",
    solar: {
      panelCount: 2850,
      systemKw: 1140,
      annualKwh: 2_052_000,
      sunHoursPerYear: 3890,
      roofSqft: 182_000,
      maxArrayAreaM2: 16_900,
    },
    owner: {
      name: "Rachel Torres",
      title: "VP Operations",
      company: "Southwest Beverage Distributors",
      email: "r.torres@swbev.com",
      phone: "+1 (623) 247-0055",
      emailVerified: true,
      deliverability: 91,
    },
    itc: {
      systemCost: 3_192_000,
      federalItc: 957_600,
      maxItc: 1_596_000,
      savings25yr: 7_387_200,
      paybackYears: 4.1,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Pending",
    footprintPolygon: [
      [33.4771, -112.1675],
      [33.4775, -112.1675],
      [33.4775, -112.1667],
      [33.4771, -112.1667],
    ],
  },
  {
    id: "bldg-004",
    name: "Desert Sun Manufacturing",
    address: "2200 S 75th Ave",
    city: "Phoenix",
    state: "AZ",
    lat: 33.4249,
    lng: -112.2311,
    yearBuilt: 2001,
    roofAge: 25,
    urgencyScore: 68,
    urgencyLabel: "Aging",
    painSignals: ["Heavy manufacturing load", "Metal fabrication"],
    pipelineStatus: "solar_analyzed",
    solar: {
      panelCount: 1950,
      systemKw: 780,
      annualKwh: 1_404_000,
      sunHoursPerYear: 3820,
      roofSqft: 124_000,
      maxArrayAreaM2: 11_500,
    },
    owner: {
      name: "Doug Hartley",
      title: "President",
      company: "Desert Sun Manufacturing",
      email: "dhartley@desertsunmfg.com",
      phone: "+1 (602) 936-7100",
      emailVerified: false,
      deliverability: 77,
    },
    itc: {
      systemCost: 2_184_000,
      federalItc: 655_200,
      maxItc: 1_092_000,
      savings25yr: 5_054_400,
      paybackYears: 4.7,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Pending",
    footprintPolygon: [
      [33.4247, -112.2315],
      [33.4251, -112.2315],
      [33.4251, -112.2307],
      [33.4247, -112.2307],
    ],
  },
  {
    id: "bldg-005",
    name: "Pinnacle Logistics Center",
    address: "1880 N 83rd Ave",
    city: "Glendale",
    state: "AZ",
    lat: 33.5532,
    lng: -112.2431,
    yearBuilt: 2005,
    roofAge: 21,
    urgencyScore: 62,
    urgencyLabel: "Aging",
    painSignals: ["E-commerce fulfillment", "24/7 operations"],
    pipelineStatus: "scored",
    solar: {
      panelCount: 6800,
      systemKw: 2720,
      annualKwh: 4_896_000,
      sunHoursPerYear: 3851,
      roofSqft: 433_000,
      maxArrayAreaM2: 40_200,
    },
    owner: {
      name: "Patricia Nguyen",
      title: "Director of Facilities",
      company: "Pinnacle Logistics Inc.",
      email: "p.nguyen@pinnaclelogistics.com",
      phone: "+1 (623) 931-4422",
      emailVerified: false,
      deliverability: 82,
    },
    itc: {
      systemCost: 7_616_000,
      federalItc: 2_284_800,
      maxItc: 3_808_000,
      savings25yr: 17_625_600,
      paybackYears: 3.9,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Pending",
    footprintPolygon: [
      [33.553, -112.2435],
      [33.5534, -112.2435],
      [33.5534, -112.2427],
      [33.553, -112.2427],
    ],
  },
  {
    id: "bldg-006",
    name: "AZ Industrial Park — Unit C",
    address: "7040 S 40th St",
    city: "Phoenix",
    state: "AZ",
    lat: 33.3848,
    lng: -112.0521,
    yearBuilt: 2009,
    roofAge: 17,
    urgencyScore: 48,
    urgencyLabel: "Newer",
    painSignals: ["Multi-tenant industrial"],
    pipelineStatus: "scanned",
    solar: {
      panelCount: 1100,
      systemKw: 440,
      annualKwh: 792_000,
      sunHoursPerYear: 3800,
      roofSqft: 70_000,
      maxArrayAreaM2: 6_500,
    },
    owner: {
      name: "Mark Sullivan",
      title: "Property Manager",
      company: "AZ Industrial Partners",
      email: "msullivan@azindpartners.com",
      phone: "+1 (602) 276-1800",
      emailVerified: false,
      deliverability: 68,
    },
    itc: {
      systemCost: 1_232_000,
      federalItc: 369_600,
      maxItc: 616_000,
      savings25yr: 2_851_200,
      paybackYears: 5.8,
      safeHarborDeadline: "Jul 4, 2026",
    },
    proposalStatus: "Pending",
    footprintPolygon: [
      [33.3846, -112.0525],
      [33.385, -112.0525],
      [33.385, -112.0517],
      [33.3846, -112.0517],
    ],
  },
];

// ─── Mock Activity Feed ────────────────────────────────────────────────────────

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    id: "evt-001",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "campaign_started",
    message: "Campaign started — Phoenix Metro",
    detail: "Scanning commercial buildings within 10-mile radius",
    timestamp: "2026-04-10T08:00:00Z",
    icon: "🚀",
  },
  {
    id: "evt-002",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "roof_captured",
    message: "Roof captured — Shamrock Foods Company",
    detail: "620,000 sqft via satellite imagery · Phoenix, AZ",
    timestamp: "2026-04-10T08:01:14Z",
    icon: "🛰️",
  },
  {
    id: "evt-003",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "aging_detected",
    message: "Aging detected — Shamrock Foods Company",
    detail: "Built 1978 · roof age ~48 years · Critical threshold exceeded",
    timestamp: "2026-04-10T08:01:22Z",
    icon: "⚠️",
  },
  {
    id: "evt-004",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "solar_scored",
    message: "Solar viability scored — Shamrock Foods",
    detail: "3,900 kW system · 3,872 sun hrs/yr · $25.3M 25-yr savings",
    timestamp: "2026-04-10T08:01:35Z",
    icon: "☀️",
  },
  {
    id: "evt-005",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "owner_identified",
    message: "Owner identified — Kent McClelland",
    detail: "President & CEO · Shamrock Foods Company",
    timestamp: "2026-04-10T08:01:48Z",
    icon: "👤",
  },
  {
    id: "evt-006",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "pain_signal",
    message: "Pain signal logged — Shamrock Foods",
    detail: "Family-owned since 1922 · 24/7 refrigeration load · 620,000 sqft warehouse",
    timestamp: "2026-04-10T08:01:55Z",
    icon: "📌",
  },
  {
    id: "evt-007",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "email_verified",
    message: "Email verified — k.mcclelland@shamrockfoods.com",
    detail: "98% deliverable · SMTP check passed",
    timestamp: "2026-04-10T08:02:04Z",
    icon: "✅",
  },
  {
    id: "evt-008",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "itc_calculated",
    message: "ITC stack calculated — Shamrock Foods",
    detail: "$3.3M federal credit locked if safe harbor met by Jul 4",
    timestamp: "2026-04-10T08:02:18Z",
    icon: "💰",
  },
  {
    id: "evt-009",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "proposal_sent",
    message: "Proposal sent — Kent McClelland",
    detail: "k.mcclelland@shamrockfoods.com · 9:14 AM",
    timestamp: "2026-04-10T09:14:22Z",
    icon: "📧",
  },
  {
    id: "evt-010",
    buildingId: "bldg-001",
    buildingName: "Shamrock Foods Company",
    type: "proposal_opened",
    message: "Proposal opened — Kent McClelland",
    detail: "Opened 3× · Last viewed 11:42 AM",
    timestamp: "2026-04-10T11:42:07Z",
    icon: "👁️",
  },
  {
    id: "evt-011",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "roof_captured",
    message: "Roof captured — Mesa Cold Storage LLC",
    detail: "268,000 sqft via satellite imagery · Mesa, AZ",
    timestamp: "2026-04-10T08:03:00Z",
    icon: "🛰️",
  },
  {
    id: "evt-012",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "aging_detected",
    message: "Aging detected — Mesa Cold Storage",
    detail: "Built 1987 · roof age ~39 years · Critical threshold exceeded",
    timestamp: "2026-04-10T08:03:08Z",
    icon: "⚠️",
  },
  {
    id: "evt-013",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "solar_scored",
    message: "Solar viability scored — Mesa Cold Storage",
    detail: "1,680 kW system · 3,780 sun hrs/yr · $10.9M 25-yr savings",
    timestamp: "2026-04-10T08:03:21Z",
    icon: "☀️",
  },
  {
    id: "evt-014",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "owner_identified",
    message: "Owner identified — Carlos Vasquez",
    detail: "Owner & General Manager · Mesa Cold Storage LLC",
    timestamp: "2026-04-10T08:03:34Z",
    icon: "👤",
  },
  {
    id: "evt-015",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "email_verified",
    message: "Email verified — cvasquez@mesacoldstorage.com",
    detail: "94% deliverable · SMTP check passed",
    timestamp: "2026-04-10T08:03:44Z",
    icon: "✅",
  },
  {
    id: "evt-016",
    buildingId: "bldg-002",
    buildingName: "Mesa Cold Storage LLC",
    type: "itc_calculated",
    message: "ITC stack calculated — Mesa Cold Storage",
    detail: "$1.4M federal credit locked if safe harbor met by Jul 4",
    timestamp: "2026-04-10T08:03:58Z",
    icon: "💰",
  },
  {
    id: "evt-017",
    buildingId: "bldg-003",
    buildingName: "Southwest Beverage Distributors",
    type: "roof_captured",
    message: "Roof captured — Southwest Beverage Distributors",
    detail: "182,000 sqft via satellite imagery · Phoenix, AZ",
    timestamp: "2026-04-10T08:05:00Z",
    icon: "🛰️",
  },
  {
    id: "evt-018",
    buildingId: "bldg-003",
    buildingName: "Southwest Beverage Distributors",
    type: "aging_detected",
    message: "Aging detected — Southwest Beverage",
    detail: "Built 1994 · roof age ~32 years · Aging threshold met",
    timestamp: "2026-04-10T08:05:09Z",
    icon: "⚠️",
  },
  {
    id: "evt-019",
    buildingId: "bldg-003",
    buildingName: "Southwest Beverage Distributors",
    type: "solar_scored",
    message: "Solar viability scored — Southwest Beverage",
    detail: "1,140 kW system · 3,890 sun hrs/yr · $7.4M 25-yr savings",
    timestamp: "2026-04-10T08:05:22Z",
    icon: "☀️",
  },
  {
    id: "evt-020",
    buildingId: "bldg-003",
    buildingName: "Southwest Beverage Distributors",
    type: "owner_identified",
    message: "Owner identified — Rachel Torres",
    detail: "VP Operations · Southwest Beverage Distributors",
    timestamp: "2026-04-10T08:05:35Z",
    icon: "👤",
  },
  {
    id: "evt-021",
    buildingId: "bldg-004",
    buildingName: "Desert Sun Manufacturing",
    type: "roof_captured",
    message: "Roof captured — Desert Sun Manufacturing",
    detail: "124,000 sqft via satellite imagery · Phoenix, AZ",
    timestamp: "2026-04-10T08:07:00Z",
    icon: "🛰️",
  },
  {
    id: "evt-022",
    buildingId: "bldg-004",
    buildingName: "Desert Sun Manufacturing",
    type: "solar_scored",
    message: "Solar viability scored — Desert Sun Mfg",
    detail: "780 kW system · 3,820 sun hrs/yr · $5.1M 25-yr savings",
    timestamp: "2026-04-10T08:07:15Z",
    icon: "☀️",
  },
  {
    id: "evt-023",
    buildingId: "bldg-005",
    buildingName: "Pinnacle Logistics Center",
    type: "roof_captured",
    message: "Roof captured — Pinnacle Logistics Center",
    detail: "433,000 sqft via satellite imagery · Glendale, AZ",
    timestamp: "2026-04-10T08:09:00Z",
    icon: "🛰️",
  },
  {
    id: "evt-024",
    buildingId: "bldg-005",
    buildingName: "Pinnacle Logistics Center",
    type: "aging_detected",
    message: "Aging detected — Pinnacle Logistics",
    detail: "Built 2005 · roof age ~21 years · Aging threshold met",
    timestamp: "2026-04-10T08:09:09Z",
    icon: "⚠️",
  },
];

// ─── Mock Campaign ─────────────────────────────────────────────────────────────

export const ACTIVE_CAMPAIGN: Campaign = {
  id: "camp-001",
  name: "Phoenix Metro Q2 2026",
  city: "Phoenix",
  state: "AZ",
  radiusMiles: 10,
  status: "running",
  startedAt: "2026-04-10T08:00:00Z",
  buildingsScanned: 2847,
  buildingsQualified: 6,
  proposalsSent: 1,
  totalPipelineValue: 69_276_000,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

export function urgencyColor(label: UrgencyLabel): string {
  switch (label) {
    case "Critical":
      return "text-red-400";
    case "Aging":
      return "text-amber-400";
    case "Newer":
      return "text-emerald-400";
  }
}

export function urgencyBg(label: UrgencyLabel): string {
  switch (label) {
    case "Critical":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "Aging":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "Newer":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  }
}

export function pipelineLabel(status: PipelineStatus): string {
  const map: Record<PipelineStatus, string> = {
    scanned: "Scanned",
    scored: "Roof Scored",
    solar_analyzed: "Solar Analyzed",
    owner_found: "Owner Found",
    itc_calculated: "ITC Calculated",
    rendered: "Rendered",
    proposal_sent: "Proposal Sent",
  };
  return map[status];
}

export function proposalStatusBg(status: ProposalStatus): string {
  switch (status) {
    case "Sent":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "Opened":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Replied":
      return "bg-violet-500/15 text-violet-400 border-violet-500/30";
    case "Pending":
      return "bg-zinc-700/50 text-zinc-400 border-zinc-600/30";
  }
}

export function activityTypeColor(type: ActivityEventType): string {
  const map: Record<ActivityEventType, string> = {
    campaign_started: "text-violet-400",
    roof_captured: "text-sky-400",
    aging_detected: "text-amber-400",
    solar_scored: "text-yellow-400",
    owner_identified: "text-blue-400",
    email_verified: "text-emerald-400",
    itc_calculated: "text-green-400",
    pain_signal: "text-pink-400",
    proposal_sent: "text-indigo-400",
    proposal_opened: "text-teal-400",
    error: "text-red-400",
  };
  return map[type];
}
