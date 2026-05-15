"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";

const stats = [
  { value: "50K+", label: "Designs generated" },
  { value: "10K+", label: "Active creators" },
  { value: "60s", label: "First concept" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-brand-ink sm:min-h-[780px]">
      <div className="absolute inset-0 home-hero-image" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-night/25 via-brand-night/45 to-brand-night" />
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="landing-container relative z-10 flex min-h-[720px] flex-col justify-center pb-20 pt-28 sm:min-h-[780px] sm:pb-24 sm:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-black/35 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md"
          >
            <Sparkles size={15} className="text-brand-gold" />
            AI-powered interior design studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="page-title max-w-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Transform room photos into polished interior concepts.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg"
          >
            Upload one room image, choose a design direction, and generate practical layouts,
            render-ready concepts, and presentation options without a messy workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link href="/signup">
              <Button variant="brand" size="lg" className="w-full rounded-md uppercase tracking-wide sm:w-auto">
                Start Designing
                <ArrowRight size={18} />
              </Button>
            </Link>
            <button className="inline-flex items-center justify-center gap-3 rounded-md border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-white/10">
              <Play size={16} fill="currentColor" className="text-brand-gold" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-11 grid max-w-2xl grid-cols-1 overflow-hidden rounded-md border border-white/12 bg-white/[0.04] backdrop-blur-md sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-b border-white/10 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-5">
                <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid max-w-4xl gap-3 sm:grid-cols-3"
        >
          {["Room analysis", "Style direction", "Export-ready renders"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 p-4 text-sm text-gray-200 backdrop-blur-md">
              <CheckCircle2 size={18} className="shrink-0 text-brand-gold" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-brand-night/80 py-3 backdrop-blur-md">
        <div className="ticker-track flex w-[200%] gap-8 whitespace-nowrap text-[11px] font-semibold uppercase text-gray-300">
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
