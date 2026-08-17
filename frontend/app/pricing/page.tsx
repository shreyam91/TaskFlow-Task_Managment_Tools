import React from 'react';
import CtaAndFooter from '@/features/landing/components/cta-footer';

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your team&apos;s needs. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold dark:text-white">Basic</h3>
              <div className="mt-4 text-4xl font-extrabold dark:text-white">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="mt-4 text-slate-500 dark:text-slate-400">Perfect for individuals and small projects.</p>
              <ul className="mt-8 space-y-4 text-slate-600 dark:text-slate-300">
                <li>✓ Up to 5 projects</li>
                <li>✓ Basic task tracking</li>
                <li>✓ Community support</li>
              </ul>
              <button className="mt-8 w-full py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950 transition">Get Started</button>
            </div>
            <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl transform md:-translate-y-4 text-white">
              <h3 className="text-2xl font-bold text-white">Pro</h3>
              <div className="mt-4 text-4xl font-extrabold text-white">$12<span className="text-lg text-indigo-200 font-normal">/mo</span></div>
              <p className="mt-4 text-indigo-100">Best for growing teams who need more power.</p>
              <ul className="mt-8 space-y-4 text-indigo-50">
                <li>✓ Unlimited projects</li>
                <li>✓ Advanced reporting</li>
                <li>✓ Custom integrations</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="mt-8 w-full py-3 rounded-full bg-white text-indigo-600 font-bold hover:bg-slate-100 transition">Start Free Trial</button>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold dark:text-white">Enterprise</h3>
              <div className="mt-4 text-4xl font-extrabold dark:text-white">Custom</div>
              <p className="mt-4 text-slate-500 dark:text-slate-400">For large organizations with complex needs.</p>
              <ul className="mt-8 space-y-4 text-slate-600 dark:text-slate-300">
                <li>✓ SSO & Advanced Security</li>
                <li>✓ Dedicated success manager</li>
                <li>✓ Custom workflows</li>
                <li>✓ 24/7 phone support</li>
              </ul>
              <button className="mt-8 w-full py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition dark:text-white">Contact Sales</button>
            </div>
          </div>
        </div>
      </main>
      <CtaAndFooter />
    </div>
  );
}
