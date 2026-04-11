import { Link } from "react-router-dom";
import {
  FileText,
  Mail,
  Clock,
  CheckCircle,
  Eye,
  ArrowRight,
  Download,
  Sun,
  DollarSign,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import {
  BUILDINGS,
  formatCurrency,
  urgencyBg,
  proposalStatusBg,
  type Building,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";

// ── Mock proposal timeline ─────────────────────────────────────────────────────

const PROPOSAL_TIMELINE: Record<
  string,
  Array<{ icon: string; label: string; time: string; done: boolean }>
> = {
  "bldg-001": [
    { icon: "🛰️", label: "Building scanned", time: "Apr 10, 8:01 AM", done: true },
    { icon: "☀️", label: "Solar analyzed", time: "Apr 10, 8:01 AM", done: true },
    { icon: "👤", label: "Owner identified", time: "Apr 10, 8:01 AM", done: true },
    { icon: "💰", label: "ITC calculated", time: "Apr 10, 8:02 AM", done: true },
    { icon: "📧", label: "Proposal sent", time: "Apr 10, 9:14 AM", done: true },
    { icon: "👁️", label: "Opened ×3", time: "Apr 10, 11:42 AM", done: true },
    { icon: "💬", label: "Reply received", time: "Awaiting...", done: false },
  ],
};

function ProposalCard({ building }: { building: Building }) {
  const sentDate = building.proposalSentAt
    ? new Date(building.proposalSentAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const timeline =
    PROPOSAL_TIMELINE[building.id] ??
    PROPOSAL_TIMELINE["bldg-001"].slice(0, 4);

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      {/* Card header */}
      <div className="flex items-start gap-4 p-5 border-b border-zinc-800">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-indigo-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/solarclaw/building/${building.id}`}
                className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors"
              >
                {building.name}
              </Link>
              <div className="text-xs text-zinc-500 mt-0.5">
                {building.address}, {building.city}, {building.state}
              </div>
            </div>
            <span
              className={cn(
                "text-[10px] px-2.5 py-1 rounded-full border font-medium flex-shrink-0",
                proposalStatusBg(building.proposalStatus)
              )}
            >
              {building.proposalStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 grid grid-cols-3 gap-4">
        {/* Owner + send info */}
        <div className="space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Recipient
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
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
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-zinc-500" />
            <span className="text-[11px] text-zinc-400 font-mono truncate">
              {building.owner.email}
            </span>
          </div>
          {sentDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span className="text-[11px] text-zinc-500">{sentDate}</span>
            </div>
          )}
          {building.proposalStatus === "Opened" && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">
                Opened 3× · Last: 11:42 AM
              </span>
            </div>
          )}
          {building.proposalStatus === "Pending" && (
            <div className="flex items-center gap-1.5 text-zinc-600">
              <Clock className="w-3 h-3" />
              <span className="text-[11px]">Not yet sent</span>
            </div>
          )}
        </div>

        {/* Financial summary */}
        <div className="space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Proposal Highlights
          </div>
          <div className="space-y-2">
            {[
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
              {
                icon: Clock,
                label: "Payback Period",
                value: `${building.itc.paybackYears} yrs`,
                color: "text-sky-400",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-zinc-600" />
                  <span className="text-[11px] text-zinc-500">{label}</span>
                </div>
                <span className={cn("text-xs font-semibold", color)}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 flex items-center gap-1.5">
            <span className="text-sm">⏰</span>
            <span className="text-[10px] text-red-400">
              ITC safe harbor: {building.itc.safeHarborDeadline}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Timeline
          </div>
          <div className="space-y-2">
            {timeline.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center",
                    step.done
                      ? "bg-emerald-500/20 border-emerald-500/40"
                      : "bg-zinc-800 border-zinc-700"
                  )}
                >
                  {step.done ? (
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <Clock className="w-2.5 h-2.5 text-zinc-600" />
                  )}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-[11px] font-medium",
                      step.done ? "text-zinc-300" : "text-zinc-600"
                    )}
                  >
                    {step.icon} {step.label}
                  </div>
                  <div className="text-[10px] text-zinc-600">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 bg-zinc-800/30 border-t border-zinc-800 flex items-center gap-2">
        <span
          className={cn(
            "text-[10px] px-2 py-0.5 rounded-full border",
            urgencyBg(building.urgencyLabel)
          )}
        >
          {building.urgencyLabel} Urgency
        </span>
        <span className="text-zinc-700">·</span>
        <span className="text-[10px] text-zinc-500">
          Built {building.yearBuilt} · {building.roofAge} year old roof
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-lg px-2.5 py-1.5 transition-colors">
            <Download className="w-3 h-3" />
            PDF
          </button>
          <Link
            to={`/solarclaw/building/${building.id}`}
            className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-lg px-2.5 py-1.5 transition-colors"
          >
            View Building
            <ArrowRight className="w-3 h-3" />
          </Link>
          {building.proposalStatus === "Pending" && (
            <button className="flex items-center gap-1.5 text-[11px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg px-2.5 py-1.5 hover:bg-indigo-500/30 transition-colors">
              <Mail className="w-3 h-3" />
              Send Proposal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SolarClawProposals() {
  const withProposals = BUILDINGS.filter(
    (b) =>
      b.proposalStatus === "Sent" ||
      b.proposalStatus === "Opened" ||
      b.proposalStatus === "Replied"
  );
  const pending = BUILDINGS.filter((b) => b.proposalStatus === "Pending");

  return (
    <SolarClawLayout>
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">Proposals</h1>
          <p className="text-xs text-zinc-500">
            {withProposals.length} sent · {pending.length} pending ·{" "}
            {BUILDINGS.filter((b) => b.proposalStatus === "Opened").length}{" "}
            opened
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs">
            {[
              { label: "Sent", count: withProposals.filter(b => b.proposalStatus === "Sent").length, color: "text-blue-400" },
              { label: "Opened", count: withProposals.filter(b => b.proposalStatus === "Opened").length, color: "text-emerald-400" },
              { label: "Replied", count: withProposals.filter(b => b.proposalStatus === "Replied").length, color: "text-violet-400" },
            ].map(({ label, count, color }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={cn("font-semibold", color)}>{count}</span>
                <span className="text-zinc-500">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Sent/Opened proposals */}
        {withProposals.length > 0 && (
          <div>
            <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Sent Proposals
            </h2>
            <div className="space-y-4">
              {withProposals.map((b) => (
                <ProposalCard key={b.id} building={b} />
              ))}
            </div>
          </div>
        )}

        {/* Pending proposals */}
        {pending.length > 0 && (
          <div>
            <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3 mt-6">
              Ready to Send
            </h2>
            <div className="space-y-4">
              {pending
                .filter((b) =>
                  ["itc_calculated", "owner_found"].includes(b.pipelineStatus)
                )
                .map((b) => (
                  <ProposalCard key={b.id} building={b} />
                ))}
            </div>
          </div>
        )}

        {/* Still in pipeline */}
        <div>
          <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3 mt-6">
            Still Processing
          </h2>
          <div className="space-y-4">
            {BUILDINGS.filter((b) =>
              ["scanned", "scored", "solar_analyzed"].includes(b.pipelineStatus)
            ).map((b) => (
              <ProposalCard key={b.id} building={b} />
            ))}
          </div>
        </div>
      </div>
    </SolarClawLayout>
  );
}
