import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              The TaskManager Blog
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Insights, strategies, and tips on productivity, team collaboration, and getting things done.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'How to Master Asynchronous Communication', date: 'Aug 12, 2026', category: 'Productivity' },
              { title: 'The Future of Remote Work is Here', date: 'Aug 05, 2026', category: 'Remote Work' },
              { title: '5 New Features to Supercharge Your Workflow', date: 'Jul 28, 2026', category: 'Product Updates' },
              { title: 'Why Your Team Needs a Single Source of Truth', date: 'Jul 15, 2026', category: 'Leadership' },
              { title: 'Beating Burnout in High-Growth Startups', date: 'Jul 02, 2026', category: 'Wellbeing' },
              { title: 'A Guide to Setting Effective OKRs', date: 'Jun 20, 2026', category: 'Strategy' },
            ].map((post, i) => (
              <div key={i} className="flex flex-col bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition cursor-pointer">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-400">Image placeholder</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold dark:text-white mb-2 leading-tight">{post.title}</h3>
                  <div className="mt-auto text-sm text-slate-500 dark:text-slate-400">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
