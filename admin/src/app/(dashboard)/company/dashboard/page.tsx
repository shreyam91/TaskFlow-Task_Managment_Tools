"use client";

import { RoleGuard } from "@/components/admin/RoleGuard";

export default function CompanyAdminDashboard() {
  return (
    <RoleGuard allowedRoles={["COMPANY_ADMIN"]}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
        <p className="text-muted-foreground">Overview of your company metrics.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Employees</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">+1,203</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </div>
          </div>
          {/* Add more metric cards here */}
        </div>
      </div>
    </RoleGuard>
  );
}
