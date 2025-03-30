import { NavLink } from "react-router"

const AccessForbidden = () => {
    return (
        <div>
            <h1>Access Forbidden</h1>
            <p>You do not have permission to access this page.</p>
            <NavLink to="/">Go to home</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
        </div>
    )
}

export default AccessForbidden