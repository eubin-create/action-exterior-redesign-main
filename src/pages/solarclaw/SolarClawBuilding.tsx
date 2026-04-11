import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Sun,
  DollarSign,
  Layers,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Zap,
  Building2,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import {
  BUILDINGS,
  ACTIVITY_EVENTS,
  formatCurrency,
  formatNumber,
  urgencyBg,
  pipelineLabel,
  proposalStatusBg,
  activityTypeColor,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

// ── Roof render with animated panel reveal ──────────────────────────────────────

function RoofRender({ panelCount, systemKw }: { panelCount: number; systemKw: number }) {
  const rows = Math.min(16, Math.ceil(Math.sqrt(panelCount / 3)));
  const cols = Math.min(24, Math.ceil(panelCount / rows));

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800">
      {/* Satellite background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 35%, #1a2e1a 0%, transparent 55%),
            radial-gradient(ellipse at 75% 65%, #1e2818 0%, transparent 45%),
            linear-gradient(140deg, #141c10 0%, #1a2614 35%, #131c0f 65%, #182413 100%)
          `,
        }}
      />
      {/* Road lines */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-[72%] left-0 right-0 h-[7px] bg-zinc-500" />
        <div className="absolute left-[10%] top-0 bottom-0 w-[6px] bg-zinc-500" />
      </div>

      {/* Building footprint */}
      <div className="absolute inset-[10%] inset-b-[20%]">
        <div
          className="w-full h-full rounded-sm overflow-hidden border border-zinc-600/30"
          style={{
            background:
              "linear-gradient(135deg, #3a3a3a 0%, #2b2b2b 50%, #333333 100%)",
          }}
        >
          {/* Panel grid */}
          <div
            className="absolute inset-[6%] grid gap-0.5"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {Array.from({ length: rows * cols }).map((_, i) => (
              <div
                key={i}
                className="rounded-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, #1a3a8f 0%, #2952c4 45%, #1e44a8 100%)",
                  boxShadow: "inset 0 0 0 0.5px rgba(100,150,255,0.25)",
                  animation: `fadeIn 0.3s ease forwards ${(i % 40) * 30}ms`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
          {/* Skylight / HVAC units */}
          <div className="absolute top-[15%] right-[20%] w-[8%] h-[10%] bg-zinc-600 rounded-sm border border-zinc-500/40" />
          <div className="absolute top-[15%] right-[32%] w-[6%] h-[8%] bg-zinc-600 rounded-sm border border-zinc-500/40" />
        </div>
      </div>

      {/* Overlay badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-zinc-700/50 text-xs">
          <span className="text-yellow-400 font-semibold">{panelCount.toLocaleString()}</span>
          <span className="text-zinc-400"> panels · </span>
          <span className="text-yellow-400 font-semibold">{systemKw.toLocaleString()} kW</span>
        </div>
      </div>

      <div className="absolute bottom-3 left-3">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-zinc-700/50 text-[11px] text-zinc-400">
          SolarClaw Roof Render · Module 6
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}

// ── Stat tile ──────────────────────────────────────────────────────────────────

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  color = "text-zinc-200",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-3.5 h-3.5", color)} />
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className={cn("text-lg font-bold", color)}>{value}</div>
      {sub && <div className="text-[11px] text-zinc-500 mt-0.5">{sub}</div>}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function SolarClawBuilding() {
  const { id } = useParams<{ id: string }>();
  const building = BUILDINGS.find((b) => b.id === id);

  if (!building) return <Navigate to="/solarclaw/prospects" replace />;

  const buildingEvents = ACTIVITY_EVENTS.filter(
    (e) => e.buildingId === building.id
  ).sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const itc = building.itc;
  const solar = building.solar;
  const owner = building.owner;

  // ITC stacking bars
  const itcBreakdowns = [
    { label: "Base ITC (30%)", pct: 30, value: itc.systemCost * 0.3, color: "#34d399" },
    { label: "+ Domestic Content (+10%)", pct: 10, value: itc.systemCost * 0.1, color: "#60a5fa" },
    { label: "+ Energy Community (+10%)", pct: 10, value: itc.systemCost * 0.1, color: "#a78bfa" },
  ];

  return (
    <SolarClawLayout>
      {/* Header */}
      <header className="h-14 flex items-center gap-4 px-6 border-b border-zinc-800 flex-shrink-0">
        <Link
          to="/solarclaw/prospects"
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-white truncate">
            {building.name}
          </h1>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {building.address}, {building.city}, {building.state}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full border font-medium",
              urgencyBg(building.urgencyLabel)
            )}
          >
            {building.urgencyLabel}
          </span>
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full border font-medium",
              proposalStatusBg(building.proposalStatus)
            )}
          >
            {building.proposalStatus}
          </span>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top: Roof render + key stats */}
        <div className="grid grid-cols-3 gap-5">
          {/* Roof render — 2 cols */}
          <div className="col-span-2">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              Roof Visualization — {solar.roofSqft.toLocaleString()} sqft
            </div>
            <RoofRender
              panelCount={solar.panelCount}
              systemKw={solar.systemKw}
            />
          </div>

          {/* Urgency & roof stats */}
          <div className="space-y-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3 h-3" />
              Roof Assessment
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Urgency Score</span>
                <span className="text-2xl font-bold text-white">
                  {building.urgencyScore}
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${building.urgencyScore}%`,
                    backgroundColor:
                      building.urgencyLabel === "Critical"
                        ? "#f87171"
                        : building.urgencyLabel === "Aging"
                        ? "#fbbf24"
                        : "#34d399",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-zinc-500">Year Built</div>
                  <div className="font-semibold text-zinc-200">
                    {building.yearBuilt}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-500">Roof Age</div>
                  <div className="font-semibold text-zinc-200">
                    {building.roofAge} years
                  </div>
                </div>
              </div>
            </div>

            {/* Pain signals */}
            {building.painSignals.length > 0 && (
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  Pain Signals
                </div>
                <div className="space-y-1.5">
                  {building.painSignals.map((signal) => (
                    <div
                      key={signal}
                      className="text-xs text-pink-400 flex items-center gap-1.5"
                    >
                      <span>📌</span>
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline status */}
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                Pipeline Stage
              </div>
              <div className="text-sm font-medium text-white">
                {pipelineLabel(building.pipelineStatus)}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">
                {buildingEvents.length} events logged
              </div>
            </div>
          </div>
        </div>

        {/* Solar stats grid */}
        <div>
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sun className="w-3 h-3" />
            Solar System Design
          </h2>
          <div className="grid grid-cols-5 gap-3">
            <StatTile
              icon={Zap}
              label="System Size"
              value={`${solar.systemKw.toLocaleString()} kW`}
              sub="Commercial panels @ 400W"
              color="text-yellow-400"
            />
            <StatTile
              icon={Sun}
              label="Panel Count"
              value={solar.panelCount.toLocaleString()}
              sub="Max roof capacity"
              color="text-orange-400"
            />
            <StatTile
              icon={TrendingUp}
              label="Annual Output"
              value={`${formatNumber(solar.annualKwh)} kWh`}
              sub="Estimated yearly generation"
              color="text-sky-400"
            />
            <StatTile
              icon={Sun}
              label="Sun Hours/yr"
              value={solar.sunHoursPerYear.toLocaleString()}
              sub="Phoenix avg irradiance"
              color="text-amber-400"
            />
            <StatTile
              icon={Layers}
              label="Array Area"
              value={`${solar.maxArrayAreaM2.toLocaleString()} m²`}
              sub={`${solar.roofSqft.toLocaleString()} sqft`}
              color="text-zinc-300"
            />
          </div>
        </div>

        {/* Financial analysis + Owner + ITC */}
        <div className="grid grid-cols-3 gap-5">
          {/* ITC breakdown */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-green-400" />
              Federal ITC Breakdown
            </h3>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">System Cost</span>
                <span className="font-semibold text-white">
                  {formatCurrency(itc.systemCost)}
                </span>
              </div>
              <div className="text-[10px] text-zinc-600">
                @ $2,800/kW installed cost
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {itcBreakdowns.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{row.label}</span>
                    <span className="font-semibold" style={{ color: row.color }}>
                      {formatCurrency(row.value)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${row.pct * 2}%`,
                        backgroundColor: row.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Base ITC (30%)</span>
                <span className="font-bold text-emerald-400">
                  {formatCurrency(itc.federalItc)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Max ITC (50% w/ bonuses)</span>
                <span className="font-bold text-green-400">
                  {formatCurrency(itc.maxItc)}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
              <div className="text-xs font-medium text-red-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Safe Harbor: {itc.safeHarborDeadline}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">
                Must deposit 5% of system cost to lock ITC rate
              </div>
            </div>
          </div>

          {/* Financial summary */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Financial Analysis
            </h3>

            <div className="space-y-3">
              {[
                {
                  label: "System Cost",
                  value: formatCurrency(itc.systemCost),
                  sub: "Before incentives",
                  color: "text-zinc-300",
                },
                {
                  label: "Federal ITC Credit",
                  value: `−${formatCurrency(itc.federalItc)}`,
                  sub: "30% base ITC",
                  color: "text-emerald-400",
                },
                {
                  label: "Net Cost",
                  value: formatCurrency(itc.systemCost - itc.federalItc),
                  sub: "After base ITC",
                  color: "text-white",
                },
                {
                  label: "25-Year Savings",
                  value: formatCurrency(itc.savings25yr),
                  sub: `@ $0.12/kWh utility rate`,
                  color: "text-emerald-400",
                },
                {
                  label: "Simple Payback",
                  value: `${itc.paybackYears} years`,
                  sub: "Including ITC benefits",
                  color: "text-sky-400",
                },
                {
                  label: "Net 25-Year ROI",
                  value: formatCurrency(itc.savings25yr - (itc.systemCost - itc.federalItc)),
                  sub: "Total profit over 25 yrs",
                  color: "text-green-400",
                },
              ].map(({ label, value, sub, color }) => (
                <div
                  key={label}
                  className="flex items-start justify-between border-b border-zinc-800/60 pb-2 last:border-0"
                >
                  <div>
                    <div className="text-xs text-zinc-400">{label}</div>
                    <div className="text-[10px] text-zinc-600">{sub}</div>
                  </div>
                  <span className={cn("text-sm font-bold", color)}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner card */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Owner Information
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                {owner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-100">
                  {owner.name}
                </div>
                <div className="text-xs text-zinc-500">{owner.title}</div>
                <div className="text-xs text-zinc-600">{owner.company}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-zinc-800/60 p-2.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span className="text-xs font-mono text-zinc-300 flex-1 truncate">
                  {owner.email}
                </span>
                {owner.emailVerified ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-zinc-800/60 p-2.5">
                <Phone className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span className="text-xs font-mono text-zinc-300">
                  {owner.phone}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Email Deliverability</span>
                <span className={cn("font-semibold", owner.deliverability >= 90 ? "text-emerald-400" : "text-amber-400")}>
                  {owner.deliverability}%
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${owner.deliverability}%` }}
                />
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-3">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                Proposal Status
              </div>
              <span
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full border font-medium",
                  proposalStatusBg(building.proposalStatus)
                )}
              >
                {building.proposalStatus}
              </span>
              {building.proposalSentAt && (
                <div className="text-[10px] text-zinc-600 mt-1.5">
                  Sent{" "}
                  {new Date(building.proposalSentAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>

            {building.proposalStatus === "Pending" && (
              <button className="w-full flex items-center justify-center gap-2 text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg px-3 py-2.5 hover:bg-indigo-500/30 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                Send Proposal to {owner.name.split(" ")[0]}
              </button>
            )}
          </div>
        </div>

        {/* Activity timeline for this building */}
        {buildingEvents.length > 0 && (
          <div>
            <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
              Pipeline Activity Log
            </h2>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="divide-y divide-zinc-800">
                {buildingEvents.map((evt) => (
                  <div key={evt.id} className="flex items-start gap-4 px-5 py-3">
                    <span className="text-base leading-none mt-0.5 flex-shrink-0">
                      {evt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-xs font-medium",
                          activityTypeColor(evt.type)
                        )}
                      >
                        {evt.message}
                      </p>
                      {evt.detail && (
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {evt.detail}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-600 flex-shrink-0 font-mono">
                      {new Date(evt.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SolarClawLayout>
  );
}
