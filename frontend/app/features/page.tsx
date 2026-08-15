import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Powerful Features for High-Velocity Teams
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Everything you need to manage tasks, track progress, and collaborate effectively. Discover why thousands of teams rely on TaskManager.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-3 dark:text-white">Intuitive Task Tracking</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Create, assign, and organize tasks effortlessly. Use lists, boards, or calendar views to manage your workflow exactly how you want.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-3 dark:text-white">Seamless Collaboration</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Communicate in real-time with your team. Tag members, leave comments, and attach files directly to tasks to keep everyone in the loop.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-3 dark:text-white">Advanced Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Gain insights into your team's performance. Track velocity, identify bottlenecks, and generate comprehensive reports with one click.
              </p>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
