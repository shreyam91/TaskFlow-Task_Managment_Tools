import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Cookie Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: August 1, 2026</p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="space-y-6 text-slate-600 dark:text-slate-300 prose dark:prose-invert max-w-none">
              <p>
                This Cookie Policy explains how TaskManager Inc. uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">What are cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Why do we use cookies?</h2>
              <p>
                We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">How can I control cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.
              </p>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
