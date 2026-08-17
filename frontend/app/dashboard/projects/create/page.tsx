"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  IconLock, 
  IconWorld, 
  IconBrandGithub, 
  IconCheck, 
  IconArrowRight, 
  IconArrowLeft,
  IconPlus,
  IconX
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Visibility = "private" | "discoverable";

export default function CreateProjectPage() {
  const router = useRouter();
  
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  
  // Tech Stack
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const suggestedTech = ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"];

  // Visibility
  const [visibility, setVisibility] = useState<Visibility>("private");

  // Team Requirements (if discoverable)
  const [roles, setRoles] = useState<{title: string, skills: string[], count: number}[]>([]);
  
  // GitHub
  const [githubConnected, setGithubConnected] = useState(false);

  // Handlers
  const handleNext = () => {
    if (currentStep === 2 && visibility === "private") {
      setCurrentStep(4); // Skip team requirements
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    if (currentStep === 4 && visibility === "private") {
      setCurrentStep(2); // Skip team requirements
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddTech = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
    }
    setTechInput("");
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const handleCreateProject = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard/workspace/new-project");
    }, 800);
  };

  const handleAddRole = (title: string) => {
    if (!roles.find(r => r.title === title)) {
      setRoles([...roles, { title, skills: [], count: 1 }]);
    }
  };

  // Steps Progress Array
  const totalLogicalSteps = visibility === "private" ? 4 : 5;
  const displayStep = currentStep > 2 && visibility === "private" ? currentStep - 1 : currentStep;

  return (
    <div className="flex-1 p-6 md:p-12 bg-white dark:bg-slate-950 min-h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto w-full">
      
      {/* Header & Progress */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">Create a new project</h1>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <span>Step {displayStep} of {totalLogicalSteps}</span>
          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-out" 
              style={{ width: `${(displayStep / totalLogicalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* STEP 1: Project Details */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Project Name</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. E-Commerce Platform"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you're building..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Technology / Stack</label>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map(tech => (
                  <div key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium border border-indigo-100 dark:border-indigo-800/50">
                    {tech}
                    <button onClick={() => handleRemoveTech(tech)} className="hover:text-indigo-900 dark:hover:text-indigo-100 p-0.5">
                      <IconX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech(techInput))}
                  placeholder="Add custom technology..."
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                />
                <Button variant="outline" onClick={() => handleAddTech(techInput)} type="button">Add</Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 py-1.5 mr-1">Suggested:</span>
                {suggestedTech.filter(t => !techStack.includes(t)).map(tech => (
                  <button 
                    key={tech} 
                    onClick={() => handleAddTech(tech)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors border border-transparent"
                  >
                    + {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Visibility */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Who can discover this project?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setVisibility("private")}
                className={cn(
                  "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
                  visibility === "private" 
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 ring-4 ring-indigo-50 dark:ring-indigo-900/20" 
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("p-2 rounded-lg", visibility === "private" ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800")}>
                    <IconLock className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Private</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-12">
                  Only people you invite can access this project. Best for stealth startups or internal tools.
                </p>
                {visibility === "private" && (
                  <div className="absolute top-6 right-6 text-indigo-600 dark:text-indigo-400">
                    <IconCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div 
                onClick={() => setVisibility("discoverable")}
                className={cn(
                  "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
                  visibility === "discoverable" 
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 ring-4 ring-indigo-50 dark:ring-indigo-900/20" 
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("p-2 rounded-lg", visibility === "discoverable" ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800")}>
                    <IconWorld className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Discoverable</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-12">
                  Developers can find this project in the Discover tab and request to join your team.
                </p>
                {visibility === "discoverable" && (
                  <div className="absolute top-6 right-6 text-indigo-600 dark:text-indigo-400">
                    <IconCheck className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Team Requirements */}
        {currentStep === 3 && visibility === "discoverable" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">What developers are you looking for?</h2>
            <p className="text-slate-500 text-sm mb-8">Define roles to help relevant developers find your project.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer"].map(role => (
                <button
                  key={role}
                  onClick={() => handleAddRole(role)}
                  className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:hover:border-indigo-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center text-center"
                >
                  {role}
                </button>
              ))}
            </div>

            {roles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Required Roles:</h3>
                {roles.map((role, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{role.title}</p>
                      <p className="text-xs text-slate-500">Number needed: {role.count}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => {
                        const newRoles = [...roles];
                        newRoles.splice(idx, 1);
                        setRoles(newRoles);
                      }}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {roles.length === 0 && (
              <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-500 text-sm">No specific roles required yet. You can skip this or add roles above.</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: GitHub */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-lg mx-auto text-center mt-8">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <IconBrandGithub className="w-10 h-10 text-slate-700 dark:text-slate-300" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Connect your GitHub repository</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Connect GitHub to bring commits, branches, pull requests, and development activity seamlessly into your project workspace.
            </p>

            {githubConnected ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-800/50 font-medium">
                <IconCheck className="w-5 h-5" />
                GitHub Connected
              </div>
            ) : (
              <Button 
                size="lg" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold mb-4"
                onClick={() => {
                  // Simulate OAuth flow
                  setGithubConnected(true);
                }}
              >
                <IconBrandGithub className="w-5 h-5 mr-2" />
                Connect GitHub
              </Button>
            )}
          </div>
        )}

        {/* STEP 5: Summary */}
        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Review Project Details</h2>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Name</h3>
                  <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{projectName || "Untitled Project"}</p>
                  {description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{description}</p>}
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Visibility</h3>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300">
                    {visibility === "private" ? <IconLock className="w-4 h-4" /> : <IconWorld className="w-4 h-4" />}
                    <span className="capitalize">{visibility}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.length > 0 ? techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-700">
                        {tech}
                      </span>
                    )) : <span className="text-sm text-slate-400">None specified</span>}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GitHub Integration</h3>
                  <div className="flex items-center gap-2 text-sm">
                    {githubConnected ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5"><IconCheck className="w-4 h-4" /> Connected</span>
                    ) : (
                      <span className="text-slate-500">Not connected</span>
                    )}
                  </div>
                </div>

                {visibility === "discoverable" && (
                  <div className="md:col-span-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Team Requirements</h3>
                    {roles.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {roles.map((role, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{role.count} {role.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">No specific roles requested</span>
                    )}
                  </div>
                )}
                
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigation Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          disabled={currentStep === 1 || isSubmitting}
          className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {currentStep < 5 ? (
          <div className="flex items-center gap-3">
            {currentStep === 4 && !githubConnected && (
               <Button variant="ghost" onClick={handleNext} className="text-slate-500">
                 Skip for now
               </Button>
            )}
            <Button 
              onClick={handleNext} 
              disabled={currentStep === 1 && !projectName.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
            >
              Continue
              <IconArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleCreateProject}
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[160px]"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </span>
            ) : (
              "Create Project"
            )}
          </Button>
        )}
      </div>

    </div>
  );
}
