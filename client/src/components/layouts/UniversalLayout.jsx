import { CopyrightIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "../ui/sonner"
import { useEffect, useState } from "react"
import UserStore from "@/stores/UserStore"
import OtherStore from "@/stores/OtherStore"
import PublicLayout from "./PublicLayout"

const UniversalLayout = ({ children }) => {

    const {sidebarState} = UserStore()
    const {getInitialData} = OtherStore()
    const location = useLocation()
    const isDashboard = (location.pathname.includes("admin") || location.pathname.includes("user"))

    useEffect(() => {
        (async () => {
            await getInitialData()
        })()
    }, [])
    

    return (
        <div className="w-full h-auto block">

            {
                !isDashboard ?
                <PublicLayout>
                    {children}
                </PublicLayout>
                : children
            }

            <div className={`w-full md:px-2 bg-sidebar${(sidebarState && isDashboard) ? " md:pl-[16rem] rounded-xl" : ""}`}>
                <div className="py-5 md:rounded-xl flex gap-3 justify-center items-center bg-muted font-medium">
                    <span><CopyrightIcon /></span> Copyright 2025 <NavLink to={"/"} className={cn(buttonVariants({ size: "icon", variant: "link" }), "text-base mx-1")}>UNIAPP.</NavLink> All rights reserved.
                </div>
            </div>

            <Toaster 
                expand={true}
                position="top-center"
                richColors
                visibleToasts={5}
                closeButton={true}
            />
        </div>
    )
}

export default UniversalLayout