"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  IconCheck, 
  IconAlertCircle, 
  IconFolder,
  IconUsers,
  IconArrowRight,
  IconPlus,
  IconGitPullRequest,
  IconUserPlus
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function OwnerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ firstname: string } | null>(null);

  useEffect(() => {
    // Simulate loading
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Good morning, {user?.firstname || 'Owner'} 👋</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's the current state of your projects.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
          <IconPlus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Projects</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">3</h2>
            <IconFolder className="w-5 h-5 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Open Tasks</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">24</h2>
            <IconCheck className="w-5 h-5 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pending Requests</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">5</h2>
            <IconUserPlus className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Projects Needing Attention</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">2</h2>
            <IconAlertCircle className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* My Projects */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">My Projects</h2>
            <div className="space-y-4">
              
              {/* E-Commerce Platform */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">E-Commerce Platform</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <IconUsers className="w-4 h-4 text-slate-400" />
                        5 team members
                      </div>
                      <span>•</span>
                      <span>24 total tasks</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <Link href="/dashboard/workspace/ecommerce">
                      Open Workspace <IconArrowRight className="w-4 h-4 ml-2 text-slate-400" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Completed</p>
                    <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">18</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Overdue</p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">2</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2 font-medium">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-slate-700 dark:text-slate-300">75%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* AI Research Platform */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">AI Research Platform</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <IconUsers className="w-4 h-4 text-slate-400" />
                        3 team members
                      </div>
                      <span>•</span>
                      <span>20 total tasks</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <Link href="/dashboard/workspace/ai-research">
                      Open Workspace <IconArrowRight className="w-4 h-4 ml-2 text-slate-400" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Completed</p>
                    <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Overdue</p>
                    <p className="text-xl font-semibold text-amber-600 dark:text-amber-500">1</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2 font-medium">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-slate-700 dark:text-slate-300">60%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Projects Needing Attention */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center text-slate-900 dark:text-slate-100">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Projects Needing Attention
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                
                <Link href="/dashboard/workspace/ecommerce" className="block p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-red-500"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">E-Commerce Platform</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">2 overdue tasks</p>
                      </div>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </div>
                </Link>

                <Link href="/dashboard/workspace/ai-research" className="block p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-amber-500"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">AI Research Platform</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">PR #42 awaiting review</p>
                      </div>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </div>
                </Link>

                <Link href="/dashboard/workspace/portfolio" className="block p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-red-500"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Portfolio Website</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Deadline approaching (Tomorrow)</p>
                      </div>
                    </div>
                    <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </div>
                </Link>

              </div>
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Project Requests */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Project Requests</h2>
              <Link href="/dashboard/owner/requests" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</Link>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium shrink-0">
                    RS
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Rahul Sharma</h4>
                    <p className="text-xs text-slate-500">Frontend Developer</p>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Requesting to join:</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">E-Commerce Platform</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded border border-slate-200 dark:border-slate-700">React</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded border border-slate-200 dark:border-slate-700">Next.js</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded border border-slate-200 dark:border-slate-700">TypeScript</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8">Accept</Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-8">Review</Button>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium shrink-0">
                    PS
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Priya Singh</h4>
                    <p className="text-xs text-slate-500">Backend Developer</p>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Requesting to join:</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">AI Research Platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8">Accept</Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-8">Review</Button>
                </div>
              </div>

            </div>
          </section>

          {/* Recent Project Activity */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Team Activity</h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-emerald-500 z-10 shrink-0">
                    <IconCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="pl-14">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Rahul</span> completed <span className="font-medium">"Payment API"</span></p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">E-Commerce Platform</p>
                    <p className="text-xs text-slate-500 mt-1">10 minutes ago</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-purple-500 z-10 shrink-0">
                    <IconGitPullRequest className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="pl-14">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Priya</span> opened <span className="font-medium">PR #42</span></p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">AI Research Platform</p>
                    <p className="text-xs text-slate-500 mt-1">32 minutes ago</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-blue-500 z-10 shrink-0">
                    <IconUserPlus className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="pl-14">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Aman</span> joined the team</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">E-Commerce Platform</p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
