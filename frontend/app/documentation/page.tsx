import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';
import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Documentation
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to set up, configure, and use TaskManager effectively.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Getting Started</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 transition">Quickstart Guide</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Inviting Team Members</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Setting up your Profile</Link></li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Task Management</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 transition">Creating Tasks & Subtasks</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Using Labels & Tags</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Board vs. List Views</Link></li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Developer API</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 transition">API Authentication</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Endpoints Reference</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Webhooks</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
