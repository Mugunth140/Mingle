import { create } from "zustand";
import { Server } from "../lib/axios";
import { toast } from "react-toastify";
import { logout } from "../../../server/src/controllers/auth.controller";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignup: false,
    isLogin: false,
    isUpdatingProfile: false,
    isChecking: true,

    AuthCheck: async () => {
        try {
            const res = await Server.get("/auth/check");
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("Error in AuthCheck:", error);
            set({ authUser: null });
        } finally {
            set({ isChecking: false });
        }
    },

    signup: async (data) => {
        set({ isSignup: true }); // Key updated for consistency
        try {
            const res = await Server.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSignup: false });
        }
    },

    logout: async () => {
      try {
            await Server.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed");
        }
    }
}));
