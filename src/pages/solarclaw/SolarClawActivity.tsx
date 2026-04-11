import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Sun,
  DollarSign,
  Layers,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import {
  ACTIVITY_EVENTS,
  BUILDINGS,
  formatCurrency,
  activityTypeColor,
  urgencyBg,
  type ActivityEvent,
  type Building,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

// ── Satellite map placeholder with panel overlay ───────────────────────────────

function SatelliteView({ building }: { building: Building }) {
  const panelCount = building.solar.panelCount;
  const rows = Math.min(20, Math.ceil(Math.sqrt(panelCount / 4)));
  const cols = Math.min(30, Math.ceil(panelCount / rows));

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-800">
      {/* Satellite tile simulation using CSS gradient patterns */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, #1a2e1a 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, #1e2818 0%, transparent 50%),
            linear-gradient(135deg, #151e10 0%, #1c2a14 30%, #141e10 60%, #1a2518 100%)
          `,
        }}
      />
      {/* Road simulation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[60%] left-0 right-0 h-[6px] bg-zinc-500" />
        <div className="absolute left-[15%] top-0 bottom-0 w-[5px] bg-zinc-500" />
      </div>

      {/* Building footprint */}
      <div className="absolute inset-[15%] rounded-sm bg-zinc-600/70 border border-zinc-500/40 overflow-hidden">
        {/* Roof surface */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #3a3a3a 0%, #2e2e2e 50%, #353535 100%)",
          }}
        />
        {/* Panel grid overlay */}
        <div
          className="absolute inset-[8%] grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => (
            <div
              key={i}
              className="rounded-[1px] opacity-80"
              style={{
                background:
                  "linear-gradient(135deg, #1a3a8f 0%, #2952c4 50%, #1a3a8f 100%)",
                boxShadow: "inset 0 0 0 0.5px rgba(100,150,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Address label */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-zinc-700/50">
          <MapPin className="w-3 h-3 text-zinc-400" />
          <span className="text-xs text-zinc-300">{building.address}</span>
        </div>
      </div>

      {/* Coordinates */}
      <div className="absolute top-3 right-3 text-[10px] text-zinc-500 font-mono bg-black/40 rounded px-1.5 py-0.5">
        {building.lat.toFixed(4)}, {building.lng.toFixed(4)}
      </div>
    </div>
  );
}

// ── Stats Card ─────────────────────────────────────────────────────────────────

function BuildingStatsCard({ building }: { building: Building }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-700/50 p-4 space-y-4">
      <div>
        <Link
          to={`/solarclaw/building/${building.id}`}
          className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors flex items-center gap-1.5"
        >
          {building.name}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-zinc-500" />
          <span className="text-xs text-zinc-500">
            {building.address}, {building.city}, {building.state}
          </span>
        </div>
      </div>

      {/* Urgency badge */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border font-medium",
            urgencyBg(building.urgencyLabel)
          )}
        >
          {building.urgencyLabel} — Score {building.urgencyScore}
        </span>
        <span className="text-xs text-zinc-500">
          Built {building.yearBuilt}
        </span>
      </div>

      {/* Key stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          {
            icon: Layers,
            label: "Roof SQFT",
            value: building.solar.roofSqft.toLocaleString(),
            color: "text-sky-400",
          },
          {
            icon: Sun,
            label: "System Size",
            value: `${building.solar.systemKw.toLocaleString()} kW`,
            color: "text-yellow-400",
          },
          {
            icon: DollarSign,
            label: "25-YR Savings",
            value: formatCurrency(building.itc.savings25yr),
            color: "text-emerald-400",
          },
          {
            icon: DollarSign,
            label: "Federal ITC",
            value: formatCurrency(building.itc.federalItc),
            color: "text-green-400",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-lg bg-zinc-800/60 p-3 border border-zinc-700/40"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={cn("w-3 h-3", color)} />
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
                {label}
              </span>
            </div>
            <div className={cn("text-sm font-bold", color)}>{value}</div>
          </div>
        ))}
      </div>

      {/* Owner info */}
      {building.pipelineStatus !== "scanned" &&
        building.pipelineStatus !== "scored" && (
          <div className="rounded-lg bg-zinc-800/60 border border-zinc-700/40 p-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">
              Owner
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {building.owner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-200">
                  {building.owner.name}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {building.owner.title}
                </div>
              </div>
              {building.owner.emailVerified && (
                <span className="ml-auto text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
                  ✓ Verified
                </span>
              )}
            </div>
            <div className="mt-2 text-[11px] text-zinc-400 font-mono">
              {building.owner.email}
            </div>
          </div>
        )}

      {/* ITC safe harbor */}
      <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2">
        <span className="text-base">⏰</span>
        <div>
          <div className="text-xs font-medium text-red-400">
            Safe Harbor Deadline: {building.itc.safeHarborDeadline}
          </div>
          <div className="text-[10px] text-zinc-500">
            Lock {formatCurrency(building.itc.federalItc)} federal ITC credit
          </div>
        </div>
      </div>

      {/* Pain signals */}
      {building.painSignals.length > 0 && (
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">
            Pain Signals
          </div>
          <div className="flex flex-wrap gap-1.5">
            {building.painSignals.map((signal) => (
              <span
                key={signal}
                className="text-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full px-2 py-0.5"
              >
                📌 {signal}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Activity Event Row ─────────────────────────────────────────────────────────

function EventRow({
  event,
  isNew,
  onClick,
  isSelected,
}: {
  event: ActivityEvent;
  isNew: boolean;
  onClick: () => void;
  isSelected: boolean;
}) {
  const time = new Date(event.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 px-4 py-3 border-b border-zinc-800/60 transition-all duration-200 hover:bg-zinc-800/30",
        isSelected && "bg-zinc-800/50 border-l-2 border-l-yellow-500",
        isNew && "animate-pulse-once bg-zinc-800/20"
      )}
    >
      <span className="text-lg leading-none flex-shrink-0 mt-0.5">
        {event.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-xs font-medium leading-snug",
            activityTypeColor(event.type)
          )}
        >
          {event.message}
        </p>
        {event.detail && (
          <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
            {event.detail}
          </p>
        )}
      </div>
      <span className="text-[10px] text-zinc-600 flex-shrink-0 mt-0.5">
        {time}
      </span>
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function SolarClawActivity() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("bldg-001");
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const feedRef = useRef<HTMLDivElement>(null);

  const sortedEvents = [...ACTIVITY_EVENTS].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const visibleEvents = sortedEvents.slice(0, visibleCount);

  // Auto-play through events
  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= sortedEvents.length) return;

    const delay = visibleCount === 0 ? 300 : 600 + Math.random() * 800;
    const timer = setTimeout(() => {
      const nextEvent = sortedEvents[visibleCount];
      setVisibleCount((c) => c + 1);
      setNewIds((s) => new Set([...s, nextEvent.id]));
      setSelectedBuildingId(nextEvent.buildingId);
      // Remove "new" highlight after 2s
      setTimeout(() => {
        setNewIds((s) => {
          const next = new Set(s);
          next.delete(nextEvent.id);
          return next;
        });
      }, 2000);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount, sortedEvents]);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const selectedBuilding =
    BUILDINGS.find((b) => b.id === selectedBuildingId) ?? BUILDINGS[0];

  function handleReset() {
    setVisibleCount(0);
    setNewIds(new Set());
    setSelectedBuildingId("bldg-001");
    setIsPlaying(true);
  }

  return (
    <SolarClawLayout>
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">
            Live Activity Feed
          </h1>
          <p className="text-xs text-zinc-500">
            Phoenix Metro Campaign — Real-time pipeline events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">
            {visibleCount} / {sortedEvents.length} events
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Restart playback"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3 h-3" /> Resume
              </>
            )}
          </button>
        </div>
      </header>

      {/* Split panel body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left — Activity feed */}
        <div className="w-[440px] flex-shrink-0 border-r border-zinc-800 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center gap-2 flex-shrink-0">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400">
              Pipeline running · Phoenix, AZ
            </span>
          </div>

          {/* Event list */}
          <div
            ref={feedRef}
            className="flex-1 overflow-y-auto scrollbar-thin"
          >
            {visibleEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-zinc-600">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-xs">Starting pipeline...</div>
              </div>
            )}
            {visibleEvents.map((evt) => (
              <EventRow
                key={evt.id}
                event={evt}
                isNew={newIds.has(evt.id)}
                isSelected={selectedBuildingId === evt.buildingId}
                onClick={() => setSelectedBuildingId(evt.buildingId)}
              />
            ))}
            {isPlaying && visibleCount < sortedEvents.length && (
              <div className="px-4 py-3 flex items-center gap-2 text-zinc-600">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs">Processing next building...</span>
              </div>
            )}
            {!isPlaying && visibleCount < sortedEvents.length && (
              <div className="px-4 py-3 text-xs text-zinc-600 text-center">
                Paused — {sortedEvents.length - visibleCount} events remaining
              </div>
            )}
            {visibleCount >= sortedEvents.length && (
              <div className="px-4 py-4 text-center">
                <div className="text-xs text-emerald-400 font-medium">
                  ✓ Pipeline complete for this batch
                </div>
                <button
                  onClick={handleReset}
                  className="mt-2 text-[11px] text-zinc-500 hover:text-zinc-300 underline"
                >
                  Replay
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right — Map + Stats */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Building selector tabs */}
          <div className="h-10 flex-shrink-0 border-b border-zinc-800 flex items-center gap-1 px-3 overflow-x-auto scrollbar-none">
            {BUILDINGS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBuildingId(b.id)}
                className={cn(
                  "flex-shrink-0 text-[11px] px-3 py-1 rounded-md transition-colors",
                  selectedBuildingId === b.id
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {b.name.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>

          <div className="flex-1 flex overflow-hidden p-4 gap-4">
            {/* Satellite view */}
            <div className="flex-1 min-w-0">
              <SatelliteView building={selectedBuilding} />
            </div>

            {/* Stats panel */}
            <div className="w-72 flex-shrink-0 overflow-y-auto">
              <BuildingStatsCard building={selectedBuilding} />
            </div>
          </div>
        </div>
      </div>
    </SolarClawLayout>
  );
}
