import { createBrowserRouter } from "react-router"

// pages
import App from "@/App"
import Login from "@/pages/auth/Login"

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
            }
        ]
    }
])

export default routes