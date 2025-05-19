import { BookOpen, BookType, Box, Boxes, CalendarClock, ClipboardType, Codesandbox, FileUser, Grid2x2Plus, LayoutDashboard, Plus, SquareLibrary, SquareUser, UserCircle2, UserRoundCog, Users, Watch } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "../ui/sidebar"
import { NavLink } from "react-router"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"
import DisplayLogo from "../DisplayLogo"

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
            {
                label: "Time slot",
                to: "/admin/time-slot",
                icon: <Watch />
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
                label: "Notices",
                to: "/admin/notices",
                icon: <ClipboardType size={48} />
            },
        ]
    },
    {
        groupLabel: "Management", // academics routes
        role: 2025,
        icon: <Users size={50} />,
        links: [
            {
                label: "Students",
                to: "/admin/students",
                icon: <SquareUser size={48} />
            },
            {
                label: "Teachers",
                to: "/admin/teachers",
                icon: <FileUser size={48} />
            },
        ]
    },
    {
        groupLabel: "Administration",
        role: 1999,
        icon: <UserRoundCog size={50} />,
        links: [
            {
                label: "Dashboard",
                to: "/dashboard/student",
                icon: <LayoutDashboard size={48} />
            },
            {
                label: "Classmates",
                to: "/dashboard/student/classmates",
                icon: <Users size={48} />
            },
        ]
    },
    {
        groupLabel: "Academics",
        role: 1999,
        icon: <SquareLibrary size={50} />,
        links: [
            {
                label: "Schedules",
                to: "/dashboard/student/schedules",
                icon: <CalendarClock size={48} />
            },
            {
                label: "Materials",
                to: "/dashboard/student/materials",
                icon: <ClipboardType size={48} />
            },
        ]
    },
    {
        groupLabel: "Account",
        role: 1999,
        icon: <UserRoundCog size={50} />,
        links: [
            {
                label: "Profile",
                to: "/dashboard/student/profile",
                icon: <UserCircle2 size={48} />
            },
        ]
    },
    {
        groupLabel: "Administration",
        role: 2022,
        icon: <UserRoundCog size={50} />,
        links: [
            {
                label: "Dashboard",
                to: "/dashboard/teacher",
                icon: <UserCircle2 size={48} />
            },
        ]
    },
    {
        groupLabel: "Academics",
        role: 2022,
        icon: <SquareLibrary size={50} />,
        links: [
            {
                label: "Schedules",
                to: "/dashboard/teacher/schedules",
                icon: <CalendarClock size={48} />
            },
            {
                label: "Materials",
                to: "/dashboard/teacher/materials",
                icon: <ClipboardType size={48} />
            },
        ]
    },
    {
        groupLabel: "Account",
        role: 2022,
        icon: <UserRoundCog size={50} />,
        links: [
            {
                label: "Profile",
                to: "/dashboard/teacher/profile",
                icon: <UserCircle2 size={48} />
            },
        ]
    },
]

const SideBarNav = ({userRole = null}) => {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <div className="my-5">
                    <DisplayLogo />
                </div>
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