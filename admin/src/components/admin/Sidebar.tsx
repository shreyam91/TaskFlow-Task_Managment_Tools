"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminStore } from "@/store/useAdminStore";
import { motion } from "motion/react";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  Network,
  Zap
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isSidebarOpen } = useAdminStore();

  if (!user) return null;

  const superAdminRoutes = [
    { name: "Dashboard", href: "/super/dashboard", icon: LayoutDashboard },
    { name: "Companies", href: "/super/companies", icon: Building2 },
    { name: "Subscriptions", href: "/super/subscriptions", icon: CreditCard },
    { name: "Analytics", href: "/super/analytics", icon: BarChart3 },
    { name: "Settings", href: "/super/settings", icon: Settings },
  ];

  const companyAdminRoutes = [
    { name: "Dashboard", href: "/company/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/company/employees", icon: Users },
    { name: "Departments", href: "/company/departments", icon: Network },
    { name: "Reports", href: "/company/reports", icon: BarChart3 },
    { name: "Settings", href: "/company/settings", icon: Settings },
  ];

  const routes = user.role === "SUPER_ADMIN" ? superAdminRoutes : companyAdminRoutes;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl transition-transform sm:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
        <div className="mb-8 flex items-center px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 mr-3 shadow-md shadow-indigo-500/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
            TaskFlow
          </span>
        </div>
        <ul className="space-y-1.5 font-medium">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname.startsWith(route.href);
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "group relative flex items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("relative z-10 h-5 w-5 mr-3 transition-transform group-hover:scale-110", isActive && "text-indigo-600 dark:text-indigo-400")} />
                  <span className="relative z-10">{route.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
