import UserStore from '@/stores/UserStore'
import { Navigate, Outlet } from 'react-router'

const AdminLayout = () => {

    const {user} = UserStore()

    console.log(user)

    if(!user) return <Navigate to={"/auth/login"} replace={true} />
    if(user?.role !== 2025) return <Navigate to={"/no-access"} replace={true} />

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminLayout