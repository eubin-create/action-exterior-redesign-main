import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2, TrendingUp, FileText, DollarSign,
  ArrowRight, Sun, Clock, MapPin, Plus, Zap, Trash2,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import { CreateCampaignModal } from "@/components/solarclaw/CreateCampaignModal";
import { AddBuildingModal } from "@/components/solarclaw/AddBuildingModal";
import { useSolarClaw } from "@/context/SolarClawContext";
import {
  formatCurrency, urgencyBg, pipelineLabel, activityTypeColor,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

function StatCard({
  icon: Icon, label, value, sub, accent,
}: {
  icon: React.ElementType; label: string; value: string; sub?: string; accent?: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", accent ?? "bg-zinc-800")}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
    </div>
  );
}

// ── Empty state — no campaign ──────────────────────────────────────────────────

function NoCampaign({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center mb-6">
        <Zap className="w-10 h-10 text-yellow-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">No Active Campaign</h2>
      <p className="text-sm text-zinc-500 max-w-xs mb-8">
        Create a campaign to start scanning commercial rooftops and generating solar proposals.
      </p>
      <button
        onClick={onCreateCampaign}
        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-yellow-500/20"
      >
        <Plus className="w-4 h-4" />
        Launch First Campaign
      </button>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4 mt-12 text-left max-w-2xl">
        {[
          { icon: "🛰️", title: "Scan Buildings", desc: "Add commercial buildings with address & year built" },
          { icon: "💰", title: "ITC Calculator", desc: "Federal tax credits calculated automatically" },
          { icon: "📧", title: "Send Proposals", desc: "Track opened & replied proposals per owner" },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-xs font-semibold text-zinc-200 mb-1">{title}</div>
            <div className="text-xs text-zinc-500">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Empty buildings state ──────────────────────────────────────────────────────

function NoBuildings({ onAddBuilding }: { onAddBuilding: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
        <Building2 className="w-7 h-7 text-zinc-500" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-300 mb-1">No Buildings Yet</h3>
      <p className="text-xs text-zinc-600 mb-6 max-w-xs">
        Add commercial buildings to start building your pipeline.
      </p>
      <button
        onClick={onAddBuilding}
        className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 text-sm rounded-lg transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add First Building
      </button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function SolarClawDashboard() {
  const { state, clearAll } = useSolarClaw();
  const { campaign, buildings, events } = state;
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showAddBuilding, setShowAddBuilding] = useState(false);

  const recentEvents = events.slice(0, 6);
  const topProspects = [...buildings]
    .sort((a, b) => b.urgencyScore - a.urgencyScore)
    .slice(0, 5);
  const totalITC = buildings.reduce((a, b) => a + b.itc.federalItc, 0);
  const totalSavings = buildings.reduce((a, b) => a + b.itc.savings25yr, 0);
  const totalKw = buildings.reduce((a, b) => a + b.solar.systemKw, 0);

  return (
    <SolarClawLayout>
      {showCreateCampaign && <CreateCampaignModal onClose={() => setShowCreateCampaign(false)} />}
      {showAddBuilding && <AddBuildingModal onClose={() => setShowAddBuilding(false)} />}

      {/* No campaign empty state */}
      {!campaign ? (
        <NoCampaign onCreateCampaign={() => setShowCreateCampaign(true)} />
      ) : (
        <>
          {/* Header */}
          <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
            <div>
              <h1 className="text-sm font-semibold text-white">Campaign Dashboard</h1>
              <p className="text-xs text-zinc-500">{campaign.name} — {campaign.status === "running" ? "Active" : campaign.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Pipeline running
              </span>
              <button
                onClick={() => setShowAddBuilding(true)}
                className="flex items-center gap-1.5 text-xs bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Building
              </button>
              <Link to="/solarclaw/activity" className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1.5 transition-colors">
                Live Feed <ArrowRight className="w-3 h-3" />
              </Link>
              <button onClick={clearAll} title="Reset all data" className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-600 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Building2} label="Buildings Added" value={buildings.length.toString()} sub={`${campaign.city}, ${campaign.state}`} accent="bg-sky-500/20 text-sky-400" />
              <StatCard icon={Zap} label="Qualified Leads" value={buildings.filter(b => b.urgencyScore >= 60).length.toString()} sub="Urgency score ≥ 60" accent="bg-yellow-500/20 text-yellow-400" />
              <StatCard icon={FileText} label="Proposals Sent" value={campaign.proposalsSent.toString()} sub={`${buildings.filter(b => b.proposalStatus === "Opened").length} opened`} accent="bg-indigo-500/20 text-indigo-400" />
              <StatCard icon={DollarSign} label="Total Pipeline" value={formatCurrency(totalSavings)} sub="Estimated 25-yr savings" accent="bg-emerald-500/20 text-emerald-400" />
            </div>

            {/* Secondary KPIs */}
            {buildings.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Total Federal ITC</div>
                  <div className="text-xl font-bold text-green-400">{formatCurrency(totalITC)}</div>
                  <div className="text-xs text-zinc-500 mt-1">Base 30% across all buildings</div>
                  <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Total Solar Capacity</div>
                  <div className="text-xl font-bold text-yellow-400">
                    {totalKw >= 1000 ? `${(totalKw / 1000).toFixed(1)} MW` : `${totalKw.toLocaleString()} kW`}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {buildings.reduce((a, b) => a + b.solar.panelCount, 0).toLocaleString()} total panels
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Sun className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-xs text-zinc-400">~3,850 sun hrs/yr (estimate)</span>
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Safe Harbor Deadline</div>
                  <div className="text-xl font-bold text-red-400">Jul 4, 2026</div>
                  <div className="text-xs text-zinc-500 mt-1">Days to lock 30% ITC</div>
                  <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] text-zinc-500">Deposit 5% of system cost</span>
                  </div>
                </div>
              </div>
            )}

            {/* Buildings + Activity */}
            <div className="grid grid-cols-5 gap-4">
              {/* Top prospects */}
              <div className="col-span-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <h2 className="text-sm font-semibold text-white">Top Prospects</h2>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowAddBuilding(true)} className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                    <Link to="/solarclaw/prospects" className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1">
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                {topProspects.length === 0 ? (
                  <NoBuildings onAddBuilding={() => setShowAddBuilding(true)} />
                ) : (
                  <div className="divide-y divide-zinc-800">
                    {topProspects.map((building) => (
                      <Link key={building.id} to={`/solarclaw/building/${building.id}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-800/40 transition-colors group">
                        {/* Urgency ring */}
                        <div className="relative flex-shrink-0">
                          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15" fill="none" stroke="#27272a" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15" fill="none"
                              stroke={building.urgencyLabel === "Critical" ? "#f87171" : building.urgencyLabel === "Aging" ? "#fbbf24" : "#34d399"}
                              strokeWidth="3"
                              strokeDasharray={`${(building.urgencyScore / 100) * 94} 94`}
                              strokeLinecap="round" />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                            {building.urgencyScore}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-zinc-100 truncate group-hover:text-white">{building.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                            <span className="text-xs text-zinc-500 truncate">{building.address}, {building.city}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-semibold text-emerald-400">{formatCurrency(building.itc.savings25yr)}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">25-yr savings</div>
                        </div>
                        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border flex-shrink-0", urgencyBg(building.urgencyLabel))}>
                          {building.urgencyLabel}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent activity */}
              <div className="col-span-2 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
                  <Link to="/solarclaw/activity" className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1">
                    Live feed <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="p-4">
                  {recentEvents.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-zinc-600">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="text-xs">No activity yet</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentEvents.map((evt) => (
                        <div key={evt.id} className="flex items-start gap-3">
                          <span className="text-base leading-none mt-0.5 flex-shrink-0">{evt.icon}</span>
                          <div className="min-w-0">
                            <p className={cn("text-xs font-medium leading-snug", activityTypeColor(evt.type))}>{evt.message}</p>
                            {evt.detail && <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{evt.detail}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pipeline breakdown */}
            {buildings.length > 0 && (
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                <h2 className="text-sm font-semibold text-white mb-4">Pipeline Stage Breakdown</h2>
                <div className="space-y-3">
                  {([
                    ["Scanned", buildings.length],
                    ["Solar Analyzed", buildings.filter(b => ["solar_analyzed","owner_found","itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length],
                    ["Owner Found", buildings.filter(b => ["owner_found","itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length],
                    ["ITC Calculated", buildings.filter(b => ["itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length],
                    ["Proposal Sent", buildings.filter(b => b.pipelineStatus === "proposal_sent").length],
                  ] as [string, number][]).map(([label, count]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-28 text-xs text-zinc-400 text-right">{label}</span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all"
                          style={{ width: buildings.length ? `${(count / buildings.length) * 100}%` : "0%" }} />
                      </div>
                      <span className="w-6 text-xs text-zinc-400">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </SolarClawLayout>
  );
}
