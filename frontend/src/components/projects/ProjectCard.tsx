"use client";

import Link from "next/link";
import { Download, Eye, MoreHorizontal, Trash2 } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  roomType: string;
  style: string;
  status: "completed" | "pending";
  date: string;
  type: string;
}

const statusStyles = {
  completed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  pending: "border-amber-500/25 bg-amber-500/10 text-amber-300",
};

function ProjectThumb({ project }: { project: Project }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-gold/18 via-brand-graphite/20 to-brand-panel2">
      <div className="flex h-16 w-16 items-center justify-center rounded-md border border-brand-gold/25 bg-black/30 text-xl font-bold text-brand-gold">
        {project.name.slice(0, 2).toUpperCase()}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  viewMode,
}: {
  project: Project;
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <div className="interactive-lift flex flex-col gap-4 rounded-md border border-white/10 bg-brand-panel/80 px-5 py-4 hover:border-brand-gold/25 hover:bg-brand-panel2 sm:flex-row sm:items-center">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-white/10">
          <ProjectThumb project={project} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{project.name}</p>
          <p className="mt-1 text-xs text-gray-500">
            {project.roomType} / {project.style}
          </p>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
          <span className="text-xs text-gray-600">{project.date}</span>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <Link href={`/dashboard/my-projects/${project.id}`} aria-label={`View ${project.name}`}>
            <button className="rounded-md p-2 text-gray-500 transition-all hover:bg-white/5 hover:text-white">
              <Eye size={15} />
            </button>
          </Link>
          <button className="rounded-md p-2 text-gray-500 transition-all hover:bg-white/5 hover:text-white" aria-label="Download project">
            <Download size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interactive-lift group overflow-hidden rounded-md border border-white/10 bg-brand-panel/80 hover:border-brand-gold/30 hover:bg-brand-panel2">
      <div className="relative h-44">
        <ProjectThumb project={project} />

        <div className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
          {project.status}
        </div>

        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs text-gray-300">
          {project.type}
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={`/dashboard/my-projects/${project.id}`} aria-label={`View ${project.name}`}>
            <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20">
              <Eye size={16} />
            </button>
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20" aria-label="Download project">
            <Download size={16} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-red-500/20 bg-red-500/20 text-red-300 transition-all hover:bg-red-500/30" aria-label="Delete project">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 truncate text-sm font-semibold text-white">{project.name}</h3>
        <p className="mb-3 text-xs text-gray-500">
          {project.roomType} / {project.style}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{project.date}</span>
          <button className="rounded-md p-1 text-gray-500 transition-all hover:bg-white/5 hover:text-white" aria-label="Project actions">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
