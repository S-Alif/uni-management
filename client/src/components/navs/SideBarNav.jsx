import { BookOpen, BookType, Box, Boxes, CalendarClock, ClipboardType, Grid2x2Plus, LayoutDashboard, Plus, SquareLibrary, UserRoundCog } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "../ui/sidebar"
import { NavLink } from "react-router"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"
import logo from "../../assets/images/logo.png"

// side bar items
const items = [
    {
        groupLabel: "Administration", // administration routes
        role: 2025,
        icon: <UserRoundCog />,
        links: [
            {
                label: "Dashboard",
                to: "/admin/dashboard",
                icon: <LayoutDashboard />
            },
            {
                label: "Batch",
                to: "/admin/batch",
                icon: <Boxes />
            },
            {
                label: "Faculty",
                to: "/admin/faculty",
                icon: <Grid2x2Plus />
            },
            {
                label: "Department",
                to: "/admin/department",
                icon: <Box />
            },
            {
                label: "Semesters",
                to: "/admin/semesters",
                icon: <BookOpen />
            },
        ]
    },
    {
        groupLabel: "Academics", // academics routes
        role: 2025,
        icon: <SquareLibrary size={50} />,
        links: [
            {
                label: "Courses",
                to: "/admin/courses",
                icon: <BookType size={48} />
            },
            {
                label: "Schedules",
                to: "/admin/schedules",
                icon: <CalendarClock />
            },
            {
                label: "Notices",
                to: "/admin/notices",
                icon: <ClipboardType />
            },
        ]
    },
]

const SideBarNav = ({userRole = null}) => {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <NavLink to={"/"} className={"mb-6 mt-3"}>
                    <img src={logo} alt="Uni Management" className="w-auto h-11" />
                </NavLink>
            </SidebarHeader>
            <SidebarContent>
                {
                    items.map(({groupLabel, role, icon, links}, index) => {
                        return role == userRole && (
                            <Collapsible defaultOpen className="group/collapsible" key={index}>
                                <SidebarGroup>

                                    <SidebarGroupLabel 
                                        asChild
                                        className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[state=open]/collapsible:mb-3"
                                    >
                                        <CollapsibleTrigger className="flex gap-4">
                                            { icon }<span>{groupLabel}</span>
                                            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-45" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>

                                    <CollapsibleContent>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                {links.map(({label, to, icon}, linkIndex) => (
                                                    <SidebarMenuItem key={linkIndex}>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink to={to} className={"!text-base flex gap-4"}>
                                                                {icon} <span>{label}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </CollapsibleContent>

                                </SidebarGroup>
                            </Collapsible>
                        )
                    })
                }
            </SidebarContent>
            {/* <SidebarRail /> */}
        </Sidebar>
    )
}

export default SideBarNav