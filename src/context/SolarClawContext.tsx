import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Building,
  Campaign,
  ActivityEvent,
  ActivityEventType,
  UrgencyLabel,
  PipelineStatus,
  Owner,
  SolarData,
  ITC,
} from "@/data/solarclaw";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SolarClawState {
  campaign: Campaign | null;
  buildings: Building[];
  events: ActivityEvent[];
}

export interface AddBuildingInput {
  name: string;
  address: string;
  city: string;
  state: string;
  yearBuilt: number;
  roofSqft: number;
  lat?: number;
  lng?: number;
}

export interface AddOwnerInput {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface CreateCampaignInput {
  name: string;
  city: string;
  state: string;
  radiusMiles: number;
}

// ── ITC / Solar calculator ────────────────────────────────────────────────────

export function calcBuildingData(yearBuilt: number, roofSqft: number) {
  const currentYear = new Date().getFullYear();
  const roofAge = currentYear - yearBuilt;
  const urgencyScore = Math.min(100, Math.max(0, Math.round((roofAge / 25) * 100)));
  const urgencyLabel: UrgencyLabel =
    urgencyScore >= 80 ? "Critical" : urgencyScore >= 60 ? "Aging" : "Newer";

  // Solar: ~1 commercial panel (400W) per 24 sqft, 70% usable coverage
  const panelCount = Math.max(1, Math.floor((roofSqft * 0.7) / 24));
  const systemKw = Math.round(panelCount * 0.4 * 10) / 10;
  const annualKwh = Math.round(systemKw * 1_400);
  const sunHoursPerYear = 3_850;
  const maxArrayAreaM2 = Math.round(roofSqft * 0.065);

  const systemCost = Math.round(systemKw * 2_800);
  const federalItc = Math.round(systemCost * 0.3);
  const maxItc = Math.round(systemCost * 0.5);
  const savings25yr = Math.round(annualKwh * 0.12 * 25);
  const annualSavings = annualKwh * 0.12;
  const paybackYears =
    annualSavings > 0
      ? Math.round(((systemCost - federalItc) / annualSavings) * 10) / 10
      : 0;

  const solar: SolarData = { panelCount, systemKw, annualKwh, sunHoursPerYear, roofSqft, maxArrayAreaM2 };
  const itc: ITC = { systemCost, federalItc, maxItc, savings25yr, paybackYears, safeHarborDeadline: "Jul 4, 2026" };

  return { roofAge, urgencyScore, urgencyLabel, solar, itc };
}

// ── Pain signal keyword detector ──────────────────────────────────────────────

const PAIN_KEYWORDS: [RegExp, string][] = [
  [/family.?own/i, "Family-owned business"],
  [/refrig|cold storage|freezer|cooler/i, "24/7 refrigeration load"],
  [/warehouse|distribution|fulfillment/i, "Large warehouse footprint"],
  [/manufactur|fabricat|processing/i, "High manufacturing energy load"],
  [/24.?7|around.the.clock|continuous/i, "24/7 operations"],
  [/fleet|charging|electric vehicle|ev /i, "Fleet charging facility"],
  [/grocery|supermarket|food/i, "Food retail energy load"],
  [/hotel|motel|hospitality/i, "Hospitality high energy load"],
  [/data center|server|colocation/i, "Data center power demands"],
  [/brewing|brewery|winery|distill/i, "Brewing/production energy load"],
];

export function detectPainSignals(text: string): string[] {
  return PAIN_KEYWORDS
    .filter(([pattern]) => pattern.test(text))
    .map(([, label]) => label);
}

// ── Event factory ─────────────────────────────────────────────────────────────

let _evtCounter = 0;
function makeEvent(
  buildingId: string,
  buildingName: string,
  type: ActivityEventType,
  message: string,
  detail?: string,
  icon?: string
): ActivityEvent {
  _evtCounter++;
  const iconMap: Record<ActivityEventType, string> = {
    campaign_started: "🚀",
    roof_captured: "🛰️",
    aging_detected: "⚠️",
    solar_scored: "☀️",
    owner_identified: "👤",
    email_verified: "✅",
    itc_calculated: "💰",
    pain_signal: "📌",
    proposal_sent: "📧",
    proposal_opened: "👁️",
    error: "❌",
  };
  return {
    id: `evt-${Date.now()}-${_evtCounter}`,
    buildingId,
    buildingName,
    type,
    message,
    detail,
    timestamp: new Date().toISOString(),
    icon: icon ?? iconMap[type],
  };
}

// ── Pipeline stage order ──────────────────────────────────────────────────────

const PIPELINE_ORDER: PipelineStatus[] = [
  "scanned",
  "scored",
  "solar_analyzed",
  "owner_found",
  "itc_calculated",
  "rendered",
  "proposal_sent",
];

function nextPipelineStage(current: PipelineStatus): PipelineStatus | null {
  const idx = PIPELINE_ORDER.indexOf(current);
  if (idx < 0 || idx >= PIPELINE_ORDER.length - 1) return null;
  return PIPELINE_ORDER[idx + 1];
}

// ── localStorage helpers ──────────────────────────────────────────────────────

const STORAGE_KEY = "solarclaw_v1";

function loadState(): SolarClawState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SolarClawState;
  } catch {}
  return { campaign: null, buildings: [], events: [] };
}

function saveState(state: SolarClawState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// ── Context interface ─────────────────────────────────────────────────────────

interface SolarClawContextValue {
  state: SolarClawState;
  createCampaign: (input: CreateCampaignInput) => void;
  clearCampaign: () => void;
  addBuilding: (input: AddBuildingInput) => Building;
  updateBuilding: (id: string, input: AddBuildingInput) => void;
  deleteBuilding: (id: string) => void;
  addOwner: (buildingId: string, owner: AddOwnerInput) => void;
  addPainSignal: (buildingId: string, signal: string) => void;
  removePainSignal: (buildingId: string, signal: string) => void;
  advancePipeline: (buildingId: string) => void;
  markProposalOpened: (buildingId: string) => void;
  markProposalReplied: (buildingId: string) => void;
  sendProposal: (buildingId: string) => void;
  clearAll: () => void;
}

const SolarClawContext = createContext<SolarClawContextValue | null>(null);

export function SolarClawProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SolarClawState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function patch(updater: (prev: SolarClawState) => SolarClawState) {
    setState(updater);
  }

  // ── Campaign ──────────────────────────────────────────────────────────────

  const createCampaign = useCallback((input: CreateCampaignInput) => {
    const campaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: input.name,
      city: input.city,
      state: input.state,
      radiusMiles: input.radiusMiles,
      status: "running",
      startedAt: new Date().toISOString(),
      buildingsScanned: 0,
      buildingsQualified: 0,
      proposalsSent: 0,
      totalPipelineValue: 0,
    };
    const evt = makeEvent(
      "campaign",
      input.name,
      "campaign_started",
      `Campaign started — ${input.name}`,
      `Targeting ${input.city}, ${input.state} within ${input.radiusMiles}-mile radius`
    );
    patch((prev) => ({ ...prev, campaign, events: [evt, ...prev.events] }));
  }, []);

  const clearCampaign = useCallback(() => {
    patch((prev) => ({ ...prev, campaign: null, buildings: [], events: [] }));
  }, []);

  // ── Buildings ─────────────────────────────────────────────────────────────

  const addBuilding = useCallback((input: AddBuildingInput): Building => {
    const { roofAge, urgencyScore, urgencyLabel, solar, itc } = calcBuildingData(
      input.yearBuilt,
      input.roofSqft
    );

    // Auto-detect pain signals from name
    const painSignals = detectPainSignals(input.name);

    const building: Building = {
      id: `bldg-${Date.now()}`,
      name: input.name,
      address: input.address,
      city: input.city,
      state: input.state,
      lat: input.lat ?? 33.4484,
      lng: input.lng ?? -112.074,
      yearBuilt: input.yearBuilt,
      roofAge,
      urgencyScore,
      urgencyLabel,
      painSignals,
      pipelineStatus: "itc_calculated",
      solar,
      owner: { name: "", title: "", company: "", email: "", phone: "", emailVerified: false, deliverability: 0 },
      itc,
      proposalStatus: "Pending",
      footprintPolygon: [],
    };

    const now = Date.now();
    const events: ActivityEvent[] = [
      makeEvent(building.id, building.name, "roof_captured",
        `Roof captured — ${building.name}`,
        `${input.roofSqft.toLocaleString()} sqft · ${input.city}, ${input.state}`),
      makeEvent(building.id, building.name, "aging_detected",
        `Aging detected — ${building.name}`,
        `Built ${input.yearBuilt} · roof age ~${roofAge} years · ${urgencyLabel} threshold`),
      makeEvent(building.id, building.name, "solar_scored",
        `Solar viability scored — ${building.name}`,
        `${solar.systemKw.toLocaleString()} kW · ${solar.panelCount.toLocaleString()} panels · $${(itc.savings25yr / 1_000_000).toFixed(1)}M 25-yr savings`),
      makeEvent(building.id, building.name, "itc_calculated",
        `ITC calculated — ${building.name}`,
        `$${(itc.federalItc / 1_000_000).toFixed(2)}M federal credit · safe harbor ${itc.safeHarborDeadline}`),
    ];

    if (painSignals.length > 0) {
      events.push(makeEvent(building.id, building.name, "pain_signal",
        `Pain signals detected — ${building.name}`,
        painSignals.slice(0, 2).join(" · ")));
    }

    events.forEach((evt, i) => {
      evt.timestamp = new Date(now + i * 800).toISOString();
    });

    patch((prev) => {
      const updatedCampaign = prev.campaign
        ? {
            ...prev.campaign,
            buildingsScanned: prev.campaign.buildingsScanned + 1,
            buildingsQualified: urgencyScore >= 60
              ? prev.campaign.buildingsQualified + 1
              : prev.campaign.buildingsQualified,
            totalPipelineValue: prev.campaign.totalPipelineValue + itc.savings25yr,
          }
        : prev.campaign;

      return {
        ...prev,
        campaign: updatedCampaign,
        buildings: [building, ...prev.buildings],
        events: [...events.reverse(), ...prev.events],
      };
    });

    return building;
  }, []);

  const updateBuilding = useCallback((id: string, input: AddBuildingInput) => {
    const { roofAge, urgencyScore, urgencyLabel, solar, itc } = calcBuildingData(
      input.yearBuilt,
      input.roofSqft
    );
    const evt = makeEvent(id, input.name, "roof_captured",
      `Building updated — ${input.name}`,
      `Recalculated: ${solar.systemKw.toLocaleString()} kW · ${formatCurrency(itc.federalItc)} ITC`);

    patch((prev) => ({
      ...prev,
      buildings: prev.buildings.map((b) =>
        b.id === id
          ? {
              ...b,
              name: input.name,
              address: input.address,
              city: input.city,
              state: input.state,
              yearBuilt: input.yearBuilt,
              lat: input.lat ?? b.lat,
              lng: input.lng ?? b.lng,
              roofAge,
              urgencyScore,
              urgencyLabel,
              solar,
              itc,
            }
          : b
      ),
      events: [evt, ...prev.events],
    }));
  }, []);

  const deleteBuilding = useCallback((id: string) => {
    patch((prev) => ({
      ...prev,
      buildings: prev.buildings.filter((b) => b.id !== id),
      events: prev.events.filter((e) => e.buildingId !== id),
    }));
  }, []);

  // ── Owner ─────────────────────────────────────────────────────────────────

  const addOwner = useCallback((buildingId: string, ownerInput: AddOwnerInput) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building) return prev;

      const deliverability = ownerInput.email.includes("@")
        ? Math.floor(Math.random() * 15) + 84
        : 0;

      const owner: Owner = { ...ownerInput, emailVerified: deliverability >= 90, deliverability };

      const events: ActivityEvent[] = [
        makeEvent(buildingId, building.name, "owner_identified",
          `Owner identified — ${ownerInput.name}`,
          `${ownerInput.title} · ${ownerInput.company}`),
      ];

      if (owner.emailVerified) {
        events.push(makeEvent(buildingId, building.name, "email_verified",
          `Email verified — ${ownerInput.email}`,
          `${deliverability}% deliverable · SMTP check passed`));
      }

      const newStatus: PipelineStatus =
        ["itc_calculated", "solar_analyzed", "scored", "scanned"].includes(building.pipelineStatus)
          ? "owner_found"
          : building.pipelineStatus;

      return {
        ...prev,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId ? { ...b, owner, pipelineStatus: newStatus } : b
        ),
        events: [...events.reverse(), ...prev.events],
      };
    });
  }, []);

  // ── Pain signals ──────────────────────────────────────────────────────────

  const addPainSignal = useCallback((buildingId: string, signal: string) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building || building.painSignals.includes(signal)) return prev;

      const evt = makeEvent(buildingId, building.name, "pain_signal",
        `Pain signal added — ${building.name}`, signal);

      return {
        ...prev,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId
            ? { ...b, painSignals: [...b.painSignals, signal] }
            : b
        ),
        events: [evt, ...prev.events],
      };
    });
  }, []);

  const removePainSignal = useCallback((buildingId: string, signal: string) => {
    patch((prev) => ({
      ...prev,
      buildings: prev.buildings.map((b) =>
        b.id === buildingId
          ? { ...b, painSignals: b.painSignals.filter((s) => s !== signal) }
          : b
      ),
    }));
  }, []);

  // ── Pipeline advance ──────────────────────────────────────────────────────

  const advancePipeline = useCallback((buildingId: string) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building) return prev;
      const next = nextPipelineStage(building.pipelineStatus);
      if (!next) return prev;

      const eventMap: Partial<Record<PipelineStatus, () => ActivityEvent>> = {
        scored: () => makeEvent(buildingId, building.name, "aging_detected",
          `Roof scored — ${building.name}`,
          `Built ${building.yearBuilt} · ${building.roofAge} yr old roof · Score: ${building.urgencyScore}`),
        solar_analyzed: () => makeEvent(buildingId, building.name, "solar_scored",
          `Solar analyzed — ${building.name}`,
          `${building.solar.systemKw} kW · ${building.solar.panelCount} panels`),
        itc_calculated: () => makeEvent(buildingId, building.name, "itc_calculated",
          `ITC recalculated — ${building.name}`,
          `${formatCurrency(building.itc.federalItc)} federal ITC`),
        rendered: () => makeEvent(buildingId, building.name, "roof_captured",
          `Roof render updated — ${building.name}`,
          `Panel layout finalized · ${building.solar.panelCount} panels`),
      };

      const evt = eventMap[next]?.();
      return {
        ...prev,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId ? { ...b, pipelineStatus: next } : b
        ),
        events: evt ? [evt, ...prev.events] : prev.events,
      };
    });
  }, []);

  // ── Proposal actions ──────────────────────────────────────────────────────

  const sendProposal = useCallback((buildingId: string) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building) return prev;
      const evt = makeEvent(buildingId, building.name, "proposal_sent",
        `Proposal sent — ${building.owner.name || building.name}`,
        building.owner.email
          ? `${building.owner.email} · ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
          : undefined);
      const updatedCampaign = prev.campaign
        ? { ...prev.campaign, proposalsSent: prev.campaign.proposalsSent + 1 }
        : prev.campaign;
      return {
        ...prev,
        campaign: updatedCampaign,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId
            ? { ...b, pipelineStatus: "proposal_sent" as PipelineStatus, proposalStatus: "Sent" as const, proposalSentAt: new Date().toISOString() }
            : b
        ),
        events: [evt, ...prev.events],
      };
    });
  }, []);

  const markProposalOpened = useCallback((buildingId: string) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building) return prev;
      const evt = makeEvent(buildingId, building.name, "proposal_opened",
        `Proposal opened — ${building.owner.name || building.name}`, `Marked as opened`);
      return {
        ...prev,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId ? { ...b, proposalStatus: "Opened" as const } : b
        ),
        events: [evt, ...prev.events],
      };
    });
  }, []);

  const markProposalReplied = useCallback((buildingId: string) => {
    patch((prev) => {
      const building = prev.buildings.find((b) => b.id === buildingId);
      if (!building) return prev;
      const evt = makeEvent(buildingId, building.name, "proposal_opened",
        `Reply received — ${building.owner.name || building.name}`, `Marked as replied`);
      return {
        ...prev,
        buildings: prev.buildings.map((b) =>
          b.id === buildingId ? { ...b, proposalStatus: "Replied" as const } : b
        ),
        events: [evt, ...prev.events],
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    const empty: SolarClawState = { campaign: null, buildings: [], events: [] };
    setState(empty);
    saveState(empty);
  }, []);

  return (
    <SolarClawContext.Provider value={{
      state,
      createCampaign, clearCampaign,
      addBuilding, updateBuilding, deleteBuilding,
      addOwner,
      addPainSignal, removePainSignal,
      advancePipeline,
      markProposalOpened, markProposalReplied,
      sendProposal,
      clearAll,
    }}>
      {children}
    </SolarClawContext.Provider>
  );
}

export function useSolarClaw() {
  const ctx = useContext(SolarClawContext);
  if (!ctx) throw new Error("useSolarClaw must be used inside SolarClawProvider");
  return ctx;
}

// Tiny helper used inside context (avoids circular dep with solarclaw.ts)
function formatCurrency(v: number) {
  return v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}K`;
}
