"use client";

import { motion } from "motion/react";
import { useState } from "react";
import AuthPage from "@/features/auth/components/AuthPage";
import { IconCheck, IconSettings, IconUsers, IconRocket, IconListDetails } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function HeroSectionOne() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const onLoginClick = () => {
    // Development bypass
    router.push("/dashboard");
    // setShowAuthModal(true);
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white dark:bg-black font-sans">
        {/* Dot Grid Background */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <Navbar onLoginClick={onLoginClick} />

        {/* Floating Elements (Background) */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Top Left Float */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-[25%] left-[5%] md:left-[15%] rounded-2xl bg-white border border-slate-200 shadow-lg p-4 flex flex-col gap-2 pointer-events-auto"
          >
            <span className="text-sm font-medium text-slate-800">Frontend Redesign</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
                <span className="text-xl">🔥</span>
              </div>
              <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">High Priority</span>
            </div>
            {/* SVG Connecting Line */}
            <svg className="absolute -right-[150px] top-1/2 h-16 w-[150px] pointer-events-none" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="4 4">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <path d="M0,0 Q75,0 150,60" />
            </svg>
          </motion.div>

          {/* Top Right Float */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute top-[20%] right-[5%] md:right-[15%] rounded-2xl bg-white border border-slate-200 shadow-lg p-4 flex flex-col gap-2 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <IconUsers size={20} />
              </div>
              <div className="flex flex-col">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-700 w-fit">Eddie Lake</span>
                <span className="text-sm font-medium text-slate-800">Assigned to task</span>
              </div>
            </div>
            <svg className="absolute -bottom-[100px] left-1/4 h-[100px] w-16 pointer-events-none" fill="none" stroke="#818cf8" strokeWidth="2">
              <path d="M0,0 C0,50 50,50 50,100" />
            </svg>
          </motion.div>

          {/* Right Float 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute top-[45%] right-[2%] md:right-[8%] rounded-2xl bg-white border border-slate-200 shadow-lg px-5 py-3 flex items-center gap-3 pointer-events-auto"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <IconCheck size={20} />
            </div>
            <span className="text-lg font-medium text-slate-800">Sprint Completed!</span>
          </motion.div>

          {/* Bottom Left Float */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute bottom-[10%] left-[5%] md:left-[10%] rounded-2xl bg-white border border-slate-200 shadow-lg p-5 flex flex-col gap-3 w-64 pointer-events-auto"
          >
            <span className="text-base font-semibold text-slate-800">API Integration</span>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-full w-2/3 rounded-full bg-indigo-500" />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Backend Team</span>
              <span>In progress</span>
            </div>
          </motion.div>
          
          {/* Bottom Right Float */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="absolute bottom-[15%] right-[10%] md:right-[20%] rounded-full bg-white border border-slate-200 shadow-lg pl-4 pr-1 py-1 flex items-center gap-3 pointer-events-auto"
          >
            <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
               Code Review
            </span>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                <IconCheck size={12} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Jamik</span>
            </div>
          </motion.div>
        </div>

        <main className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 pt-32 pb-24 text-center">
          <div className="mx-auto max-w-[900px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl md:text-[5.5rem] md:leading-[1.1] dark:text-white"
            >
              The ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                task management
              </span> system
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mx-auto mt-8 max-w-2xl text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight"
            >
              A simple and efficient way for teams to create, assign, track, and manage projects in one unified workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <button 
                onClick={onLoginClick} 
                className="w-full sm:w-auto rounded-full bg-indigo-600 px-10 py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Get started
              </button>
              <button className="w-full sm:w-auto rounded-full bg-white px-10 py-4 text-base font-medium text-slate-800 shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors">
                View demo
              </button>
            </motion.div>
          </div>
        </main>

        {showAuthModal && <AuthPage onClose={() => setShowAuthModal(false)} />}
      </div>
    </>
  );
}

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  return (
    <nav className="absolute top-0 z-50 w-full px-6 py-5 bg-white/80 backdrop-blur-md border-b border-transparent">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <IconCheck size={20} stroke={3} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TaskManager</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button className="hover:text-slate-900 transition-colors flex items-center gap-1">Features</button>
            <button className="hover:text-slate-900 transition-colors flex items-center gap-1">Solutions</button>
            <button className="hover:text-slate-900 transition-colors flex items-center gap-1">Pricing</button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors" onClick={onLoginClick}>Log in</button>
          </div>
          <button
            onClick={onLoginClick}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
          >
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};
