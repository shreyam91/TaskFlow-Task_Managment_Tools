"use client";

import { useState } from "react";
import { 
  IconMapPin, 
  IconBrandGithub, 
  IconPencil, 
  IconCheck, 
  IconBriefcase, 
  IconGitCommit, 
  IconCode, 
  IconFolders,
  IconCircleCheckFilled
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

// Mock Data
const MOCK_DEVELOPER = {
  name: "Mohit Sharma",
  role: "Full Stack Developer",
  location: "India",
  github: "mohitsharma",
  avatar: "",
  bio: "Full-stack developer focused on building scalable web applications with React, Node.js and PostgreSQL. Passionate about clean architecture, performance optimization, and open-source contribution.",
  isAvailable: true,
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS", "GraphQL"
  ],
  githubStats: {
    connected: true,
    repositories: 42,
    contributions: 1284,
    topLanguage: "TypeScript"
  },
  projects: [
    {
      id: "ecommerce",
      name: "E-Commerce Platform",
      role: "Developer",
      status: "Active",
      color: "bg-purple-500",
    },
    {
      id: "ai-research",
      name: "AI Research Platform",
      role: "Frontend Developer",
      status: "Completed",
      color: "bg-emerald-500",
    }
  ]
};

export default function DeveloperProfilePage() {
  const [dev] = useState(MOCK_DEVELOPER);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 relative min-h-[calc(100vh-4rem)] max-w-6xl mx-auto">
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      
      {/* HEADER */}
      <div className="relative z-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="w-24 h-24 border-4 border-slate-50 dark:border-slate-900 shadow-md">
            <AvatarImage alt={dev.name} src={dev.avatar} />
            <AvatarFallback className="text-3xl font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              {dev.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {dev.name}
            </h1>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
              {dev.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <IconMapPin className="w-4 h-4" />
                {dev.location}
              </span>
              <span className="flex items-center gap-1.5">
                <IconBrandGithub className="w-4 h-4" />
                @{dev.github}
              </span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="shrink-0 rounded-full">
          <IconPencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* ABOUT */}
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconBriefcase className="w-5 h-5 text-indigo-500" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {dev.bio}
              </p>
            </CardContent>
          </Card>

          {/* PROJECT EXPERIENCE */}
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconFolders className="w-5 h-5 text-indigo-500" />
                Project Experience
              </CardTitle>
              <CardDescription>Projects currently or previously involved in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dev.projects.map(project => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-sm ${project.color}`}>
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{project.name}</h4>
                      <p className="text-sm text-slate-500">{project.role}</p>
                    </div>
                  </div>
                  <Badge variant={project.status === "Active" ? "default" : "secondary"} className={project.status === "Active" ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" : ""}>
                    {project.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="space-y-6">
          
          {/* AVAILABILITY */}
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className={`h-1.5 w-full ${dev.isAvailable ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {dev.isAvailable ? (
                  <>
                    <IconCircleCheckFilled className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Available</h4>
                      <p className="text-sm text-slate-500">Open to new projects</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Unavailable</h4>
                      <p className="text-sm text-slate-500">Not open to new projects</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SKILLS */}
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconCode className="w-5 h-5 text-indigo-500" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dev.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GITHUB INTEGRATION */}
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBrandGithub className="w-5 h-5 text-slate-900 dark:text-white" />
                  GitHub
                </div>
                {dev.githubStats.connected && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    <IconCheck className="w-3 h-3" /> Connected
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            {dev.githubStats.connected && (
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-500">Username</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">@{dev.github}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{dev.githubStats.repositories}</div>
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <IconFolders className="w-3.5 h-3.5" /> Repositories
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{dev.githubStats.contributions}</div>
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <IconGitCommit className="w-3.5 h-3.5" /> Contributions
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">Top Language</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    {dev.githubStats.topLanguage}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

        </div>
      </div>
    </div>
  );
}
