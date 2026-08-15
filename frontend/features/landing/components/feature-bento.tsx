"use client";

import { motion } from "motion/react";
import { IconChartBar, IconBell, IconPuzzle, IconMoon } from "@tabler/icons-react";

export default function FeatureBento() {
  const features = [
    {
      title: "Real-time Analytics",
      description: "Get insights into your team's productivity with beautiful, auto-generated charts and velocity tracking.",
      icon: <IconChartBar size={24} />,
      className: "col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/30",
    },
    {
      title: "Smart Notifications",
      description: "Never miss an update. Get pinged only when it matters to you.",
      icon: <IconBell size={24} />,
      className: "col-span-1 row-span-1 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-900 dark:to-rose-950/30",
    },
    {
      title: "100+ Integrations",
      description: "Connect with Slack, GitHub, Figma, and all the tools your team already uses.",
      icon: <IconPuzzle size={24} />,
      className: "col-span-1 row-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30",
    },
    {
      title: "Gorgeous Dark Mode",
      description: "Easy on the eyes. A meticulously crafted dark theme for late-night productivity.",
      icon: <IconMoon size={24} />,
      className: "col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
    },
  ];

  return (
    <section className="w-full py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            Everything you need to ship faster.
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            We've built all the core primitives you need to manage your projects, so you can focus entirely on doing great work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden relative group ${feature.className}`}
            >
              <div className="h-12 w-12 rounded-2xl bg-white/60 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm border border-white/40 dark:border-white/10">
                {feature.icon}
              </div>
              <div className="mt-auto z-10 relative">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
