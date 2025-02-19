import { createBrowserRouter } from "react-router"

// pages
import App from "@/App"
import Login from "@/pages/auth/Login"
import AdminRegister from "@/pages/auth/AdminRegister"
import FindAccount from "@/pages/auth/FindAccount"
import VerifyAccount from "@/pages/auth/VerifyAccount"
import UpdatePass from "@/pages/auth/UpdatePass"

// layouts
import AuthLayout from "@/components/layouts/AuthLayout"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/auth",
        element: <AuthLayout />,
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