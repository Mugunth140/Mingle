import { create } from "zustand";
import { Server } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const server_url = import.meta.env.VITE_SERVER_URL;
const SOCKET_URL = `wss://${server_url.slice(8)}`;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignup: false,
    isLogin: false,
    isUpdatingProfile: false,
    isChecking: true,
    onlineUsers: [],
    socket:null,

    authCheck: async () => {
        try {
            const res = await Server.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
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
            get().connectSocket();
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSignup: false });
        }
    },

    login: async (data) => {
        set({ isLogin: true }); // Key updated for consistency
        try {
            const res = await Server.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("loggedin successfully");
            get().connectSocket();
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLogin: false });
        }
    },

    logout: async () => {
      try {
            await Server.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await Server.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.response.data.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io('http://localhost:8080', {
          query: {
            userId: authUser._id,
          },
          transports: ["websocket"],
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
}));
