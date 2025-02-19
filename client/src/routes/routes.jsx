import { createBrowserRouter } from "react-router"

// pages
import App from "@/App"
import Login from "@/pages/auth/Login"
import AdminRegister from "@/pages/auth/AdminRegister"
import FindAccount from "@/pages/auth/FindAccount"
import VerifyAccount from "@/pages/auth/VerifyAccount"
import UpdatePass from "@/pages/auth/UpdatePass"

// layouts
import AuthLayout from "@/pages/auth/layout/AuthLayout"
import UniversalLayout from "@/components/layouts/UniversalLayout"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <UniversalLayout><App /></UniversalLayout>
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
    }
])

export default routes