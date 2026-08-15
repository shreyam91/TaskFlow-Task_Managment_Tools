import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Connect Your Favorite Tools
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              TaskManager integrates seamlessly with the software you already use, creating a unified workspace for maximum productivity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['Slack', 'GitHub', 'Jira', 'Google Workspace', 'Zoom', 'Figma', 'Notion', 'Zapier'].map(tool => (
              <div key={tool} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-400">{tool[0]}</span>
                </div>
                <h3 className="font-semibold dark:text-white">{tool}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
