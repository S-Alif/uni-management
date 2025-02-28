import { create } from "zustand"

const UserStore = create((set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set((state) => ({
        user: user
    })),
    setAccessToken: (accessToken) => set((state) => ({
        accessToken: accessToken
    }))
}))

export default UserStore