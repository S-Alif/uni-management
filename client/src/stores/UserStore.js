import { create } from "zustand"

const UserStore = create((set) => ({
    user: null,
    accessToken: null,
    sidebarState: true,
    setUser: (user) => set((state) => ({
        user: user
    })),
    setAccessToken: (accessToken) => set((state) => ({
        accessToken: accessToken
    })),
    setSidebarState: (openState) => set((state) => ({
        sidebarState: openState
    })),
}))

export default UserStore