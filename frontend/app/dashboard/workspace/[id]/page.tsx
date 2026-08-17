"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { 
  IconFolder, 
  IconCheck, 
  IconClock, 
  IconAlertCircle, 
  IconGitPullRequest, 
  IconBrandGithub, 
  IconDotsVertical, 
  IconUsers,
  IconArrowRight,
  IconMessageCircle,
  IconGitCommit,
  IconGitBranch,
  IconCircleDot
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkspaceDashboard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const workspaceId = resolvedParams.id;

  useEffect(() => {
    // Simulate loading workspace data
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-8 animate-pulse bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
        <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="lg:col-span-1 h-96 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Determine mock workspace name for display
  const getWorkspaceName = (id: string) => {
    if (id === "ecommerce") return "E-Commerce Platform";
    if (id === "ai-research") return "AI Research Platform";
    return "Portfolio Website";
  };
  
  const workspaceName = getWorkspaceName(workspaceId);

  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] text-slate-900 dark:text-slate-100 font-sans max-w-[1600px] mx-auto w-full">
      
      {/* -------------------------------------------------- */}
      {/* TOP PROJECT HEADER                                 */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{workspaceName}</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl mb-4">
            Modern e-commerce platform for online retail focusing on performance and scalability.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-medium">Owner:</span> Mohit
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Team:</span> 5 members
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Deadline:</span> September 30, 2026
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            Invite Member
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            Project Settings
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <IconDotsVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Edit project</DropdownMenuItem>
              <DropdownMenuItem>Archive project</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Leave workspace</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* PROJECT OVERVIEW                                   */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Project Progress</h2>
          <div className="flex items-end justify-between mb-2">
            <span className="text-lg font-medium">18 of 24 tasks completed</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">75%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-3">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            3 In Progress <span className="mx-1.5 text-slate-300 dark:text-slate-700">•</span> 2 Todo <span className="mx-1.5 text-slate-300 dark:text-slate-700">•</span> 1 Blocked
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Timeline</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Deadline</p>
              <p className="font-medium text-lg">Sep 30, 2026</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-1">Time Remaining</p>
              <p className="font-bold text-lg text-amber-600 dark:text-amber-500">12 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* TASK SUMMARY                                       */}
      {/* -------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tasks (24 Total)</h2>
          <Link href={`/dashboard/workspace/${workspaceId}/tasks`} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            View All Tasks <IconArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        {/* Segmented Bar */}
        <div className="flex h-3 w-full rounded-full overflow-hidden mb-4">
          <div className="bg-emerald-500 hover:opacity-90 cursor-pointer" style={{ width: '54%' }} title="13 Completed"></div>
          <div className="bg-indigo-500 hover:opacity-90 cursor-pointer" style={{ width: '12%' }} title="3 In Progress"></div>
          <div className="bg-purple-500 hover:opacity-90 cursor-pointer" style={{ width: '8%' }} title="2 Review"></div>
          <div className="bg-slate-300 dark:bg-slate-600 hover:opacity-90 cursor-pointer" style={{ width: '21%' }} title="5 To Do"></div>
          <div className="bg-red-500 hover:opacity-90 cursor-pointer" style={{ width: '5%' }} title="1 Blocked"></div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Completed <span className="text-slate-500 ml-1">13</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> In Progress <span className="text-slate-500 ml-1">3</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500"></span> In Review <span className="text-slate-500 ml-1">2</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-600"></span> To Do <span className="text-slate-500 ml-1">5</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span> Blocked <span className="text-slate-500 ml-1">1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* -------------------------------------------------- */}
          {/* NEEDS ATTENTION                                    */}
          {/* -------------------------------------------------- */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center text-slate-900 dark:text-slate-100">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Needs Attention
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                
                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <IconAlertCircle className="w-3 h-3" /> Overdue
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Fix checkout validation</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Due 2 days ago</p>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <IconGitPullRequest className="w-3 h-3" /> Review
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Payment integration (PR #42)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Opened by Rahul</p>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

                <div className="p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group cursor-pointer">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <IconAlertCircle className="w-3 h-3" /> Blocked
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Payment webhook</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Blocked by API credentials</p>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                </div>

              </div>
            </div>
          </section>

          {/* -------------------------------------------------- */}
          {/* ACTIVE WORK                                        */}
          {/* -------------------------------------------------- */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Active Work</h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                
                <div className="p-4 sm:px-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">RH</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Fix checkout validation</p>
                      <p className="text-xs text-slate-500">Rahul • Started 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold tracking-wide uppercase">In Progress</span>
                  </div>
                </div>

                <div className="p-4 sm:px-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-pink-100 text-pink-700 text-xs">PR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Payment integration</p>
                      <p className="text-xs text-slate-500">Priya • Updated 3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-semibold tracking-wide uppercase">In Review</span>
                  </div>
                </div>

                <div className="p-4 sm:px-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">AM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Product search</p>
                      <p className="text-xs text-slate-500">Aman • Started yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold tracking-wide uppercase">In Progress</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* -------------------------------------------------- */}
          {/* GITHUB OVERVIEW                                    */}
          {/* -------------------------------------------------- */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center text-slate-900 dark:text-slate-100">
                <IconBrandGithub className="w-5 h-5 mr-2" /> GitHub
              </h2>
              <Link href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Open GitHub</Link>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Repository:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">mohit/ecommerce-platform</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-500 font-medium">
                  <IconCheck className="w-3.5 h-3.5" /> Connected
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-y border-slate-100 dark:border-slate-800 py-5">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24</h3>
                  <p className="text-xs text-slate-500 mt-1">Commits this week</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">6</h3>
                  <p className="text-xs text-slate-500 mt-1">Open PRs</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">2</h3>
                  <p className="text-xs text-slate-500 mt-1">Active Branches</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3</h3>
                  <p className="text-xs text-slate-500 mt-1">Open Issues</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Recent GitHub Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <IconGitPullRequest className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm"><span className="font-semibold text-slate-900 dark:text-slate-100">Rahul</span> opened PR <span className="font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">#42</span></p>
                      <p className="text-xs text-slate-500">"Implement payment gateway" · 10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconGitCommit className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm"><span className="font-semibold text-slate-900 dark:text-slate-100">Priya</span> pushed 3 commits</p>
                      <p className="text-xs text-slate-500">"Fix checkout validation" · 32 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* -------------------------------------------------- */}
          {/* TEAM OVERVIEW                                      */}
          {/* -------------------------------------------------- */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Team</h2>
              <Link href={`/dashboard/workspace/${workspaceId}/team`} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View Team</Link>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">MH</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Mohit</p>
                      <p className="text-xs text-slate-500">Owner</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs">RH</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Rahul</p>
                      <p className="text-xs text-slate-500">Developer</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">4 tasks</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs">PR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Priya</p>
                      <p className="text-xs text-slate-500">Developer</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">3 tasks</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs">AM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Aman</p>
                      <p className="text-xs text-slate-500">Developer</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">2 tasks</span>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- */}
          {/* RECENT ACTIVITY                                    */}
          {/* -------------------------------------------------- */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Recent Activity</h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 z-10 shrink-0"></div>
                  <div className="pl-6">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Rahul</span> merged PR <span className="font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">#42</span></p>
                    <p className="text-xs text-slate-500 mt-1">Payment gateway</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">10 min ago</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 z-10 shrink-0"></div>
                  <div className="pl-6">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Priya</span> completed task</p>
                    <p className="text-xs text-slate-500 mt-1">Checkout UI</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">25 min ago</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 z-10 shrink-0"></div>
                  <div className="pl-6">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Aman</span> pushed 3 commits</p>
                    <p className="text-xs text-slate-500 mt-1">Product filtering</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">40 min ago</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 z-10 shrink-0"></div>
                  <div className="pl-6">
                    <p className="text-sm text-slate-900 dark:text-slate-100"><span className="font-semibold">Mohit</span> assigned task to <span className="font-semibold">Rahul</span></p>
                    <p className="text-xs text-slate-500 mt-1">Payment webhook</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- */}
          {/* PROJECT INFORMATION                                */}
          {/* -------------------------------------------------- */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Project Information</h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5 text-sm">
              <div className="space-y-3">
                <div className="grid grid-cols-3">
                  <span className="text-slate-500 col-span-1">Created:</span>
                  <span className="font-medium col-span-2 text-slate-900 dark:text-slate-100">August 4, 2026</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-slate-500 col-span-1">Visibility:</span>
                  <span className="font-medium col-span-2 text-slate-900 dark:text-slate-100">Private</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-slate-500 col-span-1">Tech:</span>
                  <span className="font-medium col-span-2 text-slate-900 dark:text-slate-100 flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">React</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">Next.js</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">PostgreSQL</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
