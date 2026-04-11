import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronUp, ChevronDown, Search, Filter, MapPin, ArrowRight, Plus,
  Trash2, User, ChevronRight, Building2,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import { AddBuildingModal } from "@/components/solarclaw/AddBuildingModal";
import { AddOwnerModal } from "@/components/solarclaw/AddOwnerModal";
import { useSolarClaw } from "@/context/SolarClawContext";
import {
  formatCurrency, urgencyBg, pipelineLabel, proposalStatusBg,
  type Building, type UrgencyLabel,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

type SortKey = "name" | "urgencyScore" | "yearBuilt" | "systemKw" | "savings25yr" | "federalItc";
type SortDir = "asc" | "desc";

function getSortValue(b: Building, key: SortKey): number | string {
  switch (key) {
    case "name": return b.name;
    case "urgencyScore": return b.urgencyScore;
    case "yearBuilt": return b.yearBuilt;
    case "systemKw": return b.solar.systemKw;
    case "savings25yr": return b.itc.savings25yr;
    case "federalItc": return b.itc.federalItc;
  }
}

function UrgencyBar({ score }: { score: number }) {
  const color = score >= 80 ? "#f87171" : score >= 60 ? "#fbbf24" : "#34d399";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono" style={{ color }}>{score}</span>
    </div>
  );
}

export default function SolarClawProspects() {
  const { state, deleteBuilding } = useSolarClaw();
  const { buildings } = state;
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLabel | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("urgencyScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAddBuilding, setShowAddBuilding] = useState(false);
  const [ownerModalBuilding, setOwnerModalBuilding] = useState<Building | null>(null);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const filtered = useMemo(() => {
    let list = [...buildings];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.owner.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
      );
    }
    if (urgencyFilter !== "All") list = list.filter(b => b.urgencyLabel === urgencyFilter);
    list.sort((a, b) => {
      const av = getSortValue(a, sortKey);
      const bv = getSortValue(b, sortKey);
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [buildings, search, urgencyFilter, sortKey, sortDir]);

  const Th = ({ label, col }: { label: string; col: SortKey }) => (
    <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors" onClick={() => handleSort(col)}>
      {label}
      {col === sortKey
        ? sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-yellow-400" /> : <ChevronDown className="w-3 h-3 text-yellow-400" />
        : <ChevronUp className="w-3 h-3 text-zinc-700" />}
    </button>
  );

  return (
    <SolarClawLayout>
      {showAddBuilding && <AddBuildingModal onClose={() => setShowAddBuilding(false)} />}
      {ownerModalBuilding && (
        <AddOwnerModal building={ownerModalBuilding} onClose={() => setOwnerModalBuilding(null)} />
      )}

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">Prospects</h1>
          <p className="text-xs text-zinc-500">{buildings.length} buildings in pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-zinc-800 rounded-lg px-3 py-1.5 border border-zinc-700 text-xs text-zinc-400">
            {filtered.length} shown
          </span>
          <button onClick={() => setShowAddBuilding(true)}
            className="flex items-center gap-1.5 text-xs bg-sky-500 hover:bg-sky-400 text-white rounded-lg px-3 py-1.5 font-medium transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Building
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-zinc-800 flex-shrink-0">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search buildings, owners..."
            className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600" />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-zinc-500" />
          {(["All", "Critical", "Aging", "Newer"] as const).map(label => (
            <button key={label} onClick={() => setUrgencyFilter(label)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg border transition-colors",
                urgencyFilter === label
                  ? "bg-zinc-700 border-zinc-600 text-white"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              )}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table or empty state */}
      <div className="flex-1 overflow-auto">
        {buildings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">No Buildings Yet</h3>
            <p className="text-xs text-zinc-600 mb-6 max-w-xs">
              Add commercial buildings — ITC credits and solar capacity are calculated automatically.
            </p>
            <button onClick={() => setShowAddBuilding(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add First Building
            </button>
          </div>
        ) : (
          <table className="w-full text-xs border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 z-10">
              <tr className="text-zinc-500 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium w-[200px]"><Th label="Building" col="name" /></th>
                <th className="text-left px-4 py-3 font-medium w-[110px]">Location</th>
                <th className="text-left px-4 py-3 font-medium w-[110px]"><Th label="Urgency" col="urgencyScore" /></th>
                <th className="text-left px-4 py-3 font-medium w-[80px]"><Th label="Built" col="yearBuilt" /></th>
                <th className="text-left px-4 py-3 font-medium w-[100px]"><Th label="System kW" col="systemKw" /></th>
                <th className="text-left px-4 py-3 font-medium w-[110px]"><Th label="25-yr Savings" col="savings25yr" /></th>
                <th className="text-left px-4 py-3 font-medium w-[110px]"><Th label="Federal ITC" col="federalItc" /></th>
                <th className="text-left px-4 py-3 font-medium w-[130px]">Owner</th>
                <th className="text-left px-4 py-3 font-medium w-[110px]">Pipeline</th>
                <th className="text-left px-4 py-3 font-medium w-[90px]">Proposal</th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map((building) => (
                <tr key={building.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-200 truncate max-w-[185px]">{building.name}</div>
                    <div className="text-zinc-600 text-[10px] mt-0.5">{building.solar.roofSqft.toLocaleString()} sqft</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-zinc-600 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-400 truncate max-w-[100px]">{building.city}, {building.state}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium", urgencyBg(building.urgencyLabel))}>
                        {building.urgencyLabel}
                      </span>
                      <UrgencyBar score={building.urgencyScore} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    <div>{building.yearBuilt}</div>
                    <div className="text-zinc-600 text-[10px]">{building.roofAge} yrs</div>
                  </td>
                  <td className="px-4 py-3"><span className="text-yellow-400 font-medium">{building.solar.systemKw.toLocaleString()} kW</span></td>
                  <td className="px-4 py-3"><span className="text-emerald-400 font-semibold">{formatCurrency(building.itc.savings25yr)}</span></td>
                  <td className="px-4 py-3"><span className="text-green-400 font-semibold">{formatCurrency(building.itc.federalItc)}</span></td>
                  <td className="px-4 py-3">
                    {building.owner.name ? (
                      <div>
                        <div className="text-zinc-300 truncate max-w-[120px]">{building.owner.name}</div>
                        <div className="text-zinc-600 text-[10px] truncate max-w-[120px]">{building.owner.email || building.owner.title}</div>
                      </div>
                    ) : (
                      <button onClick={() => setOwnerModalBuilding(building)}
                        className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                        <User className="w-3 h-3" /> Add Owner
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded-full px-2 py-0.5 text-zinc-400">
                      {pipelineLabel(building.pipelineStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium", proposalStatusBg(building.proposalStatus))}>
                      {building.proposalStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/solarclaw/building/${building.id}`}
                        className="p-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 inline-flex" title="View detail">
                        <ChevronRight className="w-3 h-3 text-zinc-300" />
                      </Link>
                      <button onClick={() => deleteBuilding(building.id)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 inline-flex text-zinc-500 transition-colors" title="Delete">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {buildings.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-600">
            <Search className="w-8 h-8 mb-2 opacity-30" />
            <div className="text-sm">No buildings match your filters</div>
          </div>
        )}
      </div>
    </SolarClawLayout>
  );
}
