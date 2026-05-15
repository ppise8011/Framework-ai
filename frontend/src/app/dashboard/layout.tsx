import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="dashboard-atmosphere dashboard-stage min-h-screen overflow-x-hidden text-white">
        <DashboardSidebar />

        <div className="dashboard-main-shell z-10 flex min-h-screen flex-col">
          <DashboardTopbar />
          <main className="flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-10">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
