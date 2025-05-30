import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ThemeSwitcher/ThemeProvider"

export default function ThemeSwitcher() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-0 text-xl bg-transparent hover:bg-transparent">
                    <Sun className="!h-[2rem] !w-[2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white" />
                    <Moon className="absolute !h-[2rem] !w-[2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[1001]">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
