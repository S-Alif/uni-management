import { publicRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { create } from "zustand"

const UserStore = create((set) => ({
    user: null,
    accessToken: null,
    sidebarState: true,
    loadingState: true,
    setUser: (user) => {
        set((state) => ({
            user: user,
            loadingState: false
        }))
        localStorage.setItem("actor", JSON.stringify(user))
    },
    setAccessToken: (accessToken) => set((state) => ({
        accessToken: accessToken
    })),
    setSidebarState: (openState) => set((state) => ({
        sidebarState: openState
    })),
    logout: async () => {
        set((state) => ({
            user: null,
            accessToken: null
        }))
        localStorage.clear()
        await apiHandler({url: publicRoutes.logout.url, method: publicRoutes.logout.method}, {}, true)
    }
}))

export default UserStore