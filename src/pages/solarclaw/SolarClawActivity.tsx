import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Sun, DollarSign, Layers, ArrowRight, Plus, Zap } from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import { AddBuildingModal } from "@/components/solarclaw/AddBuildingModal";
import { useSolarClaw } from "@/context/SolarClawContext";
import {
  formatCurrency, urgencyBg, activityTypeColor,
  type ActivityEvent, type Building,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

// ── Satellite view ──────────────────────────────────────────────────────────────

function SatelliteView({ building }: { building: Building }) {
  const rows = Math.min(20, Math.ceil(Math.sqrt(building.solar.panelCount / 4)));
  const cols = Math.min(30, Math.ceil(building.solar.panelCount / rows));

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-800">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 40%, #1a2e1a 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, #1e2818 0%, transparent 50%),
          linear-gradient(135deg, #151e10 0%, #1c2a14 30%, #141e10 60%, #1a2518 100%)`,
      }} />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[60%] left-0 right-0 h-[6px] bg-zinc-500" />
        <div className="absolute left-[15%] top-0 bottom-0 w-[5px] bg-zinc-500" />
      </div>
      <div className="absolute inset-[15%] rounded-sm bg-zinc-600/70 border border-zinc-500/40 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #3a3a3a 0%, #2e2e2e 50%, #353535 100%)",
        }} />
        <div className="absolute inset-[8%] grid gap-0.5" style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}>
          {Array.from({ length: rows * cols }).map((_, i) => (
            <div key={i} className="rounded-[1px] opacity-80" style={{
              background: "linear-gradient(135deg, #1a3a8f 0%, #2952c4 50%, #1a3a8f 100%)",
              boxShadow: "inset 0 0 0 0.5px rgba(100,150,255,0.3)",
            }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-zinc-700/50">
          <MapPin className="w-3 h-3 text-zinc-400" />
          <span className="text-xs text-zinc-300">{building.address}</span>
        </div>
      </div>
      <div className="absolute top-3 right-3 text-[10px] text-zinc-500 font-mono bg-black/40 rounded px-1.5 py-0.5">
        {building.lat.toFixed(4)}, {building.lng.toFixed(4)}
      </div>
    </div>
  );
}

// ── Stats card ──────────────────────────────────────────────────────────────────

function BuildingStatsCard({ building }: { building: Building }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-700/50 p-4 space-y-4">
      <div>
        <Link to={`/solarclaw/building/${building.id}`}
          className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors flex items-center gap-1.5">
          {building.name} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-zinc-500" />
          <span className="text-xs text-zinc-500">{building.address}, {building.city}, {building.state}</span>
        </div>
      </div>

      <span className={cn("inline-flex text-xs px-2.5 py-1 rounded-full border font-medium", urgencyBg(building.urgencyLabel))}>
        {building.urgencyLabel} — Score {building.urgencyScore}
      </span>

      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Layers, label: "Roof SQFT", value: building.solar.roofSqft.toLocaleString(), color: "text-sky-400" },
          { icon: Sun, label: "System Size", value: `${building.solar.systemKw.toLocaleString()} kW`, color: "text-yellow-400" },
          { icon: DollarSign, label: "25-YR Savings", value: formatCurrency(building.itc.savings25yr), color: "text-emerald-400" },
          { icon: DollarSign, label: "Federal ITC", value: formatCurrency(building.itc.federalItc), color: "text-green-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-lg bg-zinc-800/60 p-3 border border-zinc-700/40">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={cn("w-3 h-3", color)} />
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">{label}</span>
            </div>
            <div className={cn("text-sm font-bold", color)}>{value}</div>
          </div>
        ))}
      </div>

      {building.owner.name && (
        <div className="rounded-lg bg-zinc-800/60 border border-zinc-700/40 p-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">Owner</div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {building.owner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-200">{building.owner.name}</div>
              <div className="text-[10px] text-zinc-500">{building.owner.title}</div>
            </div>
            {building.owner.emailVerified && (
              <span className="ml-auto text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">✓ Verified</span>
            )}
          </div>
          {building.owner.email && (
            <div className="mt-2 text-[11px] text-zinc-400 font-mono">{building.owner.email}</div>
          )}
        </div>
      )}

      <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2">
        <span className="text-base">⏰</span>
        <div>
          <div className="text-xs font-medium text-red-400">Safe Harbor: {building.itc.safeHarborDeadline}</div>
          <div className="text-[10px] text-zinc-500">Lock {formatCurrency(building.itc.federalItc)} ITC</div>
        </div>
      </div>

      {building.painSignals.length > 0 && (
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">Pain Signals</div>
          <div className="flex flex-wrap gap-1.5">
            {building.painSignals.map((s) => (
              <span key={s} className="text-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full px-2 py-0.5">📌 {s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Event row ───────────────────────────────────────────────────────────────────

function EventRow({ event, isSelected, onClick }: {
  event: ActivityEvent; isSelected: boolean; onClick: () => void;
}) {
  const time = new Date(event.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
  return (
    <button onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 px-4 py-3 border-b border-zinc-800/60 transition-all hover:bg-zinc-800/30",
        isSelected && "bg-zinc-800/50 border-l-2 border-l-yellow-500"
      )}>
      <span className="text-lg leading-none flex-shrink-0 mt-0.5">{event.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={cn("text-xs font-medium leading-snug", activityTypeColor(event.type))}>{event.message}</p>
        {event.detail && <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{event.detail}</p>}
      </div>
      <span className="text-[10px] text-zinc-600 flex-shrink-0 mt-0.5">{time}</span>
    </button>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────────

function EmptyFeed({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
      <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
        <Zap className="w-7 h-7 text-zinc-500" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-300 mb-1">No Activity Yet</h3>
      <p className="text-xs text-zinc-600 mb-6 max-w-[200px]">
        Add a building to start generating pipeline events.
      </p>
      <button onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 text-sm rounded-lg transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add Building
      </button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function SolarClawActivity() {
  const { state } = useSolarClaw();
  const { buildings, events, campaign } = state;
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    buildings[0]?.id ?? null
  );
  const [showAddBuilding, setShowAddBuilding] = useState(false);

  // Keep selected in sync when buildings change
  const resolvedId = selectedBuildingId && buildings.find(b => b.id === selectedBuildingId)
    ? selectedBuildingId
    : buildings[0]?.id ?? null;

  const selectedBuilding = buildings.find(b => b.id === resolvedId);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <SolarClawLayout>
      {showAddBuilding && (
        <AddBuildingModal
          onClose={() => setShowAddBuilding(false)}
          onAdded={(id) => setSelectedBuildingId(id)}
        />
      )}

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">Activity Feed</h1>
          <p className="text-xs text-zinc-500">
            {campaign ? `${campaign.name} · ` : ""}{events.length} events logged
          </p>
        </div>
        <div className="flex items-center gap-2">
          {events.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
          <button
            onClick={() => setShowAddBuilding(true)}
            className="flex items-center gap-1.5 text-xs bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add Building
          </button>
        </div>
      </header>

      {/* Split panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left — event list */}
        <div className="w-[440px] flex-shrink-0 border-r border-zinc-800 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center gap-2 flex-shrink-0">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400">{sortedEvents.length} events</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sortedEvents.length === 0 ? (
              <EmptyFeed onAdd={() => setShowAddBuilding(true)} />
            ) : (
              sortedEvents.map((evt) => (
                <EventRow
                  key={evt.id}
                  event={evt}
                  isSelected={resolvedId === evt.buildingId}
                  onClick={() => {
                    const b = buildings.find(b => b.id === evt.buildingId);
                    if (b) setSelectedBuildingId(b.id);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Right — map + stats */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Building tabs */}
          {buildings.length > 0 && (
            <div className="h-10 flex-shrink-0 border-b border-zinc-800 flex items-center gap-1 px-3 overflow-x-auto">
              {buildings.map((b) => (
                <button key={b.id} onClick={() => setSelectedBuildingId(b.id)}
                  className={cn(
                    "flex-shrink-0 text-[11px] px-3 py-1 rounded-md transition-colors",
                    resolvedId === b.id ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}>
                  {b.name.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
              <button onClick={() => setShowAddBuilding(true)}
                className="flex-shrink-0 ml-1 text-[11px] px-2.5 py-1 rounded-md text-sky-500 hover:text-sky-300 flex items-center gap-1 transition-colors">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          )}

          {selectedBuilding ? (
            <div className="flex-1 flex overflow-hidden p-4 gap-4">
              <div className="flex-1 min-w-0">
                <SatelliteView building={selectedBuilding} />
              </div>
              <div className="w-72 flex-shrink-0 overflow-y-auto">
                <BuildingStatsCard building={selectedBuilding} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
              <div className="text-4xl mb-3">🛰️</div>
              <div className="text-sm">Add a building to see its roof visualization here</div>
            </div>
          )}
        </div>
      </div>
    </SolarClawLayout>
  );
}
