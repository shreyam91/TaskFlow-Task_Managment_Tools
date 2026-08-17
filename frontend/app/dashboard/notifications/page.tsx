"use client";

import { IconBell, IconCheck, IconTrash, IconCircleFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Task Assigned",
    description: "You have been assigned to 'Frontend Bug Fixes' by Ram.",
    time: "2 hours ago",
    unread: true,
    type: "task",
  },
  {
    id: 2,
    title: "Project Update",
    description: "The 'Database Migration' project status was changed to In Progress.",
    time: "4 hours ago",
    unread: true,
    type: "project",
  },
  {
    id: 3,
    title: "Mentioned in comment",
    description: "Shreyam mentioned you in 'Use Case Report': @user can you review this?",
    time: "1 day ago",
    unread: false,
    type: "mention",
  },
  {
    id: 4,
    title: "Welcome to Task Manager",
    description: "We are glad to have you here! Start by creating your first project.",
    time: "3 days ago",
    unread: false,
    type: "system",
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative min-h-[calc(100vh-4rem)]">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 relative z-10 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Notifications
            <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
              2 Unread
            </span>
          </h2>
          <p className="text-muted-foreground mt-1">Stay updated with your latest alerts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl shadow-sm">
            <IconCheck className="w-4 h-4 mr-2" /> Mark all read
          </Button>
          <Button variant="outline" className="rounded-xl shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
            <IconTrash className="w-4 h-4 mr-2" /> Clear all
          </Button>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl space-y-4">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-6 rounded-3xl border transition-all ${
              notif.unread 
                ? "bg-white/80 dark:bg-slate-900/80 border-primary/20 shadow-md backdrop-blur-xl" 
                : "bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-xl"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full mt-1 ${
                notif.unread ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
              }`}>
                <IconBell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${notif.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
                <p className={`mt-1 ${notif.unread ? "text-slate-600 dark:text-slate-300" : "text-muted-foreground"}`}>
                  {notif.description}
                </p>
              </div>
              {notif.unread && (
                <IconCircleFilled className="w-3 h-3 text-primary mt-2 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
