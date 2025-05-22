import ScheduleCards from "@/components/cards/ScheduleCards"
import SectionDashboard from "@/components/SectionDashboard"
import UserStore from "@/stores/UserStore"
import { GET, studentRoutes, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"


const UserSchedules = () => {
    const [schedules, setSchedules] = useState([])
    const {user} = UserStore()
    const [loading, setLoading] = useState(false)
    const orderedDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await apiHandler(
                { url: user?.role == 2022 ? teacherRoutes.schedules : studentRoutes.schedules, method: GET},
                {}
            )
            setLoading(false)
            if(!result) return
            setSchedules(result)
        })()
    }, [])

    return (
        <section className="section-layout" id="schedule-page">
            <SectionDashboard
                id="schedule"
                sectionTitle="My Schedule"
                loading={loading}
            >
                <div className="card-grid-layout mt-10">
                    {
                        orderedDays.map((day) => (
                            schedules.map((schedule) => {
                                if (schedule.weekday === day) {
                                    console.log(schedule.weekday)
                                    return (
                                        <ScheduleCards
                                            key={schedule._id}
                                            item={schedule}
                                            role={user?.role}
                                        />
                                    )
                                }
                            })
                        ))
                    }
                </div>

            </SectionDashboard>
        </section>
    )
}

export default UserSchedules