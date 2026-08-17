DevDesk — Developer Project Collaboration SaaS

DevDesk is a multi-tenant SaaS platform designed to connect developers and project owners in a shared software development environment. Developers can discover projects, request to join teams, manage their assigned work, and connect their GitHub workflow, while project owners can create projects, build development teams, manage project work, and monitor development progress.

Unlike a traditional task-management application, DevDesk is designed around the concept of a project workspace, where project planning, team collaboration, task execution, GitHub activity, and project analytics are connected within a single environment.

Core Concept

DevDesk has two primary user experiences:

1. Developer

Developers can:

Create a developer profile
Discover available projects
Search projects by technology, role, and project type
View public project information
Request to join projects
Participate in multiple project workspaces
View and manage assigned tasks
Collaborate with other developers
Connect GitHub
Track relevant GitHub activity
Monitor their work across multiple projects
2. Project Owner

Project owners can:

Create software projects
Automatically create a dedicated workspace for each project
Define project details and technology stack
Make projects private or discoverable
Specify developers/skills required
Review developer join requests
Build project teams
Assign tasks
Monitor project progress
Connect GitHub repositories
Track commits and pull requests
View project analytics
Monitor project activity

A user is not permanently restricted to one role.

For example:

Mohit


E-Commerce Platform → Owner


AI Research Platform → Developer

This allows the same user to create their own project while also contributing to someone else's project.

Project Architecture

The core hierarchy of the platform is:

User
 │
 ├── Developer Profile
 │
 ├── Owned Workspaces
 │
 └── Workspace Memberships
          │
          ├── Workspace A
          │     ├── Tasks
          │     ├── Team
          │     ├── GitHub
          │     ├── Analytics
          │     └── Activity
          │
          └── Workspace B
                ├── Tasks
                ├── Team
                ├── GitHub
                ├── Analytics
                └── Activity

Each project represents an isolated workspace.

For example:

E-Commerce Platform
        │
        ├── Owner
        ├── Developers
        ├── Tasks
        ├── GitHub Repository
        ├── Project Activity
        └── Analytics

This workspace-centric architecture is one of the major differences between DevDesk and a basic task manager.

Multi-Tenancy

DevDesk is designed as a multi-tenant SaaS application.

Each project workspace acts as an isolated tenant boundary.

A user can belong to multiple workspaces:

User
 │
 ├── Workspace A → OWNER
 │
 ├── Workspace B → DEVELOPER
 │
 └── Workspace C → VIEWER

Workspace-specific data is scoped using the workspace/tenant ID.

For example:

tasks.workspace_id
members.workspace_id
activities.workspace_id
github_connections.workspace_id

This prevents users from accessing project data outside their authorized workspaces.

The architecture supports:

Multiple users
Multiple workspaces
Multiple projects
Workspace-level isolation
Workspace-specific members
Workspace-specific permissions
Workspace-specific GitHub integrations
Role-Based Access Control

DevDesk uses workspace-level RBAC rather than relying only on the user's global account type.

Workspace Owner

Can:

Update project information
Manage workspace settings
Invite developers
Review join requests
Remove members
Manage tasks
Connect GitHub
Manage project integrations
View analytics
Developer

Can:

Access assigned workspaces
View project information
Work on assigned tasks
Update task status
Comment
View team members
View project activity
Access GitHub-related project information
Viewer

Can:

View project
View tasks
View team
View activity
View project information

This allows a user to have different permissions in different workspaces.

Main Dashboard

The main dashboard is personalized to the current user and aggregates information across their accessible projects.

It answers:

"What is happening with my work?"

It contains:

Personal Metrics
Active Projects
My Open Tasks
Due Today
Overdue Tasks
Needs Attention

Displays only items requiring action from the user:

Overdue tasks
Tasks due soon
Pull requests waiting for review
Blocked tasks
Relevant project notifications
My Active Work

Shows projects where the user currently has active work.

Example:

E-Commerce Platform
4 tasks assigned
2 In Progress
2 To Do


18 / 24 project tasks completed
Recent Activity

Aggregates relevant activity from the user's workspaces:

Tasks completed
Tasks assigned
PRs opened
PRs merged
Comments
Team changes
Workspace Dashboard

The workspace dashboard is different from the personal dashboard.

The personal dashboard answers:

"What am I working on?"

The workspace dashboard answers:

"What is happening with this project?"

It provides an overview of the entire project.

Project Overview

Displays:

Project name
Description
Owner
Team size
Project status
Deadline
Technology stack
Project Progress

Example:

24 Total Tasks


13 Completed
3 In Progress
2 In Review
1 Blocked
5 To Do


Progress: 54%

The progress is calculated from actual task data.

Needs Attention

Displays project-level issues:

Overdue tasks
Blocked tasks
Pending PR reviews
Approaching deadlines
Active Work

Shows currently active tasks and their assigned developers.

Team Overview

Displays:

Team members
Workspace roles
Assigned task count
Current activity
GitHub Overview

Displays:

Repository
Recent commits
Open pull requests
Recently updated branches
GitHub activity
Recent Activity

Aggregates project events into a chronological feed.

Task Management

Task management remains an important part of DevDesk, but it is not the entire product.

Tasks belong to a workspace.

A task can contain:

Title
Description
Status
Priority
Assignee
Creator
Due date
Labels
Comments
Attachments
GitHub references
Created/updated timestamps

Example workflow:

Todo
 ↓
In Progress
 ↓
In Review
 ↓
Completed

Tasks can also become:

Blocked

when work cannot proceed.

GitHub Integration

One of the main technical features of DevDesk is its GitHub integration.

A project owner can connect a GitHub repository to a workspace.

DevDesk can then surface relevant development activity such as:

Commits
Branches
Pull requests
PR status
PR reviews
Merges

For example:

Task #42
Implement payment gateway


        ↓


Branch
feature/payment-gateway


        ↓


Commits
7 commits


        ↓


Pull Request
#142


        ↓


Status
Awaiting Review

This creates a relationship between project management and actual development activity.

The system should rely on observable GitHub events rather than making unsupported assumptions about development progress.

For example, DevDesk can show:

"7 commits associated with this task."

It should not claim:

"The task is 73% implemented because there are 7 commits."

That distinction keeps the product realistic.

Project Discovery

DevDesk also works as a project discovery platform.

Developers can search for projects based on:

Project name
Technology
Developer role
Project type
Activity
Skills required

Example:

Search:
React E-commerce


Filters:


React
Next.js
TypeScript


Role:
Frontend Developer

Results show public/discoverable projects.

Each project has a public project overview containing information such as:

Description
Technology stack
Owner
Team size
Required roles
Project activity
Public information

Private workspace data remains inaccessible.

Developer Join Request System

A developer can request to join a discoverable project.

Example:

Developer:
Rahul Sharma


Role:
Frontend Developer


Skills:
React
Next.js
TypeScript


Message:
"I'd like to contribute to the checkout experience..."

The project owner can:

Accept
Reject
View Profile

If accepted:

Developer
      ↓
Workspace Member
      ↓
Developer Role

This creates a controlled project membership workflow instead of allowing anyone to directly access a project.

Developer Profiles

Developers have profiles that help project owners evaluate potential team members.

Profile information can include:

Name
Profile image
Bio
Skills
GitHub account
Portfolio
Project experience
Availability

Example:

Mohit Sharma
Full Stack Developer


React
Next.js
TypeScript
Node.js
PostgreSQL


GitHub connected


Projects:
E-Commerce Platform
AI Research Platform

The profile is intentionally focused on project collaboration, rather than becoming a social network.

Project Creation

Project owners can create projects through a guided flow.

Project Details
Project name
Description
Technology stack
Visibility
Private

Only invited members can access the project.

or:

Discoverable

Developers can find the project and request to join.

Team Requirements

Project owners can specify:

Frontend Developer
Backend Developer
Full Stack Developer
UI/UX Designer

and required technologies.

GitHub

The project owner can optionally connect a GitHub repository during project creation or later.

Once created:

Project
   ↓
Workspace
   ↓
Owner Dashboard
Analytics

Analytics are workspace-specific rather than generic SaaS analytics.

The analytics section can provide:

Task Analytics
Completed tasks
Open tasks
Overdue tasks
Blocked tasks
Completion trends
Task cycle time
Team Analytics
Workload distribution
Assigned tasks
Completed tasks
Active contributors
GitHub Analytics
Commits
Pull requests
Merged PRs
PR activity
Repository activity

The main workspace dashboard only shows a summary.

Detailed analytics are available on the dedicated Analytics page.

Activity System

DevDesk maintains project activity at the workspace level.

Activity can include:

Task created
Task assigned
Task completed
Task blocked
Comment added
Developer joined
Developer removed
PR opened
PR merged
Commit pushed
GitHub connected
Project updated

Example:

Rahul merged PR #42
Payment gateway


10 minutes ago

This gives project owners and developers a shared view of what has actually happened.

Chat / Communication

Chat is an optional collaboration layer.

The system can provide communication between:

Developer
Project Owner
Project Team

Potential scopes:

Direct message
Project conversation
Task discussion

However, chat should not become the core product.

The core workflow remains:

Project
→ Workspace
→ Team
→ Tasks
→ GitHub
→ Progress
Database Structure

A scalable relational database design could include:

users
user_profiles
workspaces
workspace_members
projects

If project and workspace are treated as the same entity, these can be represented by one table rather than duplicating them.

tasks
task_comments
task_labels
task_assignees
join_requests
github_connections
github_repositories
github_events
activities
notifications
messages
conversations

Potential relationships:

User
 │
 ├── UserProfile
 │
 ├── WorkspaceMembership
 │       │
 │       └── Workspace
 │              ├── Tasks
 │              ├── Members
 │              ├── GitHub
 │              ├── Activities
 │              └── Analytics
 │
 └── OwnedWorkspaces
Multi-Tenant Data Isolation

Every workspace-scoped resource should contain a workspace identifier where appropriate.

For example:

tasks
----------------
id
workspace_id
title
description
status
priority
assignee_id
created_by
due_date
created_at
updated_at

This allows queries such as:

Get tasks
WHERE workspace_id = currentWorkspace

Authorization should additionally verify that:

currentUser
      ↓
is a member of
      ↓
workspace

This prevents cross-tenant data access.

System Design

A high-level architecture could look like:

                   CLIENT
                     │
                     ↓
              Frontend Application
                     │
                     ↓
                API Layer
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     Auth        Workspace      Tasks
     Service      Service       Service
        │            │            │
        └────────────┼────────────┘
                     ↓
               PostgreSQL
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     GitHub       Activity    Notifications
   Integration     Service       Service
        │
        ↓
     GitHub API

Depending on implementation, background jobs can process:

GitHub webhook events
Notifications
Activity generation
Analytics aggregation
Authentication

Authentication should support:

Email/password
OAuth
GitHub OAuth

GitHub OAuth is particularly useful because developers can connect their GitHub identity and repositories.

Authentication and authorization should remain separate concepts:

Authentication
=
Who are you?


Authorization
=
What can you access?
Important Security Model

DevDesk should enforce authorization at the backend.

Never rely solely on frontend route protection.

For example, a user should not be able to access:

/workspaces/another-project/tasks

simply by changing the workspace ID in the URL.

Backend authorization should verify:

User
 ↓
Workspace membership
 ↓
Workspace role
 ↓
Resource permission

before returning data.

Notifications

Notifications can be triggered by meaningful events:

Task assigned
Task mentioned
Task due soon
Task overdue
PR review requested
Join request accepted
Join request rejected
Developer joins project
Comment added
Project invitation

Avoid notifying users for every minor activity.

What Makes DevDesk Different From Your Original Task Manager

This is the most important part when explaining the project to recruiters.

Traditional Task Manager
Users
 ↓
Tasks
 ↓
Projects
DevDesk
Users
 ↓
Project Discovery
 ↓
Project
 ↓
Workspace
 ↓
Team
 ↓
Tasks
 ↓
GitHub
 ↓
Development Activity
 ↓
Analytics

The task system is now one component inside a broader developer collaboration platform.

Major Features
SaaS & Architecture
Multi-tenant workspace architecture
Workspace-level data isolation
Role-based access control
Multiple workspace membership
Workspace-specific permissions
Scalable relational data model
Developer Features
Developer profiles
Project discovery
Technology-based search
Join requests
Task management
GitHub integration
Personal work dashboard
Project Owner Features
Project creation
Workspace management
Team building
Developer requests
Task management
GitHub repository connection
Project analytics
Project activity monitoring
Collaboration
Team members
Comments
Activity feed
Notifications
Optional messaging
GitHub
Repository connection
Commit tracking
Branch activity
Pull requests
PR status
GitHub events
Task/GitHub association
Resume Description

For the actual resume, I would not put all of the above. Use something like this:

DevDesk — Multi-Tenant Developer Collaboration SaaS

Developer collaboration platform connecting project owners and developers through isolated project workspaces, task management, project discovery, and GitHub-integrated development workflows.

Designed a multi-tenant workspace architecture allowing users to own or participate in multiple project workspaces with workspace-level data isolation and RBAC.
Built separate Developer and Project Owner experiences, including project discovery, developer join requests, project creation, team management, and personalized dashboards.
Developed workspace-based project management with task assignment, priorities, statuses, deadlines, comments, project activity, and progress tracking.
Integrated GitHub to connect repositories with workspaces and surface commits, branches, pull requests, reviews, and merge activity alongside project tasks.
Implemented project discovery with technology/role-based filtering, developer profiles, and controlled join-request workflows.
Designed backend authorization around workspace membership + role-based permissions, preventing unauthorized access to private project data across tenants.
Built project analytics and activity tracking to provide visibility into task progress, team workload, and development activity.
Strongest Resume Keywords

If you're targeting frontend/full-stack roles, the project naturally gives you strong keywords such as:

Frontend

React · Next.js · TypeScript · Tailwind CSS · React Query · Zustand

Backend

Node.js · Express/NestJS · REST API · PostgreSQL

Architecture

Multi-tenancy · RBAC · SaaS Architecture · Workspace Isolation · Authorization

Integrations

GitHub OAuth · GitHub API · Webhooks

Engineering

Authentication · Authorization · Database Design · API Design · Caching · Background Jobs · Notifications

The strongest way to describe the project in an interview

If a recruiter asks "What is DevDesk?", don't say:

"It's a task management app."

Say:

"DevDesk is a multi-tenant developer collaboration SaaS where each software project gets its own workspace. Developers can discover projects and join teams, while project owners can create projects and manage those teams. The workspace connects task management with GitHub activity, so the team can see both project work and actual development activity in one place."

That one explanation communicates much more engineering depth than simply calling it a task manager.