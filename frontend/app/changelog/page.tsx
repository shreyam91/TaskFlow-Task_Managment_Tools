import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Changelog
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
              Keep track of the newest updates, improvements, and fixes to TaskManager.
            </p>
          </div>
          <div className="space-y-12">
            <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 pb-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">v2.1.0 - August 2026</span>
              <h2 className="text-2xl font-bold mb-3 dark:text-white">Introducing Custom Dashboards</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                You can now customize your home view with widgets. Tailor your experience by adding charts, recent tasks, and team activity feeds directly to your dashboard.
              </p>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2">
                <li>Added drag-and-drop widgets.</li>
                <li>New sprint burndown chart widget.</li>
                <li>Performance improvements for large projects.</li>
              </ul>
            </div>
            <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 pb-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">v2.0.5 - July 2026</span>
              <h2 className="text-2xl font-bold mb-3 dark:text-white">Dark Mode Enhancements</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We&apos;ve tweaked the contrast and colors in dark mode to reduce eye strain and improve readability during late-night productivity sessions.
              </p>
            </div>
            <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 pb-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">v2.0.0 - June 2026</span>
              <h2 className="text-2xl font-bold mb-3 dark:text-white">The Big Redesign</h2>
              <p className="text-slate-600 dark:text-slate-300">
                A massive overhaul of the user interface for better speed and aesthetics. Introducing global search, nested subtasks, and instant sync.
              </p>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
