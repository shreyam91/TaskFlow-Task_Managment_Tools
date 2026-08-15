"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, ShieldCheck, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-100">TaskFlow</span>
          </div>
          <nav>
            <Link
              href="/super/dashboard"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-100 px-6 py-2 font-medium text-slate-900 transition duration-300 hover:bg-white"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                The modern standard for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  SaaS Administration
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-400"
            >
              Manage tenants, subscriptions, employees, and platform analytics in one unified, blazing-fast dashboard. Designed for scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Link
                href="/super/dashboard"
                className="rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Platform Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to scale
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    name: 'Multi-Tenant Management',
                    description: 'Effortlessly manage thousands of companies, track their subscription tiers, and monitor active usage from a centralized view.',
                    icon: Users,
                  },
                  {
                    name: 'Role-Based Access Control',
                    description: 'Strict segregation between Super Admins and Company Admins, ensuring secure and isolated environments for different roles.',
                    icon: ShieldCheck,
                  },
                  {
                    name: 'Real-time Analytics',
                    description: 'Get deep insights into platform growth, revenue, and feature adoption with beautiful, interactive charts.',
                    icon: BarChart3,
                  },
                ].map((feature, index) => (
                  <motion.div 
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col rounded-2xl bg-slate-900/50 p-8 border border-slate-800 transition-colors hover:border-slate-700"
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                        <feature.icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          <p>&copy; 2026 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
