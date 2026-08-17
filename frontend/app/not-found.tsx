"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Server, Database, Cloud, ZapOff, Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Animated Floating Nodes */}
      <div className="relative z-0 w-full max-w-3xl h-64 mb-12 hidden md:block">
        
        {/* Node 1 - Cloud */}
        <motion.div 
          className="absolute top-10 left-1/4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-8 h-8 text-indigo-500" />
        </motion.div>

        {/* Node 2 - Database (Disconnected) */}
        <motion.div 
          className="absolute bottom-4 right-1/4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-4 rounded-xl shadow-lg"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="relative">
            <Database className="w-8 h-8 text-red-500" />
            <ZapOff className="w-5 h-5 text-red-600 absolute -top-3 -right-3 bg-red-100 dark:bg-red-900 rounded-full p-0.5" />
          </div>
        </motion.div>

        {/* Node 3 - Server */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-lg"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Server className="w-8 h-8 text-indigo-500" />
        </motion.div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full -z-10" pointerEvents="none">
          <motion.path 
            d="M 300 80 Q 380 80, 380 120 T 450 128" 
            fill="none" 
            stroke="currentColor" 
            className="text-indigo-200 dark:text-indigo-900/50" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
          />
          {/* Broken Line to Database */}
          <motion.path 
            d="M 450 128 Q 500 128, 520 180 T 550 200" 
            fill="none" 
            stroke="currentColor" 
            className="text-red-300 dark:text-red-900/50" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>

      </div>

      {/* Main Content Card */}
      <motion.div 
        className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-8 sm:p-12 text-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            className="bg-red-100 dark:bg-red-900/30 p-4 rounded-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity className="w-12 h-12 text-red-600 dark:text-red-400" />
          </motion.div>
        </div>
        
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Endpoint Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The requested workspace or project architecture could not be located. It might have been moved or deleted.
        </p>
        
        <Link href="/dashboard" passHref>
          <Button className="w-full rounded-xl py-6 text-lg font-medium group transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/25 hover:shadow-xl">
            <IconArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Return to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
