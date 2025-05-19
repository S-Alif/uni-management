import { createBrowserRouter, Navigate } from "react-router"

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
import DashboardLayout from "@/components/layouts/DashboardLayout"

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
import FacultyAndDept from "@/pages/public/FacultyAndDept"
import FacultyDetail from "@/pages/public/FacultyDetail"
import NotFound from "@/pages/NotFound"
import DepartmentDetail from "@/pages/public/DepartmentDetail"
import Profile from "@/pages/Profile"
import TimeSlot from "@/pages/admin/administration/TimeSlot"
import Classmates from "@/pages/student/Classmates"
import UserPublicProfile from "@/pages/UserPublicProfile"
import StudentSchedules from "@/pages/student/StudentSchedules"


const routes = createBrowserRouter([
    {
        path: "/",
        element: <UniversalLayout><App /></UniversalLayout>
    },
    {
        path: "/page-not-found",
        element: <UniversalLayout><NotFound /></UniversalLayout>
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
        element: <UniversalLayout><DashboardLayout accessTo={2025} /></UniversalLayout>,
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
            {
                path: "time-slot",
                element: <TimeSlot />
            },

            // academics routes
            {
                path: "courses",
                element: <Courses />
            },
            {
                path: "semesters/schedules/:semesterId",
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
    },
    {
        path: "/academics",
        element: <UniversalLayout />,
        children: [
            {
                path: "faculty-and-department",
                element: <FacultyAndDept />
            },
            {
                path: "faculty/:id",
                element: <FacultyDetail />
            },
            {
                path: "departments/:id",
                element: <DepartmentDetail />
            },
            {
                path: "teachers/:id",
                element: <UserPublicProfile role={2022} />
            },
            {
                path: "students/:id",
                element: <UserPublicProfile role={1999} />
            },
        ]
    },
    // user routes
    {
        path: "/dashboard",
        element: <UniversalLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/page-not-found" replace={true} />
            },
            {
                path: "student",
                element: <DashboardLayout accessTo={1999} />,
                children:[
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "classmates",
                        element: <Classmates />
                    },
                    {
                        path: "schedules",
                        element: <StudentSchedules />
                    },
                ]
            },
            {
                path: "teacher",
                element: <DashboardLayout accessTo={2022} />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <UniversalLayout><NotFound /></UniversalLayout>
    }
])

export default routes