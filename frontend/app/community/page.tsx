import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6 text-center">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Join the Community
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Connect with other TaskManager users, share your workflows, and learn from productivity experts around the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-left">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 font-bold text-2xl">
                💬
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-3">Community Forum</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Ask questions, share best practices, and get help from our active community of thousands of users.
              </p>
              <button className="text-indigo-600 font-bold hover:underline">Go to Forums &rarr;</button>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-left">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 font-bold text-2xl">
                📺
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-3">Live Events & Webinars</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Join our product team for weekly AMAs, deep-dive tutorials, and exclusive previews of upcoming features.
              </p>
              <button className="text-indigo-600 font-bold hover:underline">View Schedule &rarr;</button>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
