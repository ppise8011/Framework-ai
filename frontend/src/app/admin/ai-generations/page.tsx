"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CheckCircle, Clock, Search, XCircle } from "lucide-react";

const generations = [
  { id: "g1", user: "John Doe", project: "Living Room", type: "3D", style: "Luxury", status: "completed", credits: 1, date: "May 10, 2025", provider: "replicate" },
  { id: "g2", user: "Sara Khan", project: "Bedroom", type: "2D", style: "Scandinavian", status: "completed", credits: 1, date: "May 10, 2025", provider: "openai" },
  { id: "g3", user: "Raj Sharma", project: "Office Space", type: "3D", style: "Modern", status: "failed", credits: 0, date: "May 9, 2025", provider: "replicate" },
  { id: "g4", user: "Aisha Malik", project: "Kitchen Remodel", type: "3D", style: "Minimal", status: "completed", credits: 1, date: "May 9, 2025", provider: "replicate" },
  { id: "g5", user: "Priya Singh", project: "Hall Design", type: "2D", style: "Traditional", status: "processing", credits: 1, date: "May 9, 2025", provider: "replicate" },
  { id: "g6", user: "Arjun Dev", project: "Commercial Space", type: "Video", style: "Premium Hotel", status: "completed", credits: 3, date: "May 8, 2025", provider: "replicate" },
];

const statusIcon: Record<string, { icon: LucideIcon; color: string }> = {
  completed: { icon: CheckCircle, color: "text-green-400" },
  failed: { icon: XCircle, color: "text-red-400" },
  processing: { icon: Clock, color: "text-amber-400" },
};

const typeColor: Record<string, string> = {
  "2D": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "3D": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Video: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function AIGenerationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Completed", "Failed", "Processing"];

  const query = search.toLowerCase();
  const filtered = generations.filter((generation) => {
    const matchSearch = generation.user.toLowerCase().includes(query) || generation.project.toLowerCase().includes(query);
    const matchFilter = filter === "All" || generation.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const totalCredits = generations.reduce((sum, generation) => sum + generation.credits, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">AI Generations</h1>
          <p className="text-sm text-gray-400">Monitor all AI generation activity.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total", value: generations.length, color: "text-white" },
            { label: "Completed", value: generations.filter((item) => item.status === "completed").length, color: "text-green-400" },
            { label: "Failed", value: generations.filter((item) => item.status === "failed").length, color: "text-red-400" },
            { label: "Credits", value: totalCredits, color: "text-amber-400" },
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
              <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative w-full lg:max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by user or project..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field-surface rounded-md py-2.5 pl-10 pr-4 text-sm placeholder-gray-600"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-md border px-4 py-2 text-xs font-medium transition-all ${
                filter === item
                  ? "border-indigo-500/40 bg-indigo-600/20 text-indigo-300"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
        <div className="hidden grid-cols-12 gap-3 border-b border-white/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:grid">
          <div className="col-span-3">User / Project</div>
          <div className="col-span-2">Style</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Provider</div>
          <div className="col-span-1 text-center">Credits</div>
          <div className="col-span-1">Date</div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {filtered.map((generation, index) => {
            const StatusIcon = statusIcon[generation.status];
            return (
              <motion.div
                key={generation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                className="grid gap-3 px-5 py-4 transition-all hover:bg-white/[0.02] lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-3">
                  <p className="text-sm font-medium text-white">{generation.user}</p>
                  <p className="text-xs text-gray-500">{generation.project}</p>
                </div>
                <div className="text-xs text-gray-400 lg:col-span-2">{generation.style}</div>
                <div className="lg:col-span-1">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColor[generation.type]}`}>
                    {generation.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 lg:col-span-2">
                  <StatusIcon.icon size={13} className={StatusIcon.color} />
                  <span className={`text-xs capitalize ${StatusIcon.color}`}>{generation.status}</span>
                </div>
                <div className="text-xs text-gray-500 lg:col-span-2">{generation.provider}</div>
                <div className="text-sm font-bold text-amber-400 lg:col-span-1 lg:text-center">{generation.credits}</div>
                <div className="text-xs text-gray-600 lg:col-span-1">{generation.date.split(",")[0]}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
