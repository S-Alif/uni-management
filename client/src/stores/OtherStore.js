import { create } from "zustand"

const OtherStore = create((set) => ({
    dept: [],
    faculty: [],
    setState: (stateName, value) => set((state) => ({
        [stateName]: value
    })),
}))

export default OtherStore