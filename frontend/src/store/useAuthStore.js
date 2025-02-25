import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const response = axiosInstance.get("/auth/check")

            set({authUser:response.data})
        } 
        catch (error) {
            console.log("Error in checkAuth", error.message)
            set({authUser:null})
            
        } 
        finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async(data) => {

    } 
}))