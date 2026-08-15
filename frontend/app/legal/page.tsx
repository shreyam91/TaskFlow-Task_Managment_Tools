import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Legal Information
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
              Important legal documents and policies.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="space-y-6 text-slate-600 dark:text-slate-300 prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Copyright</h2>
              <p>
                All content on this website, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of TaskManager Inc. or its content suppliers and protected by international copyright laws.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trademarks</h2>
              <p>
                TaskManager and other marks indicated on our site are trademarks of TaskManager Inc. TaskManager's trademarks and trade dress may not be used in connection with any product or service that is not TaskManager's, in any manner that is likely to cause confusion among customers.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compliance</h2>
              <p>
                We comply with all applicable local, state, national, and international laws and regulations regarding the provision of our services, including data protection laws such as GDPR and CCPA.
              </p>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
