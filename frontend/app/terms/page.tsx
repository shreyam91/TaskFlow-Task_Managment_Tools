import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: August 1, 2026</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Please read these Terms of Service completely using TaskManager.io which is owned and operated by TaskManager Inc. This Agreement documents the legally binding terms and conditions attached to the use of the Site.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By using or accessing the Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">2. Subscriptions and Payments</h2>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as monthly or annually), depending on the type of subscription plan you select.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
