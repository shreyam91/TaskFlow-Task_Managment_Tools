"use client";

import { useState } from "react";
import { 
  IconCheck, 
  IconX, 
  IconUser, 
  IconBrandGithub, 
  IconClock, 
  IconQuote, 
  IconShieldCheck,
  IconEye,
  IconMessage,
  IconUserPlus
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const INITIAL_REQUESTS = [
  {
    id: "req_1",
    developer: {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      github: "github.com/rahul",
      skills: ["React", "Next.js", "TypeScript"],
    },
    project: {
      name: "E-Commerce Platform",
      role: "Frontend Developer",
    },
    message: "I've worked on React and Next.js e-commerce applications and would like to contribute to the checkout and frontend experience.",
    requestedAt: "2 hours ago",
  },
  {
    id: "req_2",
    developer: {
      name: "Alex Johnson",
      role: "Backend Engineer",
      github: "github.com/alexj",
      skills: ["Node.js", "PostgreSQL", "Docker", "Redis"],
    },
    project: {
      name: "AI Research Platform",
      role: "Backend Engineer",
    },
    message: "I have experience scaling vector databases and setting up efficient API gateways for ML models. Would love to help out.",
    requestedAt: "5 hours ago",
  }
];

export default function ProjectRequestsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof INITIAL_REQUESTS[0] | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleOpenAccept = (req: typeof INITIAL_REQUESTS[0]) => {
    setSelectedRequest(req);
    setAcceptModalOpen(true);
  };

  const handleOpenReject = (req: typeof INITIAL_REQUESTS[0]) => {
    setSelectedRequest(req);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const handleConfirmAccept = () => {
    if (selectedRequest) {
      setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    }
    setAcceptModalOpen(false);
    setSelectedRequest(null);
  };

  const handleConfirmReject = () => {
    if (selectedRequest) {
      setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    }
    setRejectModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 relative min-h-[calc(100vh-4rem)] max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <IconUserPlus className="w-8 h-8 text-indigo-500" />
            Project Requests
          </h2>
          <p className="text-slate-500 mt-1">Review developers who want to join your projects.</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {requests.length} Pending
        </Badge>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 border-dashed dark:border-slate-800">
            <IconShieldCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">All caught up!</h3>
            <p className="text-slate-500 mt-1">You have no pending membership requests.</p>
          </div>
        ) : (
          requests.map((req) => (
            <Card key={req.id} className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl">
              <div className="flex flex-col md:flex-row">
                
                {/* Developer Info Side */}
                <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-950">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{req.developer.name}</h3>
                      <p className="text-sm font-medium text-slate-500">{req.developer.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md">
                      <IconClock className="w-3.5 h-3.5" />
                      {req.requestedAt}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {req.developer.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <IconBrandGithub className="w-4 h-4 text-slate-400" />
                      <a href={`https://${req.developer.github}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {req.developer.github}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Request Context Side */}
                <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-900/20">
                  <div className="p-6 flex-1 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Target Project</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                        <span className="font-medium text-slate-900 dark:text-white">{req.project.name}</span>
                        <span className="text-slate-400 mx-1">•</span>
                        <span className="text-sm text-slate-500">as {req.project.role}</span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm relative">
                      <IconQuote className="absolute top-3 right-3 w-5 h-5 text-slate-200 dark:text-slate-800" />
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <IconMessage className="w-3.5 h-3.5" /> Message
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10">
                        "{req.message}"
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-3">
                    <Button variant="ghost" className="text-slate-500">
                      <IconEye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:hover:bg-red-900/20" onClick={() => handleOpenReject(req)}>
                      <IconX className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleOpenAccept(req)}>
                      <IconCheck className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                </div>

              </div>
            </Card>
          ))
        )}
      </div>

      {/* Accept Modal */}
      {acceptModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <IconCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Add {selectedRequest.developer.name.split(" ")[0]} to {selectedRequest.project.name}?
              </h3>
              <p className="text-slate-500 mb-6 text-sm">
                They will be added to the workspace as a <strong className="text-slate-700 dark:text-slate-300">Developer</strong>.
              </p>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Permissions Granted</span>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-emerald-500" /> View project & tasks</li>
                  <li className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-emerald-500" /> Work on assigned tasks</li>
                  <li className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-emerald-500" /> Comment on activity</li>
                  <li className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-emerald-500" /> View team members</li>
                  <li className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-emerald-500" /> GitHub project access</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setAcceptModalOpen(false)}>Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleConfirmAccept}>
                Confirm Addition
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <IconX className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Reject request?
              </h3>
              <p className="text-slate-500 mb-6 text-sm">
                This will decline the request from {selectedRequest.developer.name} to join {selectedRequest.project.name}. 
                Your private workspace information will remain hidden.
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reason (optional)</label>
                <Textarea 
                  placeholder="Provide feedback (e.g., We are currently looking for senior backend engineers.)"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="resize-none h-24"
                />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleConfirmReject}>
                Reject Request
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
