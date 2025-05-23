import DisplayTable from "@/components/DisplayTable"
import SectionDashboard from "@/components/SectionDashboard"
import UserTableRows from "@/components/tableRows/UserTableRows"
import useQueryParams from "@/hooks/useQueryParams"
import { GET, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"

const StudentList = () => {

    const location = useLocation()
    const section = location.state?.section
    const [studentList, setStudentList] = useState([])
    const {values: {page = 1}} = useQueryParams(["page"])

    // console.log(section)

    useEffect(() => {
        (async () => {
            const result = await apiHandler(
                { url: `${teacherRoutes.studentList}?page=${page}&limit=70&section=${section}`, method: GET},
                {},
                true
            )
            if(!result) return
            console.log(result)
            setStudentList(result?.users)
        })()
    }, [])


    return (
        <section className="section-layout" id="student-list">
            <SectionDashboard
                id="student-list-table"
                sectionTitle={"Student List"}
            >
                <div className="pt-10">
                    <DisplayTable
                        headings={[
                            { name: "#" },
                            { name: "Name" },
                            { name: "Email & Phone" },
                            { name: "Department" },
                            { name: "Batch & Section" }
                        ]}
                    >
                        {
                            studentList?.map((item, index) => (
                                <UserTableRows 
                                    key={index}
                                    data={item}
                                    page={page}
                                    index={index}
                                    limit={70}
                                    userType={"student"}
                                />
                            ))
                        }

                    </DisplayTable>
                </div>

            </SectionDashboard>
        </section>
    )
}

export default StudentList