import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-atmosphere dashboard-stage min-h-screen text-white">
      <DashboardSidebar />

      <div className="relative flex min-h-screen min-w-0 flex-col lg:ml-64">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
