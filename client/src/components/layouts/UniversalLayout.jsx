import { CopyrightIcon } from "lucide-react"
import { NavLink } from "react-router"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "../ui/sonner"
import { useState } from "react"
import UserStore from "@/stores/UserStore"

const UniversalLayout = ({ children }) => {

    const {sidebarState} = UserStore()

    return (
        <div className="w-full h-auto block">

            {children}

            <div className={`w-full md:pb-2 md:px-2 rounded-xl bg-sidebar${sidebarState ? " md:pl-[16rem]" : ""}`}>
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