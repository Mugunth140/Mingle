import {create} from 'zustand'
import { Server } from '../lib/axios'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignup: false,
    isLogin: false,
    isUpdatingProfile: false,
    isChecking : true,

    AuthCheck : async () => {
        try {
            const res = await Server.get('/auth/check');
            set({authUser: res.data.user})
        } catch (error) {
            console.error("Error in AuthCheck:", error);
            set({authUser:null})
        } finally {
            set({isChecking:false})
        }
    }
}))