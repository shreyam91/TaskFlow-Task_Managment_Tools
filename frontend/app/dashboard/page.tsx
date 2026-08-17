"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  IconCheck, 
  IconAlertCircle, 
  IconClock, 
  IconGitPullRequest, 
  IconArrowRight,
  IconMessageCircle,
  IconFolder
} from "@tabler/icons-react";

import { DashboardCalendar } from "@/features/dashboard/components/DashboardCalendar";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ firstname: string } | null>(null);

  useEffect(() => {
    // Simulate loading the complex dashboard data
    const timer = setTimeout(() => {
      setLoading(false);
      setUser({ firstname: "Mohit" });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-8 animate-pulse bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="lg:col-span-1 h-96 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Good morning, {user?.firstname || 'Developer'} 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's what's happening across your projects.</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/dashboard/projects" className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 text-slate-50 dark:text-slate-800/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
            <IconFolder size={120} stroke={1.5} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Active Projects</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">3</h2>
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <IconFolder className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/tasks" className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 text-slate-50 dark:text-slate-800/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
            <IconCheck size={120} stroke={1.5} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">My Open Tasks</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">7</h2>
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <IconCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/tasks?filter=today" className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 text-slate-50 dark:text-slate-800/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
            <IconClock size={120} stroke={1.5} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Due Today</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">2</h2>
              <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <IconClock className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/tasks?filter=overdue" className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 text-slate-50 dark:text-slate-800/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
            <IconAlertCircle size={120} stroke={1.5} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Overdue</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">1</h2>
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <IconAlertCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Calendar & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Task Calendar</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm h-[420px] flex-1">
            <DashboardCalendar />
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Recent Activity</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm h-[420px] overflow-y-auto">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              
              <div className="relative flex items-start gap-4">
                <div className="absolute left-0 md:left-1/2 md:-ml-5 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-emerald-500 z-10 shrink-0">
                  <IconCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="pl-14 md:pl-0 md:w-1/2 md:pr-12 md:text-right">
                  <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Rahul</span> completed <span className="font-medium">"Payment API"</span></p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">E-Commerce Platform</p>
                  <p className="text-xs text-slate-500 mt-1">10 minutes ago</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4 flex-row-reverse md:flex-row">
                <div className="absolute left-0 md:left-1/2 md:-ml-5 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-purple-500 z-10 shrink-0">
                  <IconGitPullRequest className="w-5 h-5 text-purple-500" />
                </div>
                <div className="pl-14 md:pl-0 md:w-1/2 md:ml-auto md:pl-12">
                  <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-medium">PR #42</span> was merged</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">AI Research Platform</p>
                  <p className="text-xs text-slate-500 mt-1">32 minutes ago</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="absolute left-0 md:left-1/2 md:-ml-5 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-blue-500 z-10 shrink-0">
                  <IconAlertCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div className="pl-14 md:pl-0 md:w-1/2 md:pr-12 md:text-right">
                  <p className="text-sm text-slate-900 dark:text-slate-100">You were assigned <span className="font-medium">"Checkout UI"</span></p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">E-Commerce Platform</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4 flex-row-reverse md:flex-row">
                <div className="absolute left-0 md:left-1/2 md:-ml-5 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-amber-500 z-10 shrink-0">
                  <IconMessageCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="pl-14 md:pl-0 md:w-1/2 md:ml-auto md:pl-12">
                  <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Priya</span> commented on <span className="font-medium">"Authentication"</span></p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">AI Research Platform</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Needs Attention */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center text-slate-900 dark:text-slate-100">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Needs Attention
          </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                
                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                    High
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Fix checkout API</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">E-Commerce Platform</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-500 font-medium">Due today</span>
                      <span>•</span>
                      <span>Assigned to you</span>
                    </div>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                    Review
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Authentication PR #42</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">AI Research Platform</span>
                      <span>•</span>
                      <span>Waiting for your review</span>
                    </div>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                    Overdue
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Database migration</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">E-Commerce Platform</span>
                      <span>•</span>
                      <span className="text-red-600 dark:text-red-500 font-medium">Overdue by 2 days</span>
                    </div>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

              </div>
            </div>
          </section>

      </div>
    </div>
  );
}
