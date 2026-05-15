"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Heart, RotateCcw, Save, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useGeneratorStore } from "@/store/generator.store";
import toast from "react-hot-toast";

export default function ResultsPage() {
  const store = useGeneratorStore();
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<"result" | "original">("result");

  const details = [
    { label: "Style", value: store.style || "Modern" },
    { label: "Room", value: store.roomType || "Living" },
    { label: "Output", value: store.outputType ? store.outputType.toUpperCase() : "3D" },
    { label: "Credits", value: store.outputType === "video" ? "3 used" : "1 used" },
  ];

  const handleDownload = () => {
    if (!store.resultUrl) {
      toast.error("No generated image available yet");
      return;
    }

    const link = document.createElement("a");
    link.href = store.resultUrl;
    link.download = "framework-design.jpg";
    link.target = "_blank";
    link.click();
    toast.success("Download started");
  };

  const handleShare = async () => {
    const shareUrl = store.resultUrl || window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "My AI Interior Design - Framework",
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied");
  };

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
            <span className="text-sm font-semibold text-brand-gold">
              {store.resultUrl ? "Design generated successfully" : "Results preview"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">Your AI interior design</h1>
        </div>
        <Link href="/dashboard/create-project">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm border-white/15 text-white hover:bg-white/5"
            onClick={() => store.reset()}
          >
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
          {(["result", "original"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 text-xs font-semibold capitalize transition-all ${
                tab === item ? "bg-brand-gold text-brand-ink" : "text-gray-300 hover:text-white"
              }`}
            >
              {item === "result" ? "AI Result" : "Original"}
            </button>
          ))}
        </div>

        <div className="min-h-[320px] sm:min-h-[460px]">
          {tab === "result" && store.resultUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={store.resultUrl}
              alt="AI generated interior design"
              className="h-[320px] w-full object-cover sm:h-[460px]"
            />
          ) : tab === "original" && store.uploadedImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={store.uploadedImage}
              alt="Original room reference"
              className="h-[320px] w-full object-cover sm:h-[460px]"
            />
          ) : (
            <div className={`h-[320px] sm:h-[460px] ${tab === "result" ? "project-panel-one" : "project-panel-two"}`}>
              <div className="flex h-full items-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6">
                <div>
                  <Sparkles size={34} className="mb-4 text-brand-gold" />
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">
                    {tab === "result" ? "Generated render" : "Original reference"}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-gray-300">
                    {tab === "result"
                      ? "Run a generation to show the real output image here."
                      : "Upload a room image to compare the original reference."}
                  </p>
                </div>
              </div>
            </div>
          )}
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
        {details.map((detail) => (
          <div key={detail.label} className="rounded-sm border border-white/10 bg-brand-panel/90 p-4 text-center">
            <div className="mb-1 text-xs text-gray-500">{detail.label}</div>
            <div className="text-sm font-semibold capitalize text-white">{detail.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Button
          variant="brand"
          size="lg"
          className="rounded-sm uppercase tracking-wide"
          onClick={handleDownload}
          disabled={!store.resultUrl}
        >
          <Download size={16} />
          Download HD
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="rounded-sm"
          onClick={() => {
            setSaved(true);
            toast.success("Project saved");
          }}
        >
          <Save size={16} />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button variant="secondary" size="lg" className="rounded-sm" onClick={handleShare}>
          <Share2 size={16} />
          Share
        </Button>
        {store.resultUrl ? (
          <a href={store.resultUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="w-full rounded-sm border-white/15 text-white hover:bg-white/5">
              <ExternalLink size={16} />
              View
            </Button>
          </a>
        ) : (
          <Button variant="outline" size="lg" className="rounded-sm border-white/15 text-white hover:bg-white/5" disabled>
            <ExternalLink size={16} />
            View
          </Button>
        )}
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
