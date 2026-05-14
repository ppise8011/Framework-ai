"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  Cpu,
  Film,
  Home,
  Layers,
  Map,
  Palette,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { ProjectStepper } from "@/components/generator/ProjectStepper";
import { Button } from "@/components/ui/Button";

const outputTypes = [
  {
    id: "2d",
    label: "2D Layout",
    desc: "Plan view with furniture placement",
    credits: 1,
    icon: Map,
  },
  {
    id: "3d",
    label: "3D Render",
    desc: "Photorealistic interior composition",
    credits: 1,
    icon: Home,
  },
  {
    id: "video",
    label: "Walkthrough",
    desc: "Animated camera movement",
    credits: 3,
    pro: true,
    icon: Film,
  },
];

const loadingSteps = [
  { icon: Cpu, label: "Reading room structure" },
  { icon: Palette, label: "Building material palette" },
  { icon: Layers, label: "Composing furniture layout" },
  { icon: Sparkles, label: "Rendering final output" },
];

export default function AIGenerationPage() {
  const router = useRouter();
  const [type, setType] = useState("3d");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const selectedOutput = useMemo(
    () => outputTypes.find((item) => item.id === type) ?? outputTypes[1],
    [type]
  );

  useEffect(() => {
    if (!loading) return;
    if (step < loadingSteps.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 1500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [loading, step]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => router.push("/dashboard/results"), 800);
    return () => clearTimeout(t);
  }, [done, router]);

  const handleGenerate = () => {
    setStep(0);
    setDone(false);
    setLoading(true);
  };

  if (loading || done) {
    return (
      <div className="mx-auto grid min-h-[70vh] max-w-5xl place-items-center">
        <div className="w-full overflow-hidden rounded-sm border border-white/10 bg-brand-panel shadow-2xl shadow-black/30">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[430px] project-panel-one">
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 blueprint-grid opacity-20" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-brand-gold text-brand-ink">
                  {done ? <Check size={30} /> : <Sparkles size={30} className="animate-spin" />}
                </div>
                <h2 className="text-4xl font-bold text-white">
                  {done ? "Design ready" : "Rendering your room"}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-200">
                  {done
                    ? "Your generated concept is ready. Opening results..."
                    : "Framework is analyzing the room, applying the brief, and preparing the final composition."}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="gold-eyebrow mb-6">Generation queue</p>
              <div className="space-y-3">
                {loadingSteps.map((s, i) => {
                  const isDone = i < step || done;
                  const isActive = i === step && loading;
                  return (
                    <div
                      key={s.label}
                      className={`flex items-center gap-3 rounded-sm border px-4 py-4 transition-all duration-500 ${
                        isDone
                          ? "border-brand-gold/25 bg-brand-gold/10 text-brand-gold"
                          : isActive
                            ? "border-white/15 bg-white/[0.06] text-white"
                            : "border-white/5 bg-white/[0.02] text-gray-600"
                      }`}
                    >
                      <s.icon size={17} className={isActive ? "animate-pulse" : ""} />
                      <span className="text-sm font-medium">{s.label}</span>
                      {isDone && <Check size={14} className="ml-auto" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <ProjectStepper currentStep={5} />

      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="gold-eyebrow mb-3">Step 5 / Generate</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Generation studio</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
            Review the output type, prompt direction, and credit impact before sending this room to the renderer.
          </p>
        </div>
        <div className="rounded-sm border border-brand-gold/20 bg-brand-gold/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Credits</p>
          <p className="mt-1 text-sm text-gray-300">3 available, 1 used after this render</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="overflow-hidden rounded-sm border border-white/10 bg-brand-panel shadow-2xl shadow-black/25">
          <div className="relative h-[560px] project-panel-one">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />
            <div className="absolute left-5 top-5 rounded-sm border border-white/15 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-200 backdrop-blur">
              Live composition preview
            </div>
            <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-sm bg-brand-gold text-brand-ink shadow-lg shadow-black/30">
              <selectedOutput.icon size={23} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-brand-gold">{selectedOutput.label}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Luxury modern living room render</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  This preview will become the generated output once your backend AI service is connected.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-sm border border-white/10 bg-brand-panel/90 p-5 shadow-xl shadow-black/15">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">Output type</h2>
                <p className="mt-1 text-xs text-gray-500">Choose the deliverable format.</p>
              </div>
              <WandSparkles size={20} className="text-brand-gold" />
            </div>

            <div className="space-y-3">
              {outputTypes.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ x: t.pro ? 0 : 3 }}
                  onClick={() => !t.pro && setType(t.id)}
                  className={`relative flex w-full items-center gap-4 rounded-sm border p-4 text-left transition-all ${
                    t.pro
                      ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-55"
                      : type === t.id
                        ? "border-brand-gold/60 bg-brand-gold/10"
                        : "border-white/10 bg-white/[0.03] hover:border-brand-gold/30 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm ${
                    type === t.id && !t.pro ? "bg-brand-gold text-brand-ink" : "bg-white/5 text-brand-gold"
                  }`}>
                    <t.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{t.label}</p>
                      {t.pro && (
                        <span className="rounded-full border border-brand-gold/30 px-2 py-0.5 text-[10px] font-bold text-brand-gold">
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{t.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-brand-gold">{t.credits} cr</span>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="rounded-sm border border-white/10 bg-brand-panel/90 p-5 shadow-xl shadow-black/15">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Prompt direction</p>
            <p className="text-sm italic leading-relaxed text-gray-300">
              &quot;Generate a luxury modern living room interior. Preserve the original room structure and wall angles.
              Add a premium sofa, TV unit, indoor plants, warm ambient lighting, marble flooring, wood wall panels,
              and soft curtains. Style: ultra-realistic, premium, clean, and spacious.&quot;
            </p>
          </section>

          <section className="grid grid-cols-3 gap-3">
            {[
              ["Style", "Luxury"],
              ["Room", "Living"],
              ["Assets", "6 items"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-sm border border-white/10 bg-brand-panel/80 p-4">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </section>

          <Button
            variant="brand"
            size="lg"
            className="w-full rounded-sm uppercase tracking-wide"
            onClick={handleGenerate}
          >
            <Sparkles size={18} />
            Generate design now
          </Button>
        </aside>
      </div>
    </div>
  );
}
