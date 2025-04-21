import { Outlet } from "react-router"


const AuthLayout = () => {
	return (
		<div className="w-full" id="auth-pages">
			<Outlet />
		</div>
	)
}

export default AuthLayout