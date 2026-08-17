"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { 
  GitPullRequest, GitCommit, Github, 
  FolderKanban, Users, Code2, 
  Search, ArrowRight, CheckCircle2, 
  Activity, Zap, Shield, ChevronRight, Menu
} from "lucide-react";
import { IconCheck, IconUsers } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function DevDeskLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">DevDesk</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <Link href="#product" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Product</Link>
                <Link href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</Link>
                <Link href="#developers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">For Developers</Link>
                <Link href="#owners" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">For Project Owners</Link>
                <Link href="#github" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Log in</Link>
              <Link href="/onboarding">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        
        {/* HERO SECTION - USING PREVIOUS DESIGN */}
        <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden px-4 pt-16 pb-20 text-center">
          {/* Floating Elements (Background) */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden max-w-7xl mx-auto">
            {/* Top Left Float */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-[25%] left-[5%] md:left-[10%] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-4 flex flex-col gap-2 pointer-events-auto"
            >
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">API Integration</span>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <span className="text-xl">🔥</span>
                </div>
                <span className="rounded-md bg-rose-100 dark:bg-rose-900/50 px-2 py-1 text-xs font-semibold text-rose-700 dark:text-rose-400">High Priority</span>
              </div>
              {/* SVG Connecting Line */}
              <svg className="absolute -right-[150px] top-1/2 h-16 w-[150px] pointer-events-none hidden lg:block" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="4 4">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                <path d="M0,0 Q75,0 150,60" />
              </svg>
            </motion.div>

            {/* Top Right Float */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute top-[20%] right-[5%] md:right-[10%] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-4 flex flex-col gap-2 pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <IconUsers size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="rounded-md bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-400 w-fit">Eddie Lake</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Assigned to task</span>
                </div>
              </div>
              <svg className="absolute -bottom-[100px] left-1/4 h-[100px] w-16 pointer-events-none hidden lg:block" fill="none" stroke="#818cf8" strokeWidth="2">
                <path d="M0,0 C0,50 50,50 50,100" />
              </svg>
            </motion.div>

            {/* Right Float 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute top-[45%] right-[2%] md:right-[5%] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg px-5 py-3 flex items-center gap-3 pointer-events-auto"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <IconCheck size={20} />
              </div>
              <span className="text-lg font-medium text-slate-800 dark:text-slate-200">PR Merged!</span>
            </motion.div>

            {/* Bottom Left Float */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="absolute bottom-[20%] left-[5%] md:left-[8%] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-5 flex flex-col gap-3 w-64 pointer-events-auto"
            >
              <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Frontend Redesign</span>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-2/3 rounded-full bg-indigo-500" />
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Frontend Team</span>
                <span>In progress</span>
              </div>
            </motion.div>
            
            {/* Bottom Right Float */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="absolute bottom-[25%] right-[10%] md:right-[15%] rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg pl-4 pr-1 py-1 flex items-center gap-3 pointer-events-auto"
            >
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 Code Review
              </span>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                  <IconCheck size={12} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Jamik</span>
              </div>
            </motion.div>
          </div>

          <div className="relative z-20 mx-auto max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Build software projects <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                together.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              DevDesk brings developers, project owners, tasks, and GitHub development into one collaborative workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/onboarding">
                <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-full sm:w-auto shadow-lg shadow-indigo-500/25">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/dashboard/discover">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
                  Explore Projects
                </Button>
              </Link>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-sm text-slate-500"
            >
              No credit card required.
            </motion.p>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Built for modern software development teams</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['GitHub', 'React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'].map(tech => (
                <span key={tech} className="text-lg font-bold text-slate-800 dark:text-slate-300">{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUE SECTION */}
        <section id="product" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything your project needs to move forward.</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Keep project planning and software development connected.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Block 1 */}
            <motion.div whileInView="visible" initial="hidden" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group">
              <FolderKanban className="w-10 h-10 text-indigo-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Project Workspaces</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Give every project its own workspace with tasks, team members, activity, analytics, and project information.</p>
              <div className="w-full h-48 bg-white dark:bg-slate-950 rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800 shadow-xl p-4 translate-y-4 group-hover:translate-y-2 transition-transform relative">
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -right-3 bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 rounded px-2 py-1 shadow-sm hidden md:block"
                >
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Workspace Active</span>
                </motion.div>
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-10 bg-slate-100 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800"></div>
                  <div className="h-10 bg-slate-100 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800"></div>
                </div>
              </div>
            </motion.div>

            {/* Block 2 */}
            <motion.div whileInView="visible" initial="hidden" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group">
              <Users className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Developer Collaboration</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Build a team around your project and collaborate with developers in one shared environment.</p>
              <div className="w-full h-48 bg-white dark:bg-slate-950 rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800 shadow-xl p-4 translate-y-4 group-hover:translate-y-2 transition-transform flex gap-2 relative">
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 left-4 bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1 shadow-sm hidden md:flex items-center gap-1"
                >
                  <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">+3 Joined</span>
                </motion.div>
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 mb-2"></div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Block 3 */}
            <motion.div whileInView="visible" initial="hidden" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group">
              <Github className="w-10 h-10 text-slate-700 dark:text-slate-300 mb-6" />
              <h3 className="text-2xl font-bold mb-3">GitHub Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Connect your repository and bring commits, pull requests, and development activity into your project.</p>
              <div className="w-full h-48 bg-white dark:bg-slate-950 rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800 shadow-xl p-4 translate-y-4 group-hover:translate-y-2 transition-transform space-y-3">
                <div className="flex items-center gap-3"><GitPullRequest className="text-purple-500 w-5 h-5"/> <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div></div>
                <div className="flex items-center gap-3"><GitCommit className="text-slate-400 w-5 h-5"/> <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div></div>
              </div>
            </motion.div>

            {/* Block 4 */}
            <motion.div whileInView="visible" initial="hidden" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group">
              <Search className="w-10 h-10 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Project Discovery</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Discover software projects looking for developers and request to join teams that match your skills.</p>
              <div className="w-full h-48 bg-white dark:bg-slate-950 rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800 shadow-xl p-4 translate-y-4 group-hover:translate-y-2 transition-transform space-y-3">
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg"><div className="h-3 w-1/3 bg-emerald-500/20 rounded mb-2"></div><div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div></div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg"><div className="h-3 w-1/4 bg-blue-500/20 rounded mb-2"></div><div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">From idea to shipped software.</h2>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-slate-200 dark:bg-slate-800"></div>
              
              {[
                { step: '01', title: 'Create or discover', desc: 'Create your own project or find a project that matches your skills.' },
                { step: '02', title: 'Create a workspace', desc: 'Every project gets a dedicated workspace for planning and collaboration.' },
                { step: '03', title: 'Build together', desc: 'Invite developers, assign tasks, collaborate, and connect GitHub.' },
                { step: '04', title: 'Track progress', desc: 'See project activity, task progress, GitHub development, and team activity in one place.' }
              ].map((item, i) => (
                <motion.div key={i} whileInView="visible" initial="hidden" variants={fadeUp} viewport={{ once: true }} className="relative z-10">
                  <div className="w-12 h-12 bg-white dark:bg-slate-950 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold rounded-full flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DEVELOPER SECTION */}
        <section id="developers" className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Find projects worth building.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Stop managing your work in disconnected tools. Discover projects, join teams, and contribute to software that interests you.
              </p>
              <Link href="/dashboard/discover">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 group">
                  Explore Projects <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 w-full relative mt-8 md:mt-0">
              
              {/* Floating element 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-2 md:-right-6 z-20 bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 shadow-lg flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">98% Skill Match</span>
              </motion.div>
              
              {/* Floating element 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-2 md:-left-6 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-lg flex items-center gap-2"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Role:</span>
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded text-xs font-bold">Frontend</span>
              </motion.div>
              
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl relative z-10">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <Search className="w-5 h-5 text-slate-400"/>
                  <span className="text-slate-500">React e-commerce...</span>
                </div>
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium">React</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium">Next.js</span>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500 transition-colors">
                  <h4 className="font-bold text-lg mb-1">E-Commerce Platform</h4>
                  <p className="text-slate-500 text-sm mb-4">Modern e-commerce platform.</p>
                  <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                    <div><span className="text-slate-400">Looking for:</span> <span className="font-medium text-indigo-600 dark:text-indigo-400">Frontend Developer</span></div>
                    <Button variant="outline" size="sm" className="rounded-full">View Project</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GITHUB SECTION */}
        <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Your project and your code, connected.</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Connect GitHub and keep development activity connected to the work your team is doing.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-1 space-y-6 relative mt-8 md:mt-0">
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-4 md:-right-10 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-2 px-4 shadow-lg flex items-center gap-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Build Passing</span>
              </motion.div>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative z-10">
                <div className="absolute -left-3 top-6 w-6 h-px bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  <span className="font-semibold">#42 Implement payment gateway</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 ml-8">
                  <GitCommit className="w-4 h-4"/> 7 commits
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative ml-12 border-l-4 border-l-purple-500 z-10">
                <div className="absolute -left-12 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700"></div>
                <div className="absolute -left-12 top-6 w-12 h-px bg-slate-300 dark:bg-slate-700"></div>
                
                <div className="flex items-center gap-3 mb-2">
                  <GitPullRequest className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">PR #42</span>
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">Merged</span>
                </div>
                <div className="text-sm text-slate-500 ml-8">
                  mohit/ecommerce-platform • feature/payment-gateway
                </div>
              </div>
            </div>

            <div className="flex-1 text-lg text-slate-600 dark:text-slate-400">
              <p className="mb-4">
                DevDesk bridges the gap between task management and version control. 
              </p>
              <p>
                Link branches and pull requests directly to project tasks. See exactly when code is committed, reviewed, and merged, without ever leaving your workspace.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="py-24 bg-slate-950 text-white border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Not another task manager.</h2>
            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">DevDesk connects project collaboration with the actual software development workflow.</p>
            
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 opacity-60">
                <h3 className="text-slate-500 font-bold uppercase tracking-wider mb-8">Traditional Workflow</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">Project idea</div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-slate-700 rotate-90" /></div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">Task manager & Chat</div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-slate-700 rotate-90" /></div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">GitHub</div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-slate-700 rotate-90" /></div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-red-900/50 text-red-400">Scattered updates & Manual tracking</div>
                </div>
              </div>
              
              <div className="bg-indigo-950/20 rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>
                <h3 className="text-indigo-400 font-bold uppercase tracking-wider mb-8">DevDesk Workflow</h3>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-slate-900/80 backdrop-blur rounded-lg border border-indigo-500/20 font-medium">Project Workspace</div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-indigo-500/50 rotate-90" /></div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-slate-900/80 backdrop-blur rounded-lg border border-indigo-500/20 font-medium text-center">Tasks + Team</div>
                    <div className="flex-1 p-4 bg-slate-900/80 backdrop-blur rounded-lg border border-indigo-500/20 font-medium text-center">GitHub</div>
                  </div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-indigo-500/50 rotate-90" /></div>
                  <div className="p-4 bg-indigo-600 rounded-lg font-bold text-center shadow-lg shadow-indigo-500/25">Shared Progress & Activity</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="py-20 text-center px-4 max-w-3xl mx-auto">
          <Shield className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your projects stay yours.</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Built with strict workspace isolation. Access control is managed through role-based permissions, ensuring your private tasks, team details, and GitHub data remain secure within your dedicated project workspace.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-indigo-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Have a project to build?</h2>
              <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto">Create a workspace, bring your team together, and start building.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/dashboard/projects/create">
                  <Button size="lg" className="h-14 px-8 text-lg bg-white text-indigo-600 hover:bg-slate-50 rounded-full w-full sm:w-auto">
                    Create Your Project
                  </Button>
                </Link>
                <Link href="/dashboard/discover">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border-indigo-400 text-white hover:bg-indigo-500/50">
                    Explore Projects
                  </Button>
                </Link>
              </div>
              
              <p className="text-indigo-200">
                Looking for something to build? <Link href="/dashboard/discover" className="text-white font-medium hover:underline">Discover Projects</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                  <Code2 className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">DevDesk</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                Developer-focused collaboration for software projects.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Workspaces</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</Link></li>
                <li><Link href="/dashboard/discover" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Discover Projects</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Developers</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/dashboard/discover" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Discover Projects</Link></li>
                <li><Link href="/dashboard/account" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Developer Profiles</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Collaboration</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/dashboard/projects/create" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Create Project</Link></li>
                <li><Link href="/dashboard/owner/requests" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Build Teams</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Project Management</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div>© {new Date().getFullYear()} DevDesk. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter/X</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
