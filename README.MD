# 🗂️ Task Management System

A modern, full-stack Task Management System designed to help teams seamlessly create, track, and collaborate on projects. Built with a beautiful glassmorphic frontend and a robust API backend.

---

## ✨ Features

- **Beautiful UI/UX**: Premium glassmorphic design built with Tailwind CSS and Radix UI primitives.
- **Global Search (Spotlight)**: Press `Cmd+K` or `Ctrl+K` for instant, global navigation across projects and settings.
- **Interactive Dashboard**: Track tasks, deadlines, and project statuses at a glance.
- **Task Management**: Create, assign, prioritize, and track tasks (To Do, In Progress, Completed).
- **Authentication**: Secure JWT-based user login and registration.
- **Role-based Access**: Differentiated permissions for Admins and standard Users.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (with beautiful glassmorphism effects)
- **UI Components**: shadcn/ui & Radix UI
- **Icons**: Tabler Icons & Lucide React

### Backend (`/backend`)
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Environment**: dotenv

---

## 📁 Project Structure

The repository is structured as a monorepo containing both the frontend and backend applications:

```
task-manager/
├── frontend/             # Next.js application
│   ├── app/              # App router pages (dashboard, settings, etc.)
│   ├── components/       # Global UI components (e.g., Spotlight Search)
│   ├── features/         # Feature-specific components (e.g., Tasks table)
│   └── lib/              # Utility functions
│
├── backend/              # Node.js/Express API
│   ├── controllers/      # Route logic
│   ├── models/           # Mongoose DB schemas
│   ├── routes/           # Express route definitions
│   └── middlewares/      # Auth & error handling
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

### 1. Setup the Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the backend directory:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm run dev
```

### 2. Setup the Frontend
Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 🚦 Core API Endpoints (Backend)

| Method | Endpoint            | Description                 | Auth |
|--------|---------------------|-----------------------------|------|
| POST   | `/api/auth/signup`  | Register a new user         | ❌   |
| POST   | `/api/auth/login`   | Login user & return token   | ❌   |
| GET    | `/api/tasks`        | Get all tasks               | ✅   |
| POST   | `/api/tasks`        | Create a new task           | ✅   |
| PATCH  | `/api/tasks/:id`    | Update task details         | ✅   |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork this repository and submit a pull request.