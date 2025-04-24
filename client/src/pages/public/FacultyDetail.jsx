import { useEffect, useState } from "react"
import PublicPageLayout from "./components/layouts/PublicPageLayout"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"
import { Navigate, useParams } from "react-router"


const FacultyDetail = () => {

    const [faculty, setFaculty] = useState(null)
    const [loading, setLoading] = useState(false)
    const params = useParams()

    if(!params?.id){
        return <Navigate to="/page-not-found" replace={true} />
    }

    useEffect(() => {
        (async () => {
            const result = await apiHandler(
                { url: `${publicRoutes.faculty.url}/${params?.id}`}
            )
        })()
    }, [])

    return (
        <PublicPageLayout

        >

        </PublicPageLayout>
    )
}

export default FacultyDetail