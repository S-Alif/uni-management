import { createBrowserRouter } from "react-router"

import App from "@/App"

// auth pages
import Login from "@/pages/auth/Login"
import AdminRegister from "@/pages/auth/AdminRegister"
import FindAccount from "@/pages/auth/FindAccount"
import VerifyAccount from "@/pages/auth/VerifyAccount"
import UpdatePass from "@/pages/auth/UpdatePass"

// layouts
import AuthLayout from "@/pages/auth/layout/AuthLayout"
import UniversalLayout from "@/components/layouts/UniversalLayout"
import AdminLayout from "@/pages/admin/layout/AdminLayout"

// admin pages
import Dashboard from "@/pages/admin/administration/Dashboard"
import BatchSection from "@/pages/admin/administration/BatchSection"
import Faculty from "@/pages/admin/administration/Faculty"
import Departments from "@/pages/admin/administration/Departments"
import Semesters from "@/pages/admin/administration/Semesters"
import Courses from "@/pages/admin/academics/Courses"
import Schedules from "@/pages/admin/academics/Schedules"
import Notices from "@/pages/admin/academics/Notices"
import AccessForbidden from "@/pages/AccessForbidden"
import Sections from "@/pages/admin/administration/Sections"
import Students from "@/pages/admin/actors/Students"
import StudentProfile from "@/pages/admin/actors/StudentProfile"
import Teachers from "@/pages/admin/actors/Teachers"
import TeacherProfile from "@/pages/admin/actors/TeacherProfile"


const routes = createBrowserRouter([
    {
        path: "/",
        element: <UniversalLayout><App /></UniversalLayout>
    },
    {
        path: "/no-access",
        element: <UniversalLayout><AccessForbidden /></UniversalLayout>
    },
    {
        path: "/auth",
        element: <UniversalLayout><AuthLayout /></UniversalLayout>,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "secured/admin/register",
                element: <AdminRegister />
            },
            {
                path: "find-account",
                element: <FindAccount />
            },
            {
                path: "verify-account",
                element: <VerifyAccount />
            },
            {
                path: "update-pass",
                element: <UpdatePass />
            },
        ]
    },
    // admin routes
    {
        path: "/admin",
        element: <UniversalLayout><AdminLayout /></UniversalLayout>,
        children: [

            // administration routes
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "batch",
                element: <BatchSection />
            },
            {
                path: "sections",
                element: <Sections />
            },
            {
                path: "faculty",
                element: <Faculty />
            },
            {
                path: "department",
                element: <Departments />
            },
            {
                path: "semesters",
                element: <Semesters />
            },

            // academics routes
            {
                path: "courses",
                element: <Courses />
            },
            {
                path: "schedules",
                element: <Schedules />
            },
            {
                path: "notices",
                element: <Notices />
            },

            // actors routes
            {
                path: "students",
                element: <Students />
            },
            {
                path: "students/:id",
                element: <StudentProfile />
            },
            {
                path: "teachers",
                element: <Teachers />,
            },
            {
                path: "teachers/:id",
                element: <TeacherProfile />
            }
        ]
    }
])

export default routes