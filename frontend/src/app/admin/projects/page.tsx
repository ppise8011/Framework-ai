"use client";

import { motion } from "framer-motion";
import { FolderOpen, Search } from "lucide-react";

const projects = [
  { name: "Living Room Redesign", user: "John Doe", room: "Living Room", style: "Luxury Modern", status: "completed", generations: 4 },
  { name: "Master Bedroom", user: "Sara Khan", room: "Bedroom", style: "Scandinavian", status: "draft", generations: 1 },
  { name: "Office Space", user: "Raj Sharma", room: "Office", style: "Modern", status: "processing", generations: 7 },
  { name: "Kitchen Remodel", user: "Aisha Malik", room: "Kitchen", style: "Minimal", status: "completed", generations: 3 },
];

export default function AdminProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Project Management</h1>
          <p className="text-sm text-gray-400">Review user projects, statuses, and generation volume.</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input className="field-surface rounded-md py-2.5 pl-10 pr-4 text-sm" placeholder="Search projects..." />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="interactive-lift rounded-md border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-300">
              <FolderOpen size={18} />
            </div>
            <h2 className="text-sm font-semibold text-white">{project.name}</h2>
            <p className="mt-1 text-xs text-gray-500">{project.user}</p>
            <div className="mt-4 space-y-2 text-xs text-gray-400">
              <p>{project.room} / {project.style}</p>
              <p>{project.generations} generations</p>
            </div>
            <span className="mt-4 inline-flex rounded-full border border-white/10 px-2.5 py-1 text-xs capitalize text-gray-300">
              {project.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
