"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  CreditCard,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "AI Generations", href: "/admin/ai-generations", icon: Sparkles },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Payments", href: "/admin/payments", icon: Receipt },
  { label: "Assets", href: "/admin/assets", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 flex-col border-r border-white/10 bg-[#0a0a16]/95 shadow-2xl shadow-black/30 backdrop-blur-xl lg:flex">
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-red-500 to-orange-600">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Framework</p>
            <p className="text-xs font-medium text-red-400">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-red-500/20 bg-red-500/15 text-red-300"
                    : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  size={17}
                  className={cn("shrink-0", isActive ? "text-red-400" : "text-gray-500 group-hover:text-white")}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="text-red-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-500 transition-all hover:bg-white/5 hover:text-white"
          >
            <LayoutDashboard size={16} />
            User Dashboard
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-500 transition-all hover:bg-red-500/5 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a16]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[10px] transition-all",
                  isActive ? "text-red-300" : "text-gray-500"
                )}
              >
                <item.icon size={18} />
                <span>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
