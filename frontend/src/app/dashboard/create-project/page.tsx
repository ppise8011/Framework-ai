"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ImagePlus, Ruler, SlidersHorizontal, Sofa, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { projectService } from "@/services/project.service";
import { useGeneratorStore } from "@/store/generator.store";
import toast from "react-hot-toast";

const stepsPreview = [
  { step: "01", title: "Upload room photo", desc: "Start with a clear image.", icon: ImagePlus },
  { step: "02", title: "Add room details", desc: "Room type, size, floor, ceiling.", icon: Ruler },
  { step: "03", title: "Choose a style", desc: "Set the visual direction.", icon: SlidersHorizontal },
  { step: "04", title: "Select assets", desc: "Furniture, lighting, decor.", icon: Sofa },
  { step: "05", title: "Generate output", desc: "Create 2D or 3D results.", icon: WandSparkles },
];

export default function CreateProjectPage() {
  const router = useRouter();
  const store = useGeneratorStore();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);

    try {
      store.reset();
      const project = await projectService.create({
        name: name.trim() || "My Design Project",
      });

      store.setProjectId(project.id);
      router.push("/dashboard/upload-room");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create project";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="surface-card rounded-md p-6 sm:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">
              New project
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Create a design direction from a room photo.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Framework guides you through the minimum brief needed for a stronger AI result:
              room context, dimensions, style, and key assets.
            </p>

            <label className="mt-8 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Project name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Living room redesign"
              className="field-surface mt-3 rounded-sm px-4 py-3 text-sm placeholder:text-gray-600"
            />

            <div className="mt-8 rounded-sm border border-brand-gold/20 bg-brand-gold/10 p-4">
              <p className="text-sm font-semibold text-brand-gold">Credit usage</p>
              <p className="mt-1 text-xs text-gray-400">
                One credit is used per 2D or 3D generation. You currently have 3 free credits.
              </p>
            </div>

            <Button
              variant="brand"
              size="lg"
              className="mt-8 w-full rounded-sm uppercase tracking-wide"
              onClick={handleStart}
              loading={loading}
            >
              Start with upload
              <ArrowRight size={18} />
            </Button>
          </section>

          <section className="space-y-3">
            {stepsPreview.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="interactive-lift flex items-center gap-4 rounded-md border border-white/10 bg-brand-panel/70 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{item.desc}</div>
                </div>
                <div className="font-mono text-xs text-gray-600">{item.step}</div>
              </motion.div>
            ))}
          </section>
        </div>
      </motion.div>
    </div>
  );
}
