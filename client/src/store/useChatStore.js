import { create } from "zustand";
import toast from "react-hot-toast";
import { Server } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  isUserLoading: false,
  selectedUser: null,
  isMessagesLoading: false,

  getUsers: async (id) => {
    try {
      const res = await Server.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await Server.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
