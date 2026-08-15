"use client";

import { useQuery } from "@tanstack/react-query";
import { RoleGuard } from "@/components/admin/RoleGuard";
import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Company = {
  id: string;
  name: string;
  plan: string;
  status: "Active" | "Inactive";
};

const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

// Mock API call
const fetchCompanies = async (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "Acme Corp", plan: "Enterprise", status: "Active" },
        { id: "2", name: "Globex", plan: "Pro", status: "Inactive" },
        { id: "3", name: "Soylent Corp", plan: "Starter", status: "Active" },
      ]);
    }, 1000);
  });
};

export default function CompaniesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">Manage platform tenants.</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add Company
          </button>
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
          </div>
        ) : error ? (
          <div className="text-red-500">Failed to load companies.</div>
        ) : (
          <DataTable columns={columns} data={data || []} />
        )}
      </div>
    </RoleGuard>
  );
}
