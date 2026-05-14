"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Heart, RotateCcw, Save, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const details = [
  { label: "Style", value: "Luxury Modern" },
  { label: "Room", value: "Living Room" },
  { label: "Output", value: "3D Render" },
  { label: "Credits", value: "1 used" },
];

export default function ResultsPage() {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<"result" | "original">("result");

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand-gold" />
            <span className="text-sm font-semibold text-brand-gold">Design generated successfully</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Your AI interior design</h1>
        </div>
        <Link href="/dashboard/create-project">
          <Button variant="outline" size="sm" className="rounded-sm border-white/15 text-white hover:bg-white/5">
            <RotateCcw size={14} />
            New Design
          </Button>
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-6 overflow-hidden rounded-sm border border-white/10 bg-brand-panel"
      >
        <div className="absolute left-4 top-4 z-10 flex overflow-hidden rounded-sm border border-white/10 bg-black/65">
          {(["result", "original"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-semibold capitalize transition-all ${
                tab === t ? "bg-brand-gold text-brand-ink" : "text-gray-300 hover:text-white"
              }`}
            >
              {t === "result" ? "AI Result" : "Original"}
            </button>
          ))}
        </div>

        <div className={`h-[460px] ${tab === "result" ? "project-panel-one" : "project-panel-two"}`}>
          <div className="flex h-full items-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">
                {tab === "result" ? "Generated render" : "Original reference"}
              </p>
              <p className="mt-2 max-w-lg text-sm text-gray-300">
                This preview area will show the real generated image after API integration.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-black/65 text-white transition-all hover:bg-black"
          aria-label="Like design"
        >
          <Heart size={17} className={liked ? "fill-red-400 text-red-400" : "text-white"} />
        </button>
      </motion.section>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {details.map((d) => (
          <div key={d.label} className="rounded-sm border border-white/10 bg-brand-panel/90 p-4 text-center">
            <div className="mb-1 text-xs text-gray-500">{d.label}</div>
            <div className="text-sm font-semibold text-white">{d.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="brand" size="lg" className="col-span-2 rounded-sm uppercase tracking-wide sm:col-span-1">
          <Download size={16} />
          Download HD
        </Button>
        <Button variant="secondary" size="lg" className="rounded-sm" onClick={() => setSaved(true)}>
          <Save size={16} />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button variant="secondary" size="lg" className="rounded-sm">
          <Share2 size={16} />
          Share
        </Button>
        <Button variant="outline" size="lg" className="rounded-sm border-white/15 text-white hover:bg-white/5">
          <ExternalLink size={16} />
          View
        </Button>
      </section>

      <section className="mt-8 flex flex-col justify-between gap-4 rounded-sm border border-brand-gold/20 bg-brand-gold/10 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-white">Want a walkthrough video?</p>
          <p className="mt-1 text-xs text-gray-400">
            Upgrade to Pro to generate cinematic walkthroughs for client presentations.
          </p>
        </div>
        <Link href="/dashboard/subscription">
          <Button variant="outline" size="sm" className="rounded-sm border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10">
            Upgrade to Pro
          </Button>
        </Link>
      </section>
    </div>
  );
}
