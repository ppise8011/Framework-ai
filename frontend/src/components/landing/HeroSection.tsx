"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, Ruler, Sparkles } from "lucide-react";

const stats = [
  { value: "50K+", label: "Designs generated" },
  { value: "10K+", label: "Active creators" },
  { value: "60s", label: "First concept" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-ink">
      <div className="absolute inset-0 home-hero-image" />
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="motion-scan" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md"
          >
            <Sparkles size={15} className="text-brand-gold" />
            AI-powered interior design studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Transform any room into a finished design direction.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl"
          >
            Upload a room photo, choose the mood, and generate practical layouts,
            polished renders, and client-ready design options in one focused workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/signup">
              <Button variant="brand" size="lg" className="w-full rounded-sm uppercase tracking-wide sm:w-auto">
                Start Designing
                <ArrowRight size={18} />
              </Button>
            </Link>
            <button className="inline-flex items-center justify-center gap-3 border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-white/10">
              <Play size={16} fill="currentColor" className="text-brand-gold" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 grid max-w-2xl grid-cols-3 border-y border-white/15"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-r border-white/15 py-5 pr-4 last:border-r-0">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative ml-auto max-w-md border border-white/15 bg-black/30 p-4 backdrop-blur-md">
            <div className="project-panel-one h-[460px]" />
            <div className="absolute -left-10 top-12 border border-white/15 bg-brand-ink/90 p-4 shadow-xl shadow-black/30 backdrop-blur-md">
              <div className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center bg-brand-gold text-brand-ink">
                  <Ruler size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Layout scan</div>
                  <div className="text-xs text-gray-400">Lighting, scale, furniture</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 bottom-12 border border-brand-gold/35 bg-brand-ink/90 px-5 py-4 text-white shadow-xl shadow-black/30 backdrop-blur-md">
              <div className="text-2xl font-bold text-brand-gold">4 render styles</div>
              <div className="text-xs uppercase tracking-wider text-gray-300">ready to review</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-brand-graphite/45 py-3 backdrop-blur-md">
        <div className="ticker-track flex w-[200%] gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em] text-gray-200">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex min-w-[50%] gap-8">
              {["Residential", "Interior", "Landscape", "Urban", "Renders", "Walkthrough"].map((item) => (
                <span key={`${group}-${item}`} className="flex items-center gap-8">
                  {item}
                  <span className="text-brand-gold">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
