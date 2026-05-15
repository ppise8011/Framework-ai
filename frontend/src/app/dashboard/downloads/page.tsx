"use client";

import { motion } from "framer-motion";
import { Calendar, Download, FileImage, FileText, Film, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

const downloads = [
  { id: "1", name: "Living Room 3D Render", type: "image", format: "PNG", size: "4.2 MB", date: "May 10, 2025" },
  { id: "2", name: "Bedroom 2D Layout", type: "image", format: "JPG", size: "1.8 MB", date: "May 8, 2025" },
  { id: "3", name: "Home Office Design", type: "pdf", format: "PDF", size: "2.1 MB", date: "May 6, 2025" },
];

const iconMap = {
  image: FileImage,
  video: Film,
  pdf: FileText,
};

const stats = [
  { label: "Total Downloads", value: "3", icon: Download },
  { label: "Images", value: "2", icon: FileImage },
  { label: "PDFs", value: "1", icon: FileText },
];

export default function DownloadsPage() {
  return (
    <div className="dashboard-content max-w-4xl space-y-7">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">Exports</p>
        <h1 className="text-3xl font-bold text-white">Downloads</h1>
        <p className="mt-2 text-sm text-gray-400">All your downloaded designs in one place.</p>
      </motion.div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-md border border-white/10 bg-brand-panel/80 p-5"
          >
            <stat.icon size={18} className="mb-3 text-brand-gold" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {downloads.length > 0 ? (
        <div className="space-y-3">
          {downloads.map((file, index) => {
            const Icon = iconMap[file.type as keyof typeof iconMap] || FileImage;

            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              className="interactive-lift group flex flex-col gap-4 rounded-md border border-white/10 bg-brand-panel/80 px-5 py-4 hover:border-brand-gold/25 hover:bg-brand-panel2 sm:flex-row sm:items-center"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-brand-gold/25 bg-brand-gold/10">
                  <Icon size={18} className="text-brand-gold" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{file.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span>{file.format}</span>
                    <span>/</span>
                    <span>{file.size}</span>
                    <span>/</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {file.date}
                    </span>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="w-full gap-1.5 opacity-100 transition-opacity sm:w-auto sm:opacity-0 sm:group-hover:opacity-100">
                  <Download size={13} />
                  Download
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-white/10 bg-brand-panel/60 p-14 text-center">
          <FolderOpen size={34} className="mx-auto mb-4 text-gray-600" />
          <h3 className="mb-2 font-medium text-white">No downloads yet</h3>
          <p className="mb-6 text-sm text-gray-500">Generate and download your first AI design.</p>
          <Button size="sm">Create a Design</Button>
        </div>
      )}
    </div>
  );
}
