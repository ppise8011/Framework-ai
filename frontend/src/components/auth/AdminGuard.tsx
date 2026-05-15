"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isInitialized, router, user]);

  if (!isInitialized) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-night">
        <div className="flex flex-col items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-md border border-red-500/20 bg-red-500/10">
            <Shield size={20} className="text-red-400" />
          </div>
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
