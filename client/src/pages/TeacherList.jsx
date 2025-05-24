import SectionDashboard from "@/components/SectionDashboard"
import PublicPageLayout from "./public/components/layouts/PublicPageLayout"
import { useLocation } from "react-router"
import UserStore from "@/stores/UserStore"
import OtherStore from "@/stores/OtherStore"
import useQueryParams from "@/hooks/useQueryParams"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import FilterOptions from "@/components/FilterOptions"
import { publicRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import UserCards from "@/components/cards/UserCards"


const TeacherList = () => {
    const location = useLocation()
    const { user } = UserStore()
    const {department} = OtherStore()
    const { values: { page = 1, limit = 40, dept = "all", designation = "all" }, updateParams } = useQueryParams(["page", "limit", "dept", "designation"])
    
    const [filterOpen, setFilterOpen] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [teacherList, setTeacherList] = useState([])

    // fetch function
    const getData = async () => {
        let url = `${publicRoutes.teachers.url}?page=${page}&limit=${limit}&dept=${dept}&designation=${designation}`

        const result = await apiHandler({ url: url, method: publicRoutes.teachers.method }, {}, true)
        if (!result) return
        setTeacherList(result?.users || [])
        setTotalPage(result?.totalPage || 0)
    }

    // get data
    useEffect(() => {
        getData()
    }, [page])

    // filter options
    const filterOptions = [
        {
            label: "Limit",
            name: "limit",
            placeholder: "Limit",
            selectItems: [
                { _id: "40", name: "40" },
                { _id: "60", name: "60" },
                { _id: "80", name: "80" },
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
        {
            label: "Department",
            name: "dept",
            placeholder: "Select department",
            selectItems: [
                { _id: "all", name: "All" },
                ...department
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
        {
            label: "Designation",
            name: "designation",
            placeholder: "Select designation",
            selectItems: [
                { _id: "all", name: "All" },
                { _id: "Professor", name: "Professor" },
                { _id: "Associate Professor", name: "Associate Professor" },
                { _id: "Assistant Professor", name: "Assistant Professor" },
                { _id: "Senior Lecturer", name: "Senior Lecturer" },
                { _id: "Lecturer", name: "Lecturer" },
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
    ] 

    return (
        <PublicPageLayout
            pageTitle="Teacher List"
            pageDescription="Our awesome faculty members"
            pageImg="https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        >
            <SectionDashboard
                sectionTitle={"Teachers"}
                sectionClassName={(user?.role !== 2025 || !location.pathname.includes("/admin")) ? "container my-10" : ""}
                headerSideOptions={
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            setFilterOpen((prev) => !prev)
                        }}
                    >
                        filter <span className="ml-1"><ListFilter /></span>
                    </Button>
                }
            >
                {/* filter options */}
                <FilterOptions
                    options={filterOptions}
                    filterOpen={filterOpen}
                    searchBtnOnClick={async () => {
                        if (page == 1) {
                            return await getData()
                        }
                        updateParams("page", 1)
                    }}
                />

                <div className="pt-10 card-grid-layout">
                    {
                        teacherList?.length > 0 &&
                        teacherList.map((item, index) => (
                            <UserCards item={item} key={index} />
                        ))
                    }
                </div>

            </SectionDashboard>

        </PublicPageLayout>
    )
}

export default TeacherList