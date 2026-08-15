import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white dark:bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: August 1, 2026</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              At TaskManager, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information, and to monitor and analyze trends and usage.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet can be guaranteed to be 100% secure.
            </p>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
