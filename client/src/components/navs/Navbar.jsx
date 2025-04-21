import { NavLink, useLocation } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import DisplayLogo from "../DisplayLogo"
import DisplayAvatar from "../DisplayAvatar"
import UserStore from "@/stores/UserStore"


const Navbar = () => {

    const isMobile = useIsMobile()
    const location = useLocation()
    const pathname = location.pathname

    const {user} = UserStore()

    // nav items
    const navItems = [
        {
            label: "home",
            to: "/"
        },
        {
            label: "about us",
            to: "/about-us"
        },
        {
            label: "academics",
            to: "/academics",
            dropdowns: [
                {
                    label: "faculty and department",
                    to: "/faculty-and-department"
                },
                {
                    label: "Courses",
                    to: "/courses"
                },
            ]
        },
    ]

    return(
        <nav className="w-full sticky top-0">
            <div className="w-full h-20 bg-primary">
                <div className="container h-full">
                    <div className="h-full flex justify-between items-center">

                        <div>
                            <DisplayLogo />
                        </div>

                        {/* nav items */}
                        <div className="flex items-center">
                            <div className="flex gap-2">
                                {
                                    navItems.map((item, index) => {
                                        return !item?.dropdowns ? 
                                        <NavLink 
                                            key={index}
                                            to={item?.to}
                                            className={({isActive}) => {
                                                return `text-base capitalize font-bold px-4 py-2 rounded-md ${isActive ? "text-primary bg-background" : "text-white"}`
                                            }}
                                        >
                                            {item?.label}
                                        </NavLink>
                                        :
                                        <DropdownMenu key={index}>
                                            <DropdownMenuTrigger asChild>
                                                <p className={
                                                    `text-base capitalize font-bold px-4 py-2 rounded-md cursor-pointer ${pathname.includes(item?.to) ? "text-primary bg-background" : "text-white"}`
                                                }>{item?.label}</p>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
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
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer">
                                            <DisplayAvatar
                                                img={user?.image ? user?.image : "https://avatar.iran.liara.run/public/47"}
                                                alt={user?.name ? user?.name : "user image"}
                                            >
                                                {
                                                    user?.name && <h3 className="text-base text-white font-bold">{user?.name}</h3>
                                                }
                                                {
                                                    user?.personalId && <p className="text-sm text-white">{user?.personalId}</p>
                                                }
                                            </DisplayAvatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
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
                                                        to={`${user?.role == 2025 ? "/admin/dashboard" : "/dashboard"}`}
                                                        className={`w-full`}
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-base py-2 capitalize font-bold rounded-md w-full px-4">
                                                    <button
                                                        className={`text-base capitalize font-bold w-full -ml-4`}
                                                    >
                                                        Logout
                                                    </button>
                                                </DropdownMenuItem>
                                            </>
                                        }
                                    </DropdownMenuContent>

                                </DropdownMenu>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar