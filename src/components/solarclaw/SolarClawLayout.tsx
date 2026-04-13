import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Activity, Building2, FileText, Zap, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSolarClaw } from "@/context/SolarClawContext";
import { formatCurrency } from "@/data/solarclaw";

const NAV_ITEMS = [
  { href: "/solarclaw", label: "Dashboard", icon: LayoutDashboard },
  { href: "/solarclaw/activity", label: "Activity Feed", icon: Activity },
  { href: "/solarclaw/prospects", label: "Prospects", icon: Building2 },
  { href: "/solarclaw/proposals", label: "Proposals", icon: FileText },
];

interface SolarClawLayoutProps {
  children: React.ReactNode;
}

export function SolarClawLayout({ children }: SolarClawLayoutProps) {
  const location = useLocation();
  const { state } = useSolarClaw();
  const { campaign, buildings, events } = state;

  const totalSavings = buildings.reduce((a, b) => a + b.itc.savings25yr, 0);
  const qualified = buildings.filter(b => b.urgencyScore >= 60).length;

  return (
    <div className="flex h-screen bg-[#0a0c10] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-zinc-800 flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-zinc-800">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-white">
            Solar<span className="text-yellow-400">Claw</span>
          </span>
          {campaign && (
            <span className="ml-auto text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
              LIVE
            </span>
          )}
        </div>

        {/* Campaign badge */}
        <div className="mx-3 mt-3 p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60">
          {campaign ? (
            <>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Active Campaign</div>
              <div className="text-xs font-medium text-zinc-200 truncate">{campaign.name}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-zinc-400">{buildings.length} building{buildings.length !== 1 ? "s" : ""} added</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">No Campaign</div>
              <Link to="/solarclaw" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                Launch campaign →
              </Link>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 pt-3 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/solarclaw"
              ? location.pathname === href
              : location.pathname.startsWith(href);
            return (
              <Link key={href} to={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                  isActive ? "bg-zinc-700/70 text-white" : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                )}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer stats */}
        <div className="p-3 border-t border-zinc-800 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-zinc-800/60 p-2 text-center">
              <div className="text-[10px] text-zinc-500">Qualified</div>
              <div className="text-sm font-semibold text-white">{qualified}</div>
            </div>
            <div className="rounded-lg bg-zinc-800/60 p-2 text-center">
              <div className="text-[10px] text-zinc-500">Proposals</div>
              <div className="text-sm font-semibold text-white">{campaign?.proposalsSent ?? 0}</div>
            </div>
          </div>
          {totalSavings > 0 && (
            <div className="text-[10px] text-zinc-500 text-center">
              Pipeline: <span className="text-emerald-400 font-medium">{formatCurrency(totalSavings)}</span> est.
            </div>
          )}
          {events.length > 0 && (
            <div className="text-[10px] text-zinc-600 text-center">{events.length} events logged</div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
