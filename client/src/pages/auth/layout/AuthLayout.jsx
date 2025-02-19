import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen" id="auth-pages">
        <Outlet />
    </div>
  )
}

export default AuthLayout