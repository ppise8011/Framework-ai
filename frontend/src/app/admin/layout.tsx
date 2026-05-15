import { AdminGuard } from "@/components/auth/AdminGuard";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="dashboard-atmosphere dashboard-stage min-h-screen overflow-x-hidden text-white">
        <AdminSidebar />
        <div className="relative z-10 flex min-h-screen min-w-0 flex-col lg:ml-60">
          <AdminTopbar />
          <main className="flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-10">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
