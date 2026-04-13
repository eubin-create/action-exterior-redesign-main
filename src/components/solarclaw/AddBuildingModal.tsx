import { useState, useMemo } from "react";
import { X, Building2, Sun, DollarSign, Zap, ChevronRight } from "lucide-react";
import { useSolarClaw, calcBuildingData, type AddBuildingInput } from "@/context/SolarClawContext";
import { formatCurrency, urgencyBg } from "@/data/solarclaw";
import { cn } from "@/lib/utils";

interface Props {
  onClose: () => void;
  onAdded?: (id: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export function AddBuildingModal({ onClose, onAdded }: Props) {
  const { addBuilding } = useSolarClaw();
  const [form, setForm] = useState<AddBuildingInput>({
    name: "",
    address: "",
    city: "",
    state: "AZ",
    yearBuilt: 1990,
    roofSqft: 50000,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddBuildingInput, string>>>({});

  const preview = useMemo(() => {
    if (form.yearBuilt < 1900 || form.yearBuilt > CURRENT_YEAR) return null;
    if (form.roofSqft < 1000) return null;
    return calcBuildingData(form.yearBuilt, form.roofSqft);
  }, [form.yearBuilt, form.roofSqft]);

  function set<K extends keyof AddBuildingInput>(k: K, v: AddBuildingInput[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  }

  function validate() {
    const e: Partial<Record<keyof AddBuildingInput, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (form.yearBuilt < 1900 || form.yearBuilt > CURRENT_YEAR)
      e.yearBuilt = `Must be 1900–${CURRENT_YEAR}`;
    if (form.roofSqft < 1000) e.roofSqft = "Minimum 1,000 sqft";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const building = addBuilding(form);
    onAdded?.(building.id);
    onClose();
  }

  const Field = ({
    label, name, type = "text", placeholder, min, max, step,
  }: {
    label: string; name: keyof AddBuildingInput; type?: string;
    placeholder?: string; min?: number; max?: number; step?: number;
  }) => (
    <div>
      <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={String(form[name] ?? "")}
        onChange={(e) => {
          const raw = e.target.value;
          set(name, (type === "number" ? (raw === "" ? 0 : Number(raw)) : raw) as AddBuildingInput[typeof name]);
        }}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={cn(
          "w-full bg-zinc-800 border rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors",
          errors[name] ? "border-red-500/60" : "border-zinc-700"
        )}
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Add Building</h2>
            <p className="text-xs text-zinc-500">ITC & solar estimates calculated instantly</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Left: Form fields */}
              <div className="space-y-4">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Building Info</div>

                <Field label="Building / Company Name" name="name" placeholder="e.g. Shamrock Foods Warehouse" />
                <Field label="Street Address" name="address" placeholder="e.g. 3900 E Camelback Rd" />

                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" name="city" placeholder="Phoenix" />
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">State</label>
                    <select
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                    >
                      {["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3">Roof Details</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Year Built" name="yearBuilt" type="number" min={1900} max={CURRENT_YEAR} />
                    <Field label="Roof Sqft" name="roofSqft" type="number" min={1000} step={1000} placeholder="50000" />
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Coordinates</div>
                  <p className="text-[10px] text-zinc-600 mb-3">Optional — used for map display only. Leave blank to use city center.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Latitude" name="lat" type="number" step={0.0001} placeholder="33.4484" />
                    <Field label="Longitude" name="lng" type="number" step={0.0001} placeholder="-112.0740" />
                  </div>
                </div>
              </div>

              {/* Right: Live ITC preview */}
              <div className="space-y-3">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Live Estimates</div>

                {!preview ? (
                  <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-6 flex flex-col items-center justify-center text-center h-48">
                    <Zap className="w-8 h-8 text-zinc-600 mb-2" />
                    <p className="text-xs text-zinc-500">Enter year built & sqft to see instant estimates</p>
                  </div>
                ) : (
                  <>
                    {/* Urgency */}
                    <div className="rounded-xl bg-zinc-800/60 border border-zinc-700/50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">Urgency Score</span>
                        <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-medium", urgencyBg(preview.urgencyLabel))}>
                          {preview.urgencyLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-white">{preview.urgencyScore}</div>
                        <div className="flex-1">
                          <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${preview.urgencyScore}%`,
                                backgroundColor: preview.urgencyLabel === "Critical" ? "#f87171" : preview.urgencyLabel === "Aging" ? "#fbbf24" : "#34d399",
                              }}
                            />
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-1">
                            Built {form.yearBuilt} · {preview.roofAge} yr old roof
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Solar */}
                    <div className="rounded-xl bg-zinc-800/60 border border-zinc-700/50 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                        <Sun className="w-3 h-3 text-yellow-400" />Solar Design
                      </div>
                      {[
                        { label: "System Size", value: `${preview.solar.systemKw.toLocaleString()} kW`, color: "text-yellow-400" },
                        { label: "Panel Count", value: `${preview.solar.panelCount.toLocaleString()} panels`, color: "text-orange-400" },
                        { label: "Annual Output", value: `${(preview.solar.annualKwh / 1000).toFixed(0)}K kWh/yr`, color: "text-sky-400" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-zinc-500">{label}</span>
                          <span className={cn("font-semibold", color)}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* ITC */}
                    <div className="rounded-xl bg-zinc-800/60 border border-zinc-700/50 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                        <DollarSign className="w-3 h-3 text-green-400" />Federal ITC
                      </div>
                      {[
                        { label: "System Cost", value: formatCurrency(preview.itc.systemCost), color: "text-zinc-300" },
                        { label: "Federal ITC (30%)", value: formatCurrency(preview.itc.federalItc), color: "text-emerald-400" },
                        { label: "25-Year Savings", value: formatCurrency(preview.itc.savings25yr), color: "text-green-400" },
                        { label: "Payback Period", value: `${preview.itc.paybackYears} yrs`, color: "text-sky-400" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-zinc-500">{label}</span>
                          <span className={cn("font-semibold", color)}>{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-400 flex items-center gap-1.5">
                      <span>⏰</span> Safe harbor deadline: Jul 4, 2026
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3 border-t border-zinc-800 pt-4">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors">
                Add to Pipeline
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
