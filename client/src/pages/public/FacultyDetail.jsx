import { useEffect, useState } from "react"
import PublicPageLayout from "./components/layouts/PublicPageLayout"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"
import { Navigate, useParams } from "react-router"
import SectionPage from "@/components/SectionPage"
import DeptCard from "./components/cards/DeptCard"
import UserCards from "@/components/cards/UserCards"


const FacultyDetail = () => {

    const [faculty, setFaculty] = useState(null)
    const [departmentList, setDepartmentList] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()

    if(!params?.id){
        return <Navigate to="/page-not-found" replace={true} />
    }

    // get faculty data
    useEffect(() => {
        (async () => {
            setLoading(true)
            const [facultyData, departments] = await Promise.all([
                apiHandler(
                    { url: `${publicRoutes.faculty.url}/${params?.id}`, method: publicRoutes.faculty.method }
                ),
                apiHandler(
                    { url: `${publicRoutes.department.url}?facultyId=${params?.id}`, method: publicRoutes.department.method }
                )
            ])
            
            setLoading(false)
            if(!facultyData && !departments) return
            
            if(facultyData) setFaculty(facultyData)
            if(departments) setDepartmentList(departments)
        })()
    }, [])

    return (
        <PublicPageLayout
            pageTitle={faculty?.name}
            pageDescription={faculty?.shortDesc}
            pageImg={faculty?.bgImage}
            pageId="faculty-detail"
            loading={loading}
        >
            <SectionPage
                id="faculty-about"
                loading={loading}
            >
                <div className="flex flex-col items-center gap-10">
                    {/* image */}
                    <div className="w-[300px] h-auto overflow-hidden max-w-[calc(100%)] max-h-auto">
                        <img src={faculty?.image} alt="faculty image" className="w-full h-full object-cover object-center" />
                    </div>

                    {/* set about richText */}
                    <div className="detail-content">
                        <div dangerouslySetInnerHTML={{__html: faculty?.about}} />
                    </div>
                </div>

            </SectionPage>

            {/* message from dean */}
            <SectionPage
                id="faculty-message"
                sectionClassName="bg-primary/15"
                sectionTitle={"Message from Dean"}
                loading={loading}
            >
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
                    <div className="shrink-0">
                        <UserCards item={faculty?.dean} />
                    </div>
                    <div className="self-center">
                        <p className="whitespace-break-spaces text-justify lg:text-balance">{faculty?.msgFromDean}</p>
                    </div>
                </div>
            </SectionPage>

            {/* department list */}
            <SectionPage
                id="faculty-department"
                sectionTitle={"Department"}
                loading={loading}
            >
                <div className="card-grid-layout">
                    {
                        departmentList.map((department, index) => (
                            <DeptCard
                                key={index}
                                item={department}
                            />
                        ))
                    }
                </div>

            </SectionPage>


            
        </PublicPageLayout>
    )
}

export default FacultyDetail