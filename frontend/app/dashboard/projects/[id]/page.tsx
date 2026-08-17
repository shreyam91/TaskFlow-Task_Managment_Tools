"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  IconArrowLeft,
  IconBrandGithub,
  IconUsers,
  IconActivity,
  IconCode,
  IconInfoCircle,
  IconCalendarEvent
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// Mock Data
const MOCK_PROJECTS: Record<string, any> = {
  "ecommerce-platform": {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    description: "Modern online shopping platform with real-time inventory and high-performance checkout.",
    longDescription: "We are building a highly scalable e-commerce platform designed for independent retailers. The platform includes a real-time inventory management system, a highly optimized checkout flow, and built-in analytics. We are currently focusing on migrating our monolithic backend into microservices and need help building out the new frontend components in React.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS", "TypeScript"],
    roles: [
      { title: "Frontend Developer", count: 2, skills: ["React", "Next.js", "Tailwind CSS"] },
      { title: "Backend Developer", count: 1, skills: ["Node.js", "PostgreSQL", "Redis"] }
    ],
    teamSize: 3,
    activity: "Active",
    owner: "Mohit Sharma",
    type: "Startup",
    github: "public",
    createdAt: "2023-10-15",
    goals: [
      "Migrate to Next.js App Router",
      "Implement Redis caching for product catalog",
      "Redesign the checkout flow for higher conversion"
    ]
  },
  "ai-research-platform": {
    id: "ai-research-platform",
    name: "AI Research Platform",
    description: "Collaborative platform for sharing AI research papers, running models, and analyzing datasets.",
    longDescription: "A centralized hub for AI researchers to share datasets, publish interactive papers, and run inference models directly in the browser. We leverage FastAPI for our heavy lifting and React for our visualization dashboards.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    roles: [
      { title: "Frontend Developer", count: 1, skills: ["React", "D3.js"] },
      { title: "Data Scientist", count: 2, skills: ["Python", "PyTorch", "Pandas"] }
    ],
    teamSize: 2,
    activity: "Very Active",
    owner: "Dr. Jane Smith",
    type: "Open Source",
    github: "public",
    createdAt: "2024-01-10",
    goals: [
      "Build interactive data visualization components",
      "Optimize inference API endpoints",
      "Implement user authentication and roles"
    ]
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  
  const project = MOCK_PROJECTS[projectId] || MOCK_PROJECTS["ecommerce-platform"]; // Fallback for demo
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [message, setMessage] = useState("");

  const handleJoinSubmit = () => {
    setRequestStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setRequestStatus("sent");
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      
      {/* HEADER / NAVIGATION */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 px-6 py-4 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/projects" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <IconArrowLeft className="w-4 h-4 mr-2" />
            Back to Discover
          </Link>
          
          <div className="flex items-center gap-3">
            {requestStatus === "sent" ? (
              <Button disabled variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700">
                Request Pending
              </Button>
            ) : (
              <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Request to Join
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 md:px-12">
        
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
              {project.type}
            </span>
            {project.github === "public" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                <IconBrandGithub className="w-3.5 h-3.5" /> Public Repo
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">{project.name}</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: Main Details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <IconInfoCircle className="w-5 h-5 text-indigo-500" />
                About the Project
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{project.longDescription}</p>
              </div>
            </section>

            {/* Goals */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <IconActivity className="w-5 h-5 text-emerald-500" />
                Current Goals
              </h2>
              <ul className="space-y-3">
                {project.goals.map((goal: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2.5 shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300">{goal}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Roles Needed */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <IconUsers className="w-5 h-5 text-blue-500" />
                Roles Needed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.roles.map((role: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{role.title}</h3>
                      <span className="text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md text-slate-500">
                        x{role.count}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {role.skills.map((skill: string) => (
                        <span key={skill} className="px-2 py-1 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs font-medium rounded border border-slate-200 dark:border-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Metadata Sidebar */}
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-6">Project Overview</h3>
              
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Owner</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                      {project.owner.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{project.owner}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Team</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <IconUsers className="w-4 h-4 text-slate-400" />
                    {project.teamSize} developers
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Activity</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <IconActivity className="w-4 h-4 text-emerald-500" />
                    {project.activity}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Created</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <IconCalendarEvent className="w-4 h-4 text-slate-400" />
                    {new Date(project.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <IconCode className="w-4 h-4" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* JOIN REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Request to join {project.name}</h2>
              <p className="text-sm text-slate-500 mt-1">Tell the project owner why you'd like to join their team.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Message (Optional)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. I have experience building React and Next.js applications and would love to contribute to the frontend..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-sm"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={requestStatus === "submitting"}>
                Cancel
              </Button>
              <Button onClick={handleJoinSubmit} disabled={requestStatus === "submitting"} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]">
                {requestStatus === "submitting" ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  "Send Request"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
