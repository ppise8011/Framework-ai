import { create } from "zustand";
import { authService } from "@/services/auth.service";
import { SignupData, User } from "@/types/user.types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isInitialized: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authService.login({ email, password });

      localStorage.setItem("framework_token", data.token);
      localStorage.setItem("framework_user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      const data = await authService.signup(formData);

      localStorage.setItem("framework_token", data.token);
      localStorage.setItem("framework_user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("framework_token");
    localStorage.removeItem("framework_user");
    set({ user: null, token: null });
    window.location.href = "/login";
  },

  loadUser: async () => {
    try {
      const token = localStorage.getItem("framework_token");
      if (!token) {
        set({ isInitialized: true });
        return;
      }

      const user = await authService.getMe();
      set({ user, token, isInitialized: true });
    } catch {
      localStorage.removeItem("framework_token");
      localStorage.removeItem("framework_user");
      set({ user: null, token: null, isInitialized: true });
    }
  },

  updateUser: (user) => {
    localStorage.setItem("framework_user", JSON.stringify(user));
    set({ user });
  },
}));
