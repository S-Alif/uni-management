import { GET, publicRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { create } from "zustand"

const OtherStore = create((set) => ({
    department: [],
    faculty: [],
    setState: (stateName, value) => set(() => ({
        [stateName]: value
    })),
    // get initial data
    getInitialData: async () => {
        const [dept, faculty] = await Promise.all([
            apiHandler(publicRoutes.department, {}, false),
            apiHandler(publicRoutes.faculty, {}, false),
        ])
        set((state) => ({
            department: dept ? dept : [],
            faculty: faculty ? faculty : []
        }))
    }
}))

export default OtherStore