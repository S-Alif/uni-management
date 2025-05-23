import { Fragment } from "react"
import SectionDashboard from "./SectionDashboard"
import { Button } from "./ui/button"
import DashboardCards from "./cards/DashboardCards"
import DisplayCharts from "./DisplayCharts"

const AdminDashboard = ({data, loading, setRefresh}) => {
    console.log(data)
    return (
        <Fragment>
            <SectionDashboard
                id="dashboard-summary"
                sectionTitle={"Summary"}
                loading={loading}
                headerSideOptions={
                    <Button
                        size="lg"
                        onClick={() => setRefresh(true)}
                    >
                        Refresh
                    </Button>
                }
            >
                <div className="card-grid-layout">
                    {
                        data?.cards?.map((item, index) => (
                            <DashboardCards key={index} item={item} />
                        ))
                    }
                </div>

            </SectionDashboard>

            {/* charts */}
            <SectionDashboard
                id="dashboard-charts"
                sectionTitle={"Charts"}
                loading={loading}
                loadingType="table"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-10">
                    {
                        data?.charts?.map((item, index) => (
                            <DisplayCharts chart={item} key={index} />
                        ))
                    }
                </div>

            </SectionDashboard>
        </Fragment>
    )
}

export default AdminDashboard