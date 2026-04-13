import { useState } from "react";
import { X, MapPin, Zap } from "lucide-react";
import { useSolarClaw, type CreateCampaignInput } from "@/context/SolarClawContext";
import { cn } from "@/lib/utils";

interface Props {
  onClose: () => void;
}

const US_STATES = [
  "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL",
  "IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE",
  "NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VA","VT","WA","WI","WV","WY",
];

export function CreateCampaignModal({ onClose }: Props) {
  const { createCampaign } = useSolarClaw();
  const [form, setForm] = useState<CreateCampaignInput>({
    name: "",
    city: "",
    state: "AZ",
    radiusMiles: 10,
  });
  const [errors, setErrors] = useState<Partial<CreateCampaignInput>>({});

  function validate() {
    const e: Partial<Record<keyof CreateCampaignInput, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (form.radiusMiles < 1 || form.radiusMiles > 100)
      e.radiusMiles = "1–100 miles";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs as any); return; }
    createCampaign(form);
    onClose();
  }

  function set<K extends keyof CreateCampaignInput>(k: K, v: CreateCampaignInput[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">New Campaign</h2>
            <p className="text-xs text-zinc-500">Define your target market area</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Campaign name */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Campaign Name</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Phoenix Metro Q2 2026"
              className={cn(
                "w-full bg-zinc-800 border rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors",
                errors.name ? "border-red-500/60" : "border-zinc-700"
              )}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">
                <MapPin className="inline w-3 h-3 mr-1" />City
              </label>
              <input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Phoenix"
                className={cn(
                  "w-full bg-zinc-800 border rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors",
                  errors.city ? "border-red-500/60" : "border-zinc-700"
                )}
              />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">State</label>
              <select
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
              >
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Radius */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">
              Search Radius — <span className="text-zinc-200 font-medium">{form.radiusMiles} miles</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={form.radiusMiles}
              onChange={(e) => set("radiusMiles", Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
              <span>1 mi</span><span>25 mi</span><span>50 mi</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
