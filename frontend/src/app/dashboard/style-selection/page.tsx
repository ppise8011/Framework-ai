"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Crown, Factory, Hotel, Leaf, MountainSnow, Waves } from "lucide-react";
import { ProjectStepper } from "@/components/generator/ProjectStepper";
import { Button } from "@/components/ui/Button";

const styles = [
  { id: "modern", label: "Modern", icon: MountainSnow, desc: "Clean lines, neutral tones" },
  { id: "luxury", label: "Luxury", icon: Crown, desc: "Rich textures, gold accents" },
  { id: "scandinavian", label: "Scandinavian", icon: MountainSnow, desc: "Minimal, warm, functional" },
  { id: "minimal", label: "Minimal", icon: Check, desc: "Calm, open, intentional" },
  { id: "industrial", label: "Industrial", icon: Factory, desc: "Raw metals, exposed brick" },
  { id: "bohemian", label: "Bohemian", icon: Leaf, desc: "Layered, colorful, relaxed" },
  { id: "hotel", label: "Premium Hotel", icon: Hotel, desc: "Sophisticated and refined" },
  { id: "coastal", label: "Coastal", icon: Waves, desc: "Light, airy, beach inspired" },
];

export default function StyleSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const selectedStyle = styles.find((s) => s.id === selected);

  return (
    <div className="mx-auto max-w-4xl">
      <ProjectStepper currentStep={3} />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">Step 3</p>
        <h1 className="text-3xl font-bold text-white">Choose a design style</h1>
        <p className="mt-2 text-sm text-gray-400">Pick the visual direction for the generated room.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {styles.map((style, index) => (
          <motion.button
            key={style.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => setSelected(style.id)}
            className={`relative rounded-sm border p-5 text-left transition-all ${
              selected === style.id
                ? "border-brand-gold/60 bg-brand-gold/10 shadow-lg shadow-brand-gold/10"
                : "border-white/10 bg-brand-panel/80 hover:border-brand-gold/30 hover:bg-brand-panel2"
            }`}
          >
            {selected === style.id && (
              <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-brand-ink">
                <Check size={12} />
              </div>
            )}
            <style.icon size={26} className="mb-5 text-brand-gold" />
            <div className="mb-1 text-sm font-semibold text-white">{style.label}</div>
            <div className="text-xs leading-relaxed text-gray-500">{style.desc}</div>
          </motion.button>
        ))}
      </div>

      {selectedStyle && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 rounded-sm border border-brand-gold/20 bg-brand-gold/10 px-4 py-3">
          <selectedStyle.icon size={20} className="text-brand-gold" />
          <div>
            <p className="text-sm font-medium text-white">{selectedStyle.label} selected</p>
            <p className="text-xs text-gray-400">{selectedStyle.desc}</p>
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={() => router.back()} className="rounded-sm border-white/15 text-white hover:bg-white/5">
          <ArrowLeft size={16} /> Back
        </Button>
        <Button variant="brand" size="lg" className="flex-1 rounded-sm uppercase tracking-wide" disabled={!selected} onClick={() => router.push("/dashboard/asset-selection")}>
          Continue to assets <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
