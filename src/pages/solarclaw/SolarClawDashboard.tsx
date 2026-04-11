import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  FileText,
  DollarSign,
  Zap,
  ArrowRight,
  Sun,
  Clock,
  MapPin,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import {
  ACTIVE_CAMPAIGN,
  BUILDINGS,
  ACTIVITY_EVENTS,
  formatCurrency,
  urgencyBg,
  pipelineLabel,
  activityTypeColor,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            accent ?? "bg-zinc-800"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function SolarClawDashboard() {
  const recentEvents = [...ACTIVITY_EVENTS]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  const criticalBuildings = BUILDINGS.filter((b) => b.urgencyLabel === "Critical");

  const totalPipeline = BUILDINGS.reduce(
    (acc, b) => acc + b.itc.savings25yr,
    0
  );
  const totalITC = BUILDINGS.reduce((acc, b) => acc + b.itc.federalItc, 0);

  return (
    <SolarClawLayout>
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">Campaign Dashboard</h1>
          <p className="text-xs text-zinc-500">Phoenix Metro Q2 2026 — Active</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Pipeline running
          </span>
          <Link
            to="/solarclaw/activity"
            className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1.5 transition-colors"
          >
            Live Feed
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Building2}
            label="Buildings Scanned"
            value={ACTIVE_CAMPAIGN.buildingsScanned.toLocaleString()}
            sub={`${ACTIVE_CAMPAIGN.city}, ${ACTIVE_CAMPAIGN.state} · ${ACTIVE_CAMPAIGN.radiusMiles}mi radius`}
            accent="bg-sky-500/20 text-sky-400"
          />
          <StatCard
            icon={Zap}
            label="Qualified Leads"
            value={String(ACTIVE_CAMPAIGN.buildingsQualified)}
            sub="Urgency score ≥ 60"
            accent="bg-yellow-500/20 text-yellow-400"
          />
          <StatCard
            icon={FileText}
            label="Proposals Sent"
            value={String(ACTIVE_CAMPAIGN.proposalsSent)}
            sub="1 opened · 0 replied"
            accent="bg-indigo-500/20 text-indigo-400"
          />
          <StatCard
            icon={DollarSign}
            label="Total Pipeline"
            value={formatCurrency(totalPipeline)}
            sub="Estimated 25-yr savings"
            accent="bg-emerald-500/20 text-emerald-400"
          />
        </div>

        {/* Secondary KPI row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Total Federal ITC Available
            </div>
            <div className="text-xl font-bold text-green-400">
              {formatCurrency(totalITC)}
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Base 30% ITC across all qualified buildings
            </div>
            <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                style={{ width: "30%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
              <span>Base 30%</span>
              <span>Max 50% w/ bonuses</span>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Total Solar Capacity
            </div>
            <div className="text-xl font-bold text-yellow-400">
              {(
                BUILDINGS.reduce((a, b) => a + b.solar.systemKw, 0) / 1000
              ).toFixed(1)}{" "}
              MW
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {BUILDINGS.reduce(
                (a, b) => a + b.solar.panelCount,
                0
              ).toLocaleString()}{" "}
              total panels across all buildings
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-zinc-400">
                Avg{" "}
                {Math.round(
                  BUILDINGS.reduce((a, b) => a + b.solar.sunHoursPerYear, 0) /
                    BUILDINGS.length
                ).toLocaleString()}{" "}
                sun hrs/yr
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Safe Harbor Deadline
            </div>
            <div className="text-xl font-bold text-red-400">Jul 4, 2026</div>
            <div className="text-xs text-zinc-500 mt-1">
              84 days remaining to lock 30% ITC
            </div>
            <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                style={{ width: "68%" }}
              />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3 h-3 text-red-400" />
              <span className="text-[10px] text-zinc-500">
                Deposit 5% of system cost before deadline
              </span>
            </div>
          </div>
        </div>

        {/* Buildings + Activity split */}
        <div className="grid grid-cols-5 gap-4">
          {/* Critical buildings */}
          <div className="col-span-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white">
                Top Prospects
              </h2>
              <Link
                to="/solarclaw/prospects"
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {BUILDINGS.filter((b) => b.urgencyScore >= 60)
                .sort((a, b) => b.urgencyScore - a.urgencyScore)
                .slice(0, 5)
                .map((building) => (
                  <Link
                    key={building.id}
                    to={`/solarclaw/building/${building.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-800/40 transition-colors group"
                  >
                    {/* Urgency score ring */}
                    <div className="relative flex-shrink-0">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#27272a"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke={
                            building.urgencyLabel === "Critical"
                              ? "#f87171"
                              : building.urgencyLabel === "Aging"
                              ? "#fbbf24"
                              : "#34d399"
                          }
                          strokeWidth="3"
                          strokeDasharray={`${(building.urgencyScore / 100) * 94} 94`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                        {building.urgencyScore}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-100 truncate group-hover:text-white">
                        {building.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                        <span className="text-xs text-zinc-500 truncate">
                          {building.address}, {building.city}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-semibold text-emerald-400">
                        {formatCurrency(building.itc.savings25yr)}
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        25-yr savings
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                          urgencyBg(building.urgencyLabel)
                        )}
                      >
                        {building.urgencyLabel}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="col-span-2 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white">
                Recent Activity
              </h2>
              <Link
                to="/solarclaw/activity"
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
              >
                Live feed <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {recentEvents.map((evt) => (
                <div key={evt.id} className="flex items-start gap-3">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">
                    {evt.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-xs font-medium leading-snug",
                        activityTypeColor(evt.type)
                      )}
                    >
                      {evt.message}
                    </p>
                    {evt.detail && (
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">
                        {evt.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Progress Bar */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Pipeline Stage Breakdown
          </h2>
          <div className="space-y-3">
            {(
              [
                ["scanned", "Scanned", BUILDINGS.length, "#71717a"],
                ["scored", "Roof Scored", BUILDINGS.filter((b) => b.urgencyScore > 0).length, "#fbbf24"],
                ["solar_analyzed", "Solar Analyzed", BUILDINGS.filter((b) => ["solar_analyzed","owner_found","itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length, "#60a5fa"],
                ["owner_found", "Owner Found", BUILDINGS.filter((b) => ["owner_found","itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length, "#a78bfa"],
                ["itc_calculated", "ITC Calculated", BUILDINGS.filter((b) => ["itc_calculated","rendered","proposal_sent"].includes(b.pipelineStatus)).length, "#34d399"],
                ["proposal_sent", "Proposal Sent", BUILDINGS.filter((b) => b.pipelineStatus === "proposal_sent").length, "#818cf8"],
              ] as const
            ).map(([, label, count, color]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-28 text-xs text-zinc-400 text-right">{label}</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(count / BUILDINGS.length) * 100}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <span className="w-6 text-xs text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SolarClawLayout>
  );
}
