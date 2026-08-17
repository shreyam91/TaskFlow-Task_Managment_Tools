import { DataTable } from "@/features/tasks/components/data-table"

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative min-h-[calc(100vh-4rem)]">
      {/* Decorative blurred blobs for premium look */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="flex items-center justify-between space-y-2 relative z-10 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">All Tasks</h2>
      </div>

      <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl rounded-3xl p-6">
        <DataTable />
      </div>
    </div>
  )
}
