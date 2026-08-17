"use client";

import { useEffect, useState, useRef } from "react";
import { IconSearch, IconListDetails, IconFolder, IconUsers, IconSettings, IconHelp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-spotlight", handleCustomEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-spotlight", handleCustomEvent);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [isOpen]);

  const navigationItems = [
    { name: "Dashboard", url: "/dashboard", icon: IconSearch },
    { name: "Tasks", url: "/dashboard/tasks", icon: IconListDetails },
    { name: "Projects", url: "/dashboard/projects", icon: IconFolder },
    { name: "Team", url: "/dashboard/team", icon: IconUsers },
    { name: "Settings", url: "/dashboard/settings", icon: IconSettings },
    { name: "Account", url: "/dashboard/account", icon: IconUsers },
    { name: "Notifications", url: "/dashboard/notifications", icon: IconSearch },
    { name: "FAQ / Help", url: "/dashboard/faq", icon: IconHelp },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <IconSearch className="w-6 h-6 text-muted-foreground mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-xl placeholder:text-muted-foreground text-foreground"
            placeholder="What do you need?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded border border-border">
            ESC
          </kbd>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Navigation
              </div>
              {filteredItems.map((item, index) => (
                <button
                  key={item.url}
                  onClick={() => handleNavigate(item.url)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-base font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
