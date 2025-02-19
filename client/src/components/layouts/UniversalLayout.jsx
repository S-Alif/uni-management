import { CopyrightIcon } from "lucide-react"
import { NavLink } from "react-router"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "../ui/sonner"

const UniversalLayout = ({ children }) => {
    return (
        <div className="w-full h-auto block">

            {children}

            <div className="w-full py-8 flex gap-3 justify-center items-center bg-muted font-medium">
                <span><CopyrightIcon /></span> Copyright 2025 <NavLink to={"/"} className={cn(buttonVariants({ size: "icon", variant: "link" }), "text-base mx-1")}>UNIAPP.</NavLink> All rights reserved.
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