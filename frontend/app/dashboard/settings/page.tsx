"use client";

import { useState } from "react";
import { IconSettings, IconPalette, IconBell, IconShieldLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative min-h-[calc(100vh-4rem)]">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="flex items-center justify-between space-y-2 relative z-10 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your application preferences and configurations.</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          <button
            onClick={() => setActiveTab("appearance")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "appearance" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
            }`}
          >
            <IconPalette className="w-5 h-5" />
            <span className="font-medium">Appearance</span>
          </button>
          
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "notifications" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
            }`}
          >
            <IconBell className="w-5 h-5" />
            <span className="font-medium">Notifications</span>
          </button>
          
          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "security" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
            }`}
          >
            <IconShieldLock className="w-5 h-5" />
            <span className="font-medium">Security</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold">Theme Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">Customize how the application looks on your device.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-950">
                    <div className="w-full h-20 rounded-lg bg-white border border-slate-200 shadow-sm"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div className="border-2 border-primary rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer bg-slate-50 dark:bg-slate-950">
                    <div className="w-full h-20 rounded-lg bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-4 bg-slate-800"></div>
                      <div className="absolute top-6 left-2 w-1/3 h-12 bg-slate-800 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">Dark (Active)</span>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-colors bg-gradient-to-br from-slate-100 to-slate-900">
                    <div className="w-full h-20 rounded-lg backdrop-blur-md bg-white/30 border border-white/20 shadow-sm"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
              
              <hr className="border-border" />
              
              <div className="flex justify-end">
                <Button className="rounded-xl">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <p className="text-sm text-muted-foreground mb-4">Control what emails you receive.</p>
                
                <div className="space-y-4">
                  {[
                    { title: "Task Assignments", desc: "When you are assigned to a new task." },
                    { title: "Project Updates", desc: "When a project you are part of is updated." },
                    { title: "Mentions", desc: "When someone mentions you in a comment." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      {/* Mock Toggle Switch */}
                      <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">Irreversible security actions.</p>
                
                <div className="p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm text-red-600 dark:text-red-400">Delete Account</h4>
                    <p className="text-xs text-red-500/80">Permanently remove all your data.</p>
                  </div>
                  <Button variant="destructive" className="rounded-xl">Delete</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
