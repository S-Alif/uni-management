import DisplayTable from "@/components/DisplayTable"
import SectionDashboard from "@/components/SectionDashboard"
import UserTableRows from "@/components/tableRows/UserTableRows"
import useQueryParams from "@/hooks/useQueryParams"
import UserStore from "@/stores/UserStore"
import { GET, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"


const Collegue = () => {

    const [teachersList, setTeachersList] = useState([])
    const { values: { page = 1 } } = useQueryParams(["page"])
    const {user} = UserStore()

    useEffect(() => {
        (async () => {
            const result = await apiHandler(
                {url: `${teacherRoutes.teacherList}?page=${page}&limit=70&dept=${user?.dept?._id}`, method: GET},
                {},
                true
            )
            if(!result) return
            setTeachersList(result?.users)
        })()
    }, [])

    return (
        <section className="section-layout" id="teachers">
            <SectionDashboard
                id="teachers-list"
                sectionTitle={"Teachers List"}
            >
                <div className="pt-10">
                    <DisplayTable
                        headings={[
                            { name: "#" },
                            { name: "Name" },
                            { name: "Email & Phone" },
                            { name: "Department" },
                            { name: "Designation" }
                        ]}
                    >
                        {
                            teachersList?.map((teacher, i) => (
                                <UserTableRows
                                    key={i}
                                    data={teacher}
                                    userType={'teacher'}
                                    page={page}
                                    limit={70}
                                    index={i}
                                />
                            ))
                        }
                    </DisplayTable>
                </div>
            </SectionDashboard>
        </section>
    )
}

export default Collegue