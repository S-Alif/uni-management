import SideBarNav from '@/components/navs/SideBarNav'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import UserStore from '@/stores/UserStore'
import { Fragment } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import ThemeSwitcher from '../ThemeSwitcher'

// access to prop is for user role
const DashboardLayout = ({accessTo=null}) => {

    const {user, loadingState, accessToken} = UserStore()

    if(loadingState) {
        return (
            <section className="flex items-center justify-center h-screen w-full bg-primary/35">
                <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </section>
        )
    }

    if(!user) return <Navigate to={"/auth/login"} replace={true} />
    if(user?.role !== accessTo) return <Navigate to={"/no-access"} replace={true} />

    const pathname = useLocation().pathname
    const pathLength = pathname.split("/").length

    return (
        <SidebarProvider>
            {/* custom sidebar component */}
            <SideBarNav userRole={user?.role} /> 
            <SidebarInset>

                <header className="flex justify-between h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {
                                    pathname.split("/").map((e, index) => {
                                        return index != 0 && (
                                            <Fragment key={index}>
                                                <BreadcrumbItem className={`${index != pathLength - 1 ? "md:block hidden" : ""}`}>
                                                    <BreadcrumbPage className="capitalize">{e}</BreadcrumbPage>
                                                </BreadcrumbItem>
                                                {
                                                    index != pathLength - 1 && 
                                                    <BreadcrumbSeparator className={`${index != pathLength - 1 ? "md:block hidden" : ""}`} />
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* theme switcher */}
                    <div className="pr-2">
                        <ThemeSwitcher />
                    </div>
                </header>

                <main className="p-4 min-h-screen">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout