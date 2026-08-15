"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdminStore } from "@/store/useAdminStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useAdminStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div
        className={cn(
          "relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all",
          isSidebarOpen ? "sm:ml-64" : "sm:ml-0"
        )}
      >
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
