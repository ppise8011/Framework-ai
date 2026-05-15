"use client";

import { motion } from "framer-motion";
import { ImageIcon, Package, Sofa, Table2 } from "lucide-react";

const assets = [
  { name: "Seating", count: 42, icon: Sofa },
  { name: "Tables", count: 31, icon: Table2 },
  { name: "Decor", count: 58, icon: ImageIcon },
  { name: "Storage", count: 24, icon: Package },
];

export default function AdminAssetsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="mb-1 text-2xl font-bold text-white">Asset Library</h1>
        <p className="text-sm text-gray-400">Manage furniture, decor, and prompt asset categories.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="interactive-lift rounded-md border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-purple-500/10 text-purple-300">
              <asset.icon size={20} />
            </div>
            <h2 className="font-semibold text-white">{asset.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{asset.count} active assets</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
