import { Link } from "react-router-dom";
import {
  FileText, Mail, Clock, CheckCircle, Eye, ArrowRight,
  Sun, DollarSign, User, Plus, Building2,
} from "lucide-react";
import { SolarClawLayout } from "@/components/solarclaw/SolarClawLayout";
import { useSolarClaw } from "@/context/SolarClawContext";
import {
  formatCurrency, urgencyBg, proposalStatusBg, type Building,
} from "@/data/solarclaw";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AddBuildingModal } from "@/components/solarclaw/AddBuildingModal";
import { AddOwnerModal } from "@/components/solarclaw/AddOwnerModal";

// ── Proposal Card ──────────────────────────────────────────────────────────────

function ProposalCard({ building }: { building: Building }) {
  const { sendProposal, markProposalOpened, markProposalReplied } = useSolarClaw();
  const [showOwnerModal, setShowOwnerModal] = useState(false);

  const sentDate = building.proposalSentAt
    ? new Date(building.proposalSentAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : null;

  const hasOwner = Boolean(building.owner.name);
  const canSend = hasOwner && building.proposalStatus === "Pending";
  const isSent = building.proposalStatus !== "Pending";

  return (
    <>
      {showOwnerModal && (
        <AddOwnerModal building={building} onClose={() => setShowOwnerModal(false)} />
      )}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link to={`/solarclaw/building/${building.id}`}
                  className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors">
                  {building.name}
                </Link>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {building.address}, {building.city}, {building.state}
                </div>
              </div>
              <span className={cn("text-[10px] px-2.5 py-1 rounded-full border font-medium flex-shrink-0", proposalStatusBg(building.proposalStatus))}>
                {building.proposalStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-3 gap-4">
          {/* Owner */}
          <div className="space-y-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Recipient</div>
            {hasOwner ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {building.owner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-200">{building.owner.name}</div>
                    <div className="text-[10px] text-zinc-500">{building.owner.title}</div>
                  </div>
                </div>
                {building.owner.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-zinc-500" />
                    <span className="text-[11px] text-zinc-400 font-mono truncate">{building.owner.email}</span>
                  </div>
                )}
                {sentDate && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-[11px] text-zinc-500">{sentDate}</span>
                  </div>
                )}
                {building.proposalStatus === "Opened" && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400">Opened</span>
                  </div>
                )}
                {building.proposalStatus === "Replied" && (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-violet-400" />
                    <span className="text-[11px] text-violet-400">Replied</span>
                  </div>
                )}
                <button onClick={() => setShowOwnerModal(true)}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 underline transition-colors">
                  Edit owner info
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-xs text-zinc-600">No owner added yet</div>
                <button onClick={() => setShowOwnerModal(true)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  <User className="w-3 h-3" /> Add Owner Info
                </button>
              </div>
            )}
          </div>

          {/* Financial highlights */}
          <div className="space-y-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Proposal Highlights</div>
            <div className="space-y-2">
              {[
                { icon: Sun, label: "System Size", value: `${building.solar.systemKw.toLocaleString()} kW`, color: "text-yellow-400" },
                { icon: DollarSign, label: "25-YR Savings", value: formatCurrency(building.itc.savings25yr), color: "text-emerald-400" },
                { icon: DollarSign, label: "Federal ITC", value: formatCurrency(building.itc.federalItc), color: "text-green-400" },
                { icon: Clock, label: "Payback Period", value: `${building.itc.paybackYears} yrs`, color: "text-sky-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-zinc-600" />
                    <span className="text-[11px] text-zinc-500">{label}</span>
                  </div>
                  <span className={cn("text-xs font-semibold", color)}>{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 flex items-center gap-1.5">
              <span className="text-sm">⏰</span>
              <span className="text-[10px] text-red-400">ITC deadline: {building.itc.safeHarborDeadline}</span>
            </div>
          </div>

          {/* Urgency & roof */}
          <div className="space-y-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Roof Status</div>
            <div className="space-y-2">
              <span className={cn("inline-flex text-[10px] px-2.5 py-1 rounded-full border font-medium", urgencyBg(building.urgencyLabel))}>
                {building.urgencyLabel} Urgency
              </span>
              <div className="text-xs text-zinc-400">Built {building.yearBuilt} · {building.roofAge} yr old roof</div>
              <div className="text-xs text-zinc-400">{building.solar.roofSqft.toLocaleString()} sqft · {building.solar.panelCount.toLocaleString()} panels</div>
            </div>
            <div className="border-t border-zinc-800 pt-3 space-y-2">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Actions</div>
              {building.proposalStatus === "Pending" && (
                canSend ? (
                  <button onClick={() => sendProposal(building.id)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg px-3 py-2 hover:bg-indigo-500/30 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Send Proposal
                  </button>
                ) : (
                  <button onClick={() => setShowOwnerModal(true)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg px-3 py-2 hover:bg-blue-500/30 transition-colors">
                    <User className="w-3.5 h-3.5" /> Add Owner First
                  </button>
                )
              )}
              {building.proposalStatus === "Sent" && (
                <button onClick={() => markProposalOpened(building.id)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg px-3 py-2 hover:bg-emerald-500/30 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> Mark Opened
                </button>
              )}
              {building.proposalStatus === "Opened" && (
                <button onClick={() => markProposalReplied(building.id)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-lg px-3 py-2 hover:bg-violet-500/30 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Replied
                </button>
              )}
              {building.proposalStatus === "Replied" && (
                <div className="text-center text-xs text-violet-400 font-medium py-1">✓ Replied</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-zinc-800/30 border-t border-zinc-800 flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">
            {building.solar.systemKw.toLocaleString()} kW · {building.solar.panelCount.toLocaleString()} panels
          </span>
          <div className="ml-auto">
            <Link to={`/solarclaw/building/${building.id}`}
              className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-lg px-2.5 py-1.5 transition-colors">
              View Building <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function SolarClawProposals() {
  const { state } = useSolarClaw();
  const { buildings } = state;
  const [showAddBuilding, setShowAddBuilding] = useState(false);

  const sent = buildings.filter(b => ["Sent","Opened","Replied"].includes(b.proposalStatus));
  const readyToSend = buildings.filter(b => b.proposalStatus === "Pending" && b.owner.name);
  const needsOwner = buildings.filter(b => b.proposalStatus === "Pending" && !b.owner.name);

  return (
    <SolarClawLayout>
      {showAddBuilding && <AddBuildingModal onClose={() => setShowAddBuilding(false)} />}

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-white">Proposals</h1>
          <p className="text-xs text-zinc-500">
            {sent.length} sent · {buildings.filter(b => b.proposalStatus === "Opened").length} opened · {buildings.filter(b => b.proposalStatus === "Replied").length} replied
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {[
            { label: "Sent", count: sent.filter(b => b.proposalStatus === "Sent").length, color: "text-blue-400" },
            { label: "Opened", count: buildings.filter(b => b.proposalStatus === "Opened").length, color: "text-emerald-400" },
            { label: "Replied", count: buildings.filter(b => b.proposalStatus === "Replied").length, color: "text-violet-400" },
          ].map(({ label, count, color }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={cn("font-semibold", color)}>{count}</span>
              <span className="text-zinc-500">{label}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {buildings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">No Proposals Yet</h3>
            <p className="text-xs text-zinc-600 mb-6 max-w-xs">
              Add buildings, identify their owners, then send personalized proposals.
            </p>
            <button onClick={() => setShowAddBuilding(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add First Building
            </button>
          </div>
        ) : (
          <>
            {sent.length > 0 && (
              <section>
                <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Sent</h2>
                <div className="space-y-4">{sent.map(b => <ProposalCard key={b.id} building={b} />)}</div>
              </section>
            )}
            {readyToSend.length > 0 && (
              <section>
                <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Ready to Send</h2>
                <div className="space-y-4">{readyToSend.map(b => <ProposalCard key={b.id} building={b} />)}</div>
              </section>
            )}
            {needsOwner.length > 0 && (
              <section>
                <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Needs Owner Info</h2>
                <div className="space-y-4">{needsOwner.map(b => <ProposalCard key={b.id} building={b} />)}</div>
              </section>
            )}
          </>
        )}
      </div>
    </SolarClawLayout>
  );
}
