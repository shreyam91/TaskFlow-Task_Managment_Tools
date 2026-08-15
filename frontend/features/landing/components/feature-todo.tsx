"use client";

import { motion } from "motion/react";
import { IconCheck, IconCircle, IconDots, IconPlus } from "@tabler/icons-react";

export default function FeatureTodo() {
  const tasks = [
    { id: 1, title: "Finalize presentation deck", completed: true, tag: "Marketing", color: "bg-pink-100 text-pink-700" },
    { id: 2, title: "Review Q3 financial report", completed: false, tag: "Finance", color: "bg-emerald-100 text-emerald-700" },
    { id: 3, title: "Update user dashboard layout", completed: false, tag: "Design", color: "bg-indigo-100 text-indigo-700" },
    { id: 4, title: "Weekly sync with engineering", completed: false, tag: "Internal", color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <section className="w-full py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Side: Text */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 w-fit dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300">
              Task Management
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
              Stay on top of <br/> your to-dos.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md">
              Organize your work into manageable tasks. Prioritize what's important, assign deadlines, and collaborate seamlessly with your team.
            </p>
            <ul className="flex flex-col gap-3 mt-4">
              {['Intuitive drag & drop interface', 'Custom tags and categories', 'Detailed progress tracking'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                    <IconCheck size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Mock UI */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Background Blob */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 blur-2xl opacity-50 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-[3rem]" />
            
            {/* Mock App Window */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="font-semibold text-slate-800 dark:text-white">My Tasks</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500">
                    <IconPlus size={14} /> Add Task
                  </button>
                  <button className="text-slate-400 hover:text-slate-600">
                    <IconDots size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-2">
                {tasks.map((task, idx) => (
                  <motion.div 
                    key={task.id}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 group transition-colors"
                  >
                    <button className={`flex-shrink-0 ${task.completed ? 'text-indigo-600' : 'text-slate-300 dark:text-slate-600 hover:text-indigo-400'}`}>
                      {task.completed ? <IconCheck size={22} className="rounded-full bg-indigo-100 p-1" /> : <IconCircle size={22} />}
                    </button>
                    <div className="flex flex-1 flex-col">
                      <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-semibold rounded-md ${task.color}`}>
                      {task.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
