"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lamp, Package, Sparkles, Table2, Warehouse } from "lucide-react";
import { ProjectStepper } from "@/components/generator/ProjectStepper";
import { Button } from "@/components/ui/Button";

const assetCategories = [
  {
    label: "Seating",
    icon: Package,
    assets: ["Sofa", "Armchair", "Ottoman", "Bench"],
  },
  {
    label: "Tables",
    icon: Table2,
    assets: ["Coffee Table", "Dining Table", "Study Table", "Side Table"],
  },
  {
    label: "Storage",
    icon: Warehouse,
    assets: ["Wardrobe", "Bookshelf", "TV Unit", "Cabinet"],
  },
  {
    label: "Lighting and decor",
    icon: Lamp,
    assets: ["Indoor Plants", "Wall Art", "Rug", "Curtains", "Ceiling Light", "Floor Lamp"],
  },
];

const toId = (label: string) => label.toLowerCase().replaceAll(" ", "_");

export default function AssetSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const allAssets = assetCategories.flatMap((c) => c.assets.map((label) => ({ id: toId(label), label })));

  return (
    <div className="mx-auto max-w-4xl">
      <ProjectStepper currentStep={4} />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">Step 4</p>
          <h1 className="text-3xl font-bold text-white">Add furniture and assets</h1>
          <p className="mt-2 text-sm text-gray-400">Choose the items AI should consider in the composition.</p>
        </div>
        {selected.length > 0 && (
          <div className="shrink-0 rounded-sm border border-brand-gold/20 bg-brand-gold/10 px-4 py-3 text-center">
            <div className="text-xl font-bold leading-none text-brand-gold">{selected.length}</div>
            <div className="mt-1 text-xs text-gray-500">selected</div>
          </div>
        )}
      </div>

      <div className="mb-8 space-y-5">
        {assetCategories.map((cat, ci) => (
          <motion.section
            key={cat.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.06 }}
            className="rounded-sm border border-white/10 bg-brand-panel/80 p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <cat.icon size={18} className="text-brand-gold" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{cat.label}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cat.assets.map((label) => {
                const id = toId(label);
                const isSelected = selected.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className={`relative rounded-sm border p-3 text-left text-sm font-medium transition-all ${
                      isSelected
                        ? "border-brand-gold/60 bg-brand-gold/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-ink">
                        <Check size={10} />
                      </span>
                    )}
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-sm border border-white/10 bg-brand-panel/80 p-4">
          <p className="mb-3 text-xs font-semibold text-gray-400">Selected assets</p>
          <div className="flex flex-wrap gap-2">
            {selected.map((id) => {
              const asset = allAssets.find((a) => a.id === id);
              return (
                <button
                  key={id}
                  onClick={() => toggle(id)}
                  className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  {asset?.label} remove
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={() => router.back()} className="rounded-sm border-white/15 text-white hover:bg-white/5">
          <ArrowLeft size={16} /> Back
        </Button>
        <Button variant="brand" size="lg" className="flex-1 rounded-sm uppercase tracking-wide" onClick={() => router.push("/dashboard/ai-generation")}>
          <Sparkles size={18} />
          Generate design
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
