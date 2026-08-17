import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Join Our Team
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Help us build the future of work. We&apos;re a remote-first company looking for passionate builders.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Open Positions</h2>
          
          <div className="space-y-4">
            {[
              { role: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (US/EU)' },
              { role: 'Backend Engineer (Go)', dept: 'Engineering', location: 'Remote (Global)' },
              { role: 'Product Designer', dept: 'Design', location: 'Remote (US)' },
              { role: 'Customer Success Manager', dept: 'Support', location: 'Remote (APAC)' },
              { role: 'Developer Advocate', dept: 'Marketing', location: 'Remote (Global)' }
            ].map((job, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition cursor-pointer">
                <div>
                  <h3 className="text-lg font-bold dark:text-white">{job.role}</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{job.dept} &middot; {job.location}</div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button className="text-indigo-600 font-semibold hover:underline">View details &rarr;</button>
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
