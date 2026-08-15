"use client";

import { RoleGuard } from "@/components/admin/RoleGuard";
import { motion } from "motion/react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DollarSign, Users, Activity, CreditCard, Sparkles } from "lucide-react";

const data = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 5000, users: 4800 },
  { name: "Apr", revenue: 4500, users: 3908 },
  { name: "May", revenue: 6000, users: 4800 },
  { name: "Jun", revenue: 7500, users: 3800 },
];

const activities = [
  { id: 1, text: "Acme Corp upgraded to Enterprise", time: "2h ago", highlight: true },
  { id: 2, text: "New user registered (Globex)", time: "4h ago", highlight: false },
  { id: 3, text: "Soylent Corp subscription renewed", time: "5h ago", highlight: true },
  { id: 4, text: "Platform update v1.2 deployed", time: "1d ago", highlight: false },
];

const cards = [
  { title: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month", icon: DollarSign, color: "from-emerald-400 to-teal-400", bg: "bg-emerald-500/10" },
  { title: "Subscriptions", value: "2,350", sub: "+180.1% from last month", icon: CreditCard, color: "from-indigo-400 to-cyan-400", bg: "bg-indigo-500/10" },
  { title: "Active Users", value: "12,234", sub: "+19% from last month", icon: Users, color: "from-violet-400 to-purple-400", bg: "bg-violet-500/10" },
  { title: "Active Now", value: "573", sub: "+201 since last hour", icon: Activity, color: "from-pink-400 to-rose-400", bg: "bg-pink-500/10" },
];

export default function SuperAdminDashboard() {
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <div className="relative space-y-8 pb-8 min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/5 via-background to-background pointer-events-none -z-10 blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-400 w-fit mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Platform Overview</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back. Here's a high-level view of your platform.</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-row items-center justify-between space-y-0 pb-4">
                  <h3 className="tracking-tight text-sm font-semibold text-slate-300">{card.title}</h3>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${card.color}`}>
                    {card.value}
                  </div>
                  <p className="text-sm text-slate-400 mt-2 font-medium">{card.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts & Activity */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <div className="p-6 pb-2 border-b border-white/5">
              <h3 className="text-lg font-bold tracking-tight text-white">Revenue Growth</h3>
            </div>
            <div className="p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-3 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <div className="p-6 pb-2 border-b border-white/5">
              <h3 className="text-lg font-bold tracking-tight text-white">Real-time Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {activities.map((activity, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    key={activity.id} 
                    className="group flex items-start gap-4"
                  >
                    <div className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 transition-colors group-hover:border-indigo-500">
                      {activity.highlight && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                      )}
                      <Activity className={`h-4 w-4 ${activity.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{activity.text}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </RoleGuard>
  );
}
