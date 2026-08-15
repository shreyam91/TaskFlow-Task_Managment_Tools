"use client";

import Link from "next/link";
import { IconBrandGithub, IconBrandTwitter, IconCheck } from "@tabler/icons-react";

export default function CtaAndFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="w-full py-24 bg-indigo-600 dark:bg-indigo-950">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-6">
            Ready to get your team aligned?
          </h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams who are already using TaskManager to ship faster, communicate better, and reduce busywork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-colors">
              Get started for free
            </button>
            <button className="rounded-full bg-indigo-700 px-8 py-4 text-base font-bold text-white border border-indigo-500 hover:bg-indigo-600 transition-colors">
              Talk to sales
            </button>
          </div>
          <p className="mt-6 text-sm text-indigo-200">
            No credit card required. 14-day free trial on Pro plans.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-black py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                  <IconCheck size={20} stroke={3} />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TaskManager</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6">
                The ultimate task management system. Built for high-velocity teams who want to focus on the work that matters.
              </p>
              <div className="flex gap-4 text-slate-400">
                <button className="hover:text-indigo-600 transition-colors"><IconBrandTwitter size={20} /></button>
                <button className="hover:text-indigo-600 transition-colors"><IconBrandGithub size={20} /></button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/features" className="hover:text-indigo-600 transition-colors">Features</Link></li>
                <li><Link href="/integrations" className="hover:text-indigo-600 transition-colors">Integrations</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
                <li><Link href="/changelog" className="hover:text-indigo-600 transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/documentation" className="hover:text-indigo-600 transition-colors">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
                <li><Link href="/community" className="hover:text-indigo-600 transition-colors">Community</Link></li>
                <li><Link href="/contact-support" className="hover:text-indigo-600 transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/about-us" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                <li><Link href="/legal" className="hover:text-indigo-600 transition-colors">Legal</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} TaskManager Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms</Link>
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
              <Link href="/cookies" className="hover:text-slate-900 dark:hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
