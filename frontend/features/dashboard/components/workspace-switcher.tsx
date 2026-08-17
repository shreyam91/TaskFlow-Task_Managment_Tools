"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconChevronDown,
  IconSearch,
  IconPlus,
  IconCompass,
  IconCheck
} from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Workspace {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

// Mock user workspaces
const MY_WORKSPACES: Workspace[] = [
  { id: "ecommerce-platform", name: "E-Commerce Platform", color: "bg-purple-500", taskCount: 4 },
  { id: "ai-research-platform", name: "AI Research Platform", color: "bg-emerald-500", taskCount: 2 },
  { id: "portfolio-website", name: "Portfolio Website", color: "bg-blue-500", taskCount: 1 },
  { id: "dev-tools-cli", name: "DevTools CLI", color: "bg-orange-500", taskCount: 0 },
];

export function WorkspaceSwitcher({ workspaceId }: { workspaceId?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentWorkspace = MY_WORKSPACES.find(w => w.id === workspaceId) || null;

  const filteredWorkspaces = MY_WORKSPACES.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setOpen(false);
    setSearch("");
    router.push(`/dashboard/workspace/${id}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <div className="flex items-center gap-2 truncate">
            {currentWorkspace ? (
              <>
                <div className={cn("w-2 h-2 rounded-full shrink-0", currentWorkspace.color)} />
                <span className="truncate">{currentWorkspace.name}</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full shrink-0 bg-slate-300 dark:bg-slate-700" />
                <span className="truncate">Select Workspace</span>
              </>
            )}
          </div>
          <IconChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[300px] p-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg rounded-xl overflow-hidden flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800/60 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-10">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search workspaces..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
          <p className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Your Workspaces
          </p>

          {filteredWorkspaces.length > 0 ? (
            filteredWorkspaces.map(workspace => {
              const isSelected = workspace.id === workspaceId;
              return (
                <button
                  key={workspace.id}
                  onClick={() => handleSelect(workspace.id)}
                  className={cn(
                    "w-full flex items-start justify-between px-2 py-2 rounded-md transition-colors text-left group",
                    isSelected 
                      ? "bg-indigo-50 dark:bg-indigo-900/20" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-900"
                  )}
                >
                  <div className="flex gap-2.5 min-w-0">
                    <div className={cn("w-2 h-2 rounded-full shrink-0 mt-1.5", workspace.color)} />
                    <div className="truncate">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        isSelected ? "text-indigo-900 dark:text-indigo-100" : "text-slate-900 dark:text-slate-100"
                      )}>
                        {workspace.name}
                      </p>
                      {workspace.taskCount > 0 ? (
                        <p className={cn(
                          "text-xs truncate",
                          isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500"
                        )}>
                          {workspace.taskCount} {workspace.taskCount === 1 ? 'task' : 'tasks'} assigned to you
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 truncate">No assigned tasks</p>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <IconCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-2 py-6 text-center text-sm text-slate-500">
              No workspaces found.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
          <Link href="/dashboard/projects/create" onClick={() => setOpen(false)} className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
            <IconPlus className="w-4 h-4 text-slate-500" />
            Create Workspace
          </Link>
          <Link href="/dashboard/projects" onClick={() => setOpen(false)} className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
            <IconCompass className="w-4 h-4 text-slate-500" />
            Discover Projects
          </Link>
        </div>

      </PopoverContent>
    </Popover>
  );
}
