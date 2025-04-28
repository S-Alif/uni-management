import { CopyrightIcon } from "lucide-react"
import { NavLink, Outlet, useLocation } from "react-router"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "../ui/sonner"
import { useEffect, useState } from "react"
import UserStore from "@/stores/UserStore"
import OtherStore from "@/stores/OtherStore"
import PublicLayout from "./PublicLayout"

const UniversalLayout = ({ children = null }) => {

    const {sidebarState} = UserStore()
    const {getInitialData} = OtherStore()
    const location = useLocation()
    const pathname = location.pathname
    const isDashboard = ((pathname.includes("admin") || pathname.includes("dashboard")) && !pathname.includes("admin/register"))

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
                    {children ? children : <Outlet />}
                </PublicLayout>
                : children ? children : <Outlet />
            }

            <div className={`w-full bg-sidebar ${(sidebarState && isDashboard) ? "md:pl-[16rem] px-2 pb-2" : ""}`}>
                <div className={`py-5 flex gap-3 justify-center items-center ${(sidebarState && isDashboard) ? "rounded-xl" : ""} bg-primary/65 font-medium`}>
                    <span><CopyrightIcon /></span> Copyright 2025 <NavLink to={"/"} className={cn(buttonVariants({ size: "icon", variant: "link" }), "text-base mx-1 text-white")}>Helix.U</NavLink> All rights reserved.
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