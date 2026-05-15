"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProjectCard, type Project } from "@/components/projects/ProjectCard";

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Living Room Redesign",
    roomType: "Living Room",
    style: "Luxury Modern",
    status: "completed",
    date: "May 10, 2025",
    type: "3D Render",
  },
  {
    id: "2",
    name: "Master Bedroom",
    roomType: "Bedroom",
    style: "Scandinavian",
    status: "completed",
    date: "May 8, 2025",
    type: "2D Layout",
  },
  {
    id: "3",
    name: "Home Office Setup",
    roomType: "Office",
    style: "Minimal",
    status: "pending",
    date: "May 6, 2025",
    type: "3D Render",
  },
];

const filters = ["All", "Completed", "Pending", "2D Layout", "3D Render", "Video"];

export default function MyProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      sampleProjects.filter((project) => {
        const matchSearch = project.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
          filter === "All" ||
          (filter === "Completed" && project.status === "completed") ||
          (filter === "Pending" && project.status === "pending") ||
          project.type === filter;

        return matchSearch && matchFilter;
      }),
    [filter, search]
  );

  return (
    <div className="dashboard-content space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">Projects</p>
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="mt-2 text-sm text-gray-400">{sampleProjects.length} total projects</p>
        </div>
        <Link href="/dashboard/create-project">
          <Button className="w-full gap-2 rounded-md uppercase tracking-wide sm:w-auto">
            <Plus size={16} />
            New Design
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-md border border-white/10 bg-brand-panel/80 p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-brand-gold/60"
            />
          </div>

          <div className="flex shrink-0 gap-2">
            <div className="flex rounded-md border border-white/10 bg-white/5 p-1">
              {[
                { id: "grid", icon: Grid },
                { id: "list", icon: List },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setViewMode(item.id as "grid" | "list")}
                  className={`rounded-md p-2 transition-all ${
                    viewMode === item.id ? "bg-brand-gold text-brand-ink" : "text-gray-500 hover:text-white"
                  }`}
                  aria-label={`Switch to ${item.id} view`}
                >
                  <item.icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-500">
            <Filter size={13} />
            Filter
          </span>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                filter === item
                  ? "border-brand-gold/40 bg-brand-gold/15 text-brand-gold"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>

      {filtered.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-3"}>
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <ProjectCard project={project} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-white/10 bg-brand-panel/60 p-14 text-center">
          <Search size={34} className="mx-auto mb-4 text-gray-600" />
          <h3 className="mb-2 font-medium text-white">No projects found</h3>
          <p className="text-sm text-gray-500">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
