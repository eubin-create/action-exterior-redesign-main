import { useState } from "react";
import { X, User, Mail, Phone, Building2 } from "lucide-react";
import { useSolarClaw, type AddOwnerInput } from "@/context/SolarClawContext";
import type { Building } from "@/data/solarclaw";
import { cn } from "@/lib/utils";

interface Props {
  building: Building;
  onClose: () => void;
}

export function AddOwnerModal({ building, onClose }: Props) {
  const { addOwner } = useSolarClaw();
  const [form, setForm] = useState<AddOwnerInput>({
    name: building.owner.name,
    title: building.owner.title,
    company: building.owner.company,
    email: building.owner.email,
    phone: building.owner.phone,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddOwnerInput, string>>>({});

  function set<K extends keyof AddOwnerInput>(k: K, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  }

  function validate() {
    const e: Partial<Record<keyof AddOwnerInput, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    addOwner(building.id, form);
    onClose();
  }

  const Field = ({
    label, name, type = "text", placeholder, icon: Icon,
  }: {
    label: string; name: keyof AddOwnerInput; type?: string;
    placeholder?: string; icon?: React.ElementType;
  }) => (
    <div>
      <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
        )}
        <input
          type={type}
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-zinc-800 border rounded-lg py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors",
            Icon ? "pl-9 pr-3" : "px-3",
            errors[name] ? "border-red-500/60" : "border-zinc-700"
          )}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  const isEditing = Boolean(building.owner.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {isEditing ? "Edit Owner" : "Add Owner"}
            </h2>
            <p className="text-xs text-zinc-500 truncate max-w-[220px]">{building.name}</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Full Name *" name="name" placeholder="Kent McClelland" icon={User} />
          <Field label="Title / Role" name="title" placeholder="President & CEO" />
          <Field label="Company *" name="company" placeholder="Shamrock Foods Company" icon={Building2} />

          <div className="border-t border-zinc-800 pt-4 space-y-4">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Contact</div>
            <Field label="Email Address" name="email" type="email" placeholder="k.mcclelland@company.com" icon={Mail} />
            <Field label="Phone" name="phone" placeholder="+1 (602) 477-2800" icon={Phone} />
          </div>

          {form.email && form.email.includes("@") && (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400">
              ✓ Email will be automatically verified for deliverability
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-colors">
              {isEditing ? "Update Owner" : "Identify Owner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
