import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router"
import PublicPageLayout from "./components/layouts/PublicPageLayout"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"
import SectionPage from "@/components/SectionPage"
import TeacherCard from "./components/cards/TeacherCard"


const DepartmentDetail = () => {

    const [department, setDepartment] = useState(null)
    const [teacherList, setTeacherList] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()

    if(!params?.id){
        return <Navigate to="/page-not-found" replace={true} />
    }

    useEffect(() => {
        (async () => {
            setLoading(true)

            const [deptData, teacherData] = await Promise.all([
                apiHandler(
                    { url: `${publicRoutes.department.url}/${params?.id}`, method: publicRoutes.department.method }
                ),
                apiHandler(
                    { url: `${publicRoutes.teachers.url}?dept=${params.id}`, method: publicRoutes.teachers.method }
                )
            ])

            setLoading(false)
            if(!deptData && !teacherData) return
            setDepartment(deptData)
            setTeacherList(teacherData?.users)

        })()
    }, [])

    return (
        <PublicPageLayout
            pageId="department-detail"
            pageTitle={department?.name}
            pageDescription={department?.shortDesc}
            loading={loading}
        >
            {/* message from HOD */}
            <SectionPage
                id="dept-message"
                sectionTitle={"Message from HOD"}
            >
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
                    <div className="shrink-0 lg:sticky lg:top-0">
                        <TeacherCard item={department?.deptHead} />
                    </div>
                    <div className="self-center">
                        <p className="whitespace-break-spaces text-justify lg:text-balance">{department?.msgFromDeptHead}</p>
                    </div>
                </div>
            </SectionPage>

            {/* department detail */}
            <SectionPage
                id="department-detail"
                sectionTitle={"Department Detail"}
                sectionClassName="bg-primary/15"
            >
                <div className="detail-content">
                    <div dangerouslySetInnerHTML={{__html: department?.about}} />
                </div>
            </SectionPage>

            {/* teachers */}
            <SectionPage
                id="teachers"
                sectionTitle={"Our Expert Teachers"}
            >
                <div className="card-grid-layout">
                    {
                        teacherList.map((teacher, index) => (
                            <TeacherCard
                                key={index}
                                item={teacher}
                            />
                        ))
                    }
                </div>
            </SectionPage>

        </PublicPageLayout>
    )
}

export default DepartmentDetail