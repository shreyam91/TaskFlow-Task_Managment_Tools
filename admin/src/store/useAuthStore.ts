import { create } from "zustand";

export type Role = "SUPER_ADMIN" | "COMPANY_ADMIN" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// For demo purposes, we'll initialize with a SUPER_ADMIN.
// In a real app, this would be null until authentication succeeds.
export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "SUPER_ADMIN",
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
