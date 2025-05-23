import AdminDashboard from "@/components/AdminDashboard"
import UserStore from "@/stores/UserStore"
import { administrationRoutes } from "@/utils/api/apiConstants"
import { useEffect, useState } from "react"


const Dashboard = () => {

    const { user, dashboard, setDashboard } = UserStore()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        (async () => {
            let url = `${administrationRoutes.dashboard}`
            setLoading(true)
            if(!dashboard || refresh) await setDashboard(url)
            setLoading(false)
            setRefresh(false)
        })()

    }, [refresh])

    return (
        <section className="section-layout" id="dashboard">
            <AdminDashboard data={dashboard} loading={loading} setRefresh={setRefresh} />
        </section>
    )
}

export default Dashboard