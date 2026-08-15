import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              About TaskManager
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
              We're on a mission to make work feel less like work.
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Founded in 2024, TaskManager was built out of frustration. We were tired of using bloated, complicated project management tools that required weeks of training just to get started. We wanted a tool that was as fast as our ideas and as intuitive as a simple to-do list, but powerful enough to run an entire company on.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Our Vision</h2>
            <p>
              We believe that the best work happens when teams are aligned, focused, and free from administrative busywork. TaskManager is designed to get out of your way so you can focus on executing your best ideas.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">The Team</h2>
            <p>
              We are a fully remote team spanning 12 time zones, united by our passion for productivity and beautiful software design. We practice what we preach, using TaskManager to build TaskManager every single day.
            </p>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
