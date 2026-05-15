"use client";

import { usePathname } from "next/navigation";
import { Bell, Shield } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/users": "User Management",
  "/admin/projects": "Project Management",
  "/admin/ai-generations": "AI Generations",
  "/admin/subscriptions": "Subscriptions",
  "/admin/payments": "Payments",
  "/admin/assets": "Asset Library",
  "/admin/settings": "Settings",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const title = pageTitles[pathname] || "Admin Panel";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-brand-night/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Shield size={16} className="shrink-0 text-red-400" />
        <h1 className="truncate text-sm font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-all hover:text-white" aria-label="Admin notifications">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 sm:px-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-red-500 to-orange-600 text-xs font-bold text-white">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <span className="hidden text-xs font-medium text-red-300 sm:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
