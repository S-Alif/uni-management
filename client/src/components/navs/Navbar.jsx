import { NavLink, useLocation } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import DisplayLogo from "../DisplayLogo"
import DisplayAvatar from "../DisplayAvatar"
import UserStore from "@/stores/UserStore"
import ThemeSwitcher from "../ThemeSwitcher"
import { BookA, Building2, Home } from "lucide-react"


const Navbar = () => {

    const location = useLocation()
    const pathname = location.pathname

    const { user, logout } = UserStore()

    const avatarOptions = {
        2025: "/admin/dashboard",
        2022: "/dashboard/teacher/profile",
        1999: "/dashboard/student/profile",
    }

    // nav items
    const navItems = [
        {
            label: "home",
            to: "/",
            icon: <Home size={22} />,
        },
        {
            label: "about us",
            to: "/about-us",
            icon: <Building2 size={22} />,
        },
        {
            label: "academics",
            to: "/academics",
            icon: <BookA size={22} />,
            dropdowns: [
                {
                    label: "faculty and department",
                    to: "/faculty-and-department"
                },
                {
                    label: "Courses",
                    to: "/courses"
                },
                {
                    label: "Faculty members",
                    to: "/teachers"
                },
            ]
        },
    ]

    return(
        <nav className="w-full sticky top-0 z-[1000] shadow-lg">
            <div className="w-full h-20 bg-primary">
                <div className="container h-full">
                    <div className="h-full flex justify-between items-center">

                        <div>
                            <DisplayLogo />
                        </div>

                        {/* nav items */}
                        <div className="flex items-center gap-4">
                            <div className="flex lg:gap-2">
                                {
                                    navItems.map((item, index) => {
                                        return !item?.dropdowns ? 
                                        <NavLink 
                                            key={index}
                                            to={item?.to}
                                            className={({isActive}) => {
                                                return `text-sm md:text-base capitalize font-bold px-4 py-2 rounded-md ${isActive ? "text-primary bg-background" : "text-white"}`
                                            }}
                                        >
                                            <span className="hidden md:block">{item?.label}</span> <span className="md:hidden block text-sm">{item?.icon}</span>
                                        </NavLink>
                                        :
                                        <DropdownMenu key={index}>
                                            <DropdownMenuTrigger asChild>
                                                <p className={
                                                    `text-base capitalize font-bold px-4 py-2 rounded-md cursor-pointer ${pathname.includes(item?.to) ? "text-primary bg-background" : "text-white"}`
                                                }><span className="hidden md:block">{item?.label}</span> <span className="md:hidden block">{item?.icon}</span></p>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="z-[1001]">
                                                {
                                                    item?.dropdowns?.map((dropdown, dropdownIndex) => (
                                                        <div key={dropdownIndex}>
                                                            <DropdownMenuItem
                                                                className={`w-full text-base capitalize font-bold px-4 py-2 rounded-md ${pathname.includes(dropdown?.to) ? "text-primary bg-background" : "text-muted-foreground"}`}
                                                            >
                                                                <NavLink
                                                                    to={`${item?.to}${dropdown?.to}`}
                                                                    className={"w-full"}
                                                                >
                                                                    {dropdown?.label}
                                                                </NavLink>

                                                            </DropdownMenuItem>
                                                            {
                                                                dropdownIndex !== item?.dropdowns?.length-1 &&
                                                                <DropdownMenuSeparator />
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    })
                                }
                            </div>

                            {/* avatar */}
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer">
                                            <DisplayAvatar
                                                img={user?.image ? user?.image : "https://avatar.iran.liara.run/public/47"}
                                                alt={user?.name ? user?.name : "user image"}
                                            >
                                                {
                                                    user?.name && <h3 className="text-base text-white font-bold hidden lg:block">{user?.name}</h3>
                                                }
                                                {
                                                    user?.personalId && <p className="text-sm text-white hidden lg:block">{user?.personalId}</p>
                                                }
                                            </DisplayAvatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="z-[1001]">
                                        {
                                            !user &&
                                            <DropdownMenuItem className="text-base capitalize font-bold rounded-md">
                                                <NavLink 
                                                    to="/auth/login"
                                                    className={`w-full`}
                                                >
                                                    Login
                                                </NavLink>
                                            </DropdownMenuItem>
                                        }
                                        {
                                            user &&
                                            <>
                                                <DropdownMenuItem className="text-base py-2 capitalize font-bold rounded-md  w-full px-4">
                                                    <NavLink
                                                        to={avatarOptions[`${user?.role}`]}
                                                        className={`w-full`}
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-base py-2 capitalize font-bold rounded-md w-full px-4">
                                                    <button
                                                        className={`text-base capitalize font-bold w-full -ml-4`}
                                                        onClick={async () => {
                                                            await logout()
                                                        }}
                                                    >
                                                        Logout
                                                    </button>
                                                </DropdownMenuItem>
                                            </>
                                        }
                                    </DropdownMenuContent>

                                </DropdownMenu>
                                
                            </div>

                            {/* theme switcher */}
                            <ThemeSwitcher />
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar