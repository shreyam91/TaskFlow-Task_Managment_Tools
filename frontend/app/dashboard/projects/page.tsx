"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  IconSearch, 
  IconFilter, 
  IconX,
  IconUsers,
  IconActivity,
  IconCode
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// Mock Data
const MOCK_PROJECTS = [
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    description: "Modern online shopping platform with real-time inventory and high-performance checkout.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
    roles: ["Frontend Developer", "Backend Developer"],
    teamSize: 3,
    activity: "Active",
    owner: "Mohit Sharma",
    type: "Startup"
  },
  {
    id: "ai-research-platform",
    name: "AI Research Platform",
    description: "Collaborative platform for sharing AI research papers, running models, and analyzing datasets.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL"],
    roles: ["Frontend Developer", "Data Scientist"],
    teamSize: 2,
    activity: "Very Active",
    owner: "Dr. Jane Smith",
    type: "Open Source"
  },
  {
    id: "dev-tools-cli",
    name: "DevTools CLI",
    description: "A fast, Rust-based command line interface for orchestrating local microservices.",
    technologies: ["Rust", "Go", "TypeScript"],
    roles: ["Backend Developer"],
    teamSize: 1,
    activity: "Active",
    owner: "Alex Chen",
    type: "Open Source"
  },
  {
    id: "finance-dashboard",
    name: "Personal Finance Dashboard",
    description: "An open-source budgeting app with automated bank syncing and insights.",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    roles: ["UI/UX Designer", "Frontend Developer"],
    teamSize: 4,
    activity: "Needs Help",
    owner: "Sarah Jenkins",
    type: "Personal Project"
  }
];

const FILTER_OPTIONS = {
  technologies: ["React", "Next.js", "Node.js", "Python", "Java", "Go", "PostgreSQL", "Rust", "Tailwind CSS"],
  roles: ["Frontend Developer", "Backend Developer", "Full Stack", "UI/UX Designer", "Data Scientist"],
  types: ["Open Source", "Private Team", "Startup", "Personal Project"]
};

export default function DiscoverProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("best-match");
  
  // Filtering Logic
  const filteredProjects = MOCK_PROJECTS.filter(project => {
    // Search match
    const searchMatch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Tech match
    const techMatch = selectedTechs.length === 0 || 
      selectedTechs.some(tech => project.technologies.includes(tech));

    // Role match
    const roleMatch = selectedRoles.length === 0 || 
      selectedRoles.some(role => project.roles.includes(role));

    // Type match
    const typeMatch = selectedTypes.length === 0 || 
      selectedTypes.includes(project.type);

    return searchMatch && techMatch && roleMatch && typeMatch;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
    setSelectedRoles([]);
    setSelectedTypes([]);
  };

  const toggleFilter = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-8 md:px-12 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Discover Projects</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Find software projects that match your skills and interests.</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects by name, description, or technology (e.g. 'React', 'E-commerce')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 md:px-12 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <IconFilter className="w-4 h-4" /> Filters
            </h2>
            {(selectedTechs.length > 0 || selectedRoles.length > 0 || selectedTypes.length > 0) && (
              <button onClick={clearFilters} className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Tech Filter */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Technology</h3>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleFilter(selectedTechs, setSelectedTechs, tech)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      selectedTechs.includes(tech)
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Role Needed</h3>
              <div className="flex flex-col gap-2">
                {FILTER_OPTIONS.roles.map(role => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedRoles.includes(role)}
                      onChange={() => toggleFilter(selectedRoles, setSelectedRoles, role)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Project Type</h3>
              <div className="flex flex-col gap-2">
                {FILTER_OPTIONS.types.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS AREA */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 font-medium">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="best-match">Best Match</option>
                <option value="recently-added">Recently Added</option>
                <option value="most-active">Most Active</option>
              </select>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex flex-col group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                        <IconCode className="w-3 h-3 text-slate-400" />
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-medium rounded border border-dashed border-slate-300 dark:border-slate-700">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/50 mb-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase w-20 shrink-0">Looking for:</span>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-tight">
                        {project.roles.join(", ")}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase w-20 shrink-0">Team:</span>
                      <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <IconUsers className="w-4 h-4 text-slate-400" />
                        {project.teamSize} {project.teamSize === 1 ? 'developer' : 'developers'}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase w-20 shrink-0">Activity:</span>
                      <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <IconActivity className="w-4 h-4 text-emerald-500" />
                        {project.activity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                        {project.owner.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{project.owner}</span>
                    </div>
                    <Button asChild variant="outline" className="shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                      <Link href={`/dashboard/projects/${project.id}`}>
                        View Project
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <IconSearch className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">No projects match your search</h3>
              <p className="text-slate-500 text-center max-w-md mb-6">
                We couldn't find any projects matching your current filters. Try removing some filters or searching for different technologies.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
                <Button asChild>
                  <Link href="/dashboard/projects/create">Create a Project</Link>
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
