import UserCards from "@/components/cards/UserCards"
import DisplayPagination from "@/components/DisplayPagination"
import SectionDashboard from "@/components/SectionDashboard"
import useQueryParams from "@/hooks/useQueryParams"
import UserStore from "@/stores/UserStore"
import { GET, studentRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"


const Classmates = () => {

    const [classmates, setClassmates] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const {user} = UserStore()
    
    const {values: {page = 1}, updateParams} = useQueryParams(["page"])
    const limit = 60
    
    // get classmate list
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await apiHandler(
                {url: `${studentRoutes.classmates}?page=${page}&limit=${limit}&section=${user?.section?._id}`, method: GET},
                {},
                false
            )
            setLoading(false)
            if(!result) return
            setClassmates(result?.users)
            setTotalPages(result?.totalPage)
        })()
    }, [page])


    return (
        <section className="section-layout">
            <SectionDashboard
                sectionTitle={"Your Classmates"}
                loading={loading}
            >
                <div className="card-grid-layout mt-10">
                    {
                        classmates?.map((item, index) => (
                            <UserCards item={item} key={index} />
                        ))
                    }
                </div>
                {
                    classmates?.length === 0 && <p className="text-center text-xl font-semibold text-gray-500">No classmates found</p>
                }

                <DisplayPagination 
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={updateParams}
                />

            </SectionDashboard>
        </section>
    )
}

export default Classmates