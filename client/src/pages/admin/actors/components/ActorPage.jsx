import useQueryParams from "@/hooks/useQueryParams"
import { useEffect, useState } from "react"
import UserForm from "../forms/UserForm"
import DisplayDialog from "@/components/DisplayDialog"
import { Button } from "@/components/ui/button"
import { ListFilter, Plus } from "lucide-react"
import OtherStore from "@/stores/OtherStore"
import FilterOptions from "@/components/FilterOptions"
import apiHandler from "@/utils/api/apiHandler"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import DisplayTable from "@/components/DisplayTable"
import DisplayPagination from "@/components/DisplayPagination"
import SectionDashboard from "@/components/SectionDashboard"
import UserTableRows from "@/components/tableRows/UserTableRows"


const ActorPage = ({userType = ""}) => {
    const { values: { page = 1, limit = 40, dept = "all", batch = "all", section = "all" }, updateParams } = useQueryParams(["page", "limit", "dept", "batch", "section"])
    const {department} = OtherStore()

    const [totalPage, setTotalPage] = useState(0)
    const [filterOpen, setFilterOpen] = useState(false)
    const [batchList, setBatchList] = useState([])
    const [sectionList, setSectionList] = useState([])
    const [users, setUsers] = useState([])

    // fetch function
    const getData = async () => {
        let url = `${administrationRoutes.students}?page=${page}&limit=${limit}&dept=${dept}&batch=${batch}&section=${section}`
        if (userType == "teacher") url = `${administrationRoutes.teachers}?page=${page}&limit=${limit}&dept=${dept}`

        const result = await apiHandler({url: url, method: GET}, {}, true)
        if(!result) return
        setUsers(result?.users || [])
        setTotalPage(result?.totalPage || 0)
    }

    // get data
    useEffect(() => {
        getData()
    }, [page])

    // get batch and sections
    useEffect(() => {
        // get batch list based on department
        if (userType != "student") return
        const getBatchList = async () => {
            if (batchList.length > 0) return
            const result = await apiHandler(
                { url: `${administrationRoutes.batch}?page=1&limit=100`, method: GET },
                {},
                false
            )
            if (!result) return
            setBatchList(result?.batch)
        }
        getBatchList()

        // get section based on dept and batch
        if (batch == "all") {
            setSectionList([])
            updateParams("section", "all")
            return
        }
        const getSectionList = async () => {
            if (sectionList.length > 0) return
            const result = await apiHandler(
                { url: `${administrationRoutes.sections}?dept=${dept}&batch=${batch}`, method: GET },
                {},
                false
            )
            if (!result) return
            setSectionList(result?.sections)
        }
        getSectionList()

    }, [batch, section, dept])


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
        ...((userType != "student" && dept != "") ? [] : 
            [
                {
                    label: "Batch",
                    name: "batch",
                    placeholder: "Select Batch",
                    selectItems: [
                        {_id: "all", name: "ALL"},
                        ...batchList
                    ],
                    onValueChange: (name, value) => {
                        updateParams(name, value)
                    }
                },
                {
                    label: "Section",
                    name: "section",
                    placeholder: "Select section",
                    selectItems: [
                        {_id: "all", name: "ALL"},
                        ...sectionList
                    ],
                    onValueChange: (name, value) => {
                        updateParams(name, value)
                    }
                },
            ]
        )
    ]
    

    return (
        <section className="section-layout">
            <SectionDashboard
                id="actor-page"
                sectionTitle={`${userType} list`}
                headerSideOptions={
                    <div className="flex justify-between items-center">
                        {/* buttons */}
                        <div className="flex gap-2">
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    setFilterOpen((prev) => !prev)
                                }}
                            >
                                filter <span className="ml-1"><ListFilter /></span>
                            </Button>

                            {/* dialog */}
                            <DisplayDialog
                                trigger={
                                    <Button size="lg">
                                        <span className="hidden md:block">Add <span className="capitalize">{userType}</span></span> <span className="!text-2xl"><Plus size={50} /></span>
                                    </Button>
                                }
                                heading={`Add new ${userType}`}
                                dialogClassName="lg:max-w-[900px]"
                            >
                                {/* place student form here */}
                                <div className="pt-10">
                                    <UserForm userType={userType} setUsers={setUsers} />
                                </div>
                            </DisplayDialog>
                        </div>
                    </div>
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

                {/* table */}
                <div className="pt-10">
                    {
                        users?.length > 0 &&
                        <DisplayTable
                            headings={[
                                { name: "#" },
                                { name: "Name" },
                                { name: "Email & Phone" },
                                { name: "Department" },
                                ...(userType == "student" ? [
                                    { name: "Batch & Section" }
                                ] : []),
                                ...(userType == "teacher" ? [
                                    { name: "Designation" }
                                ] : []),
                                { name: "Last updated at" },
                                { name: "Actions" }
                            ]}
                        >
                            {
                                users?.length > 0 &&
                                users.map((item, index) => (
                                    <UserTableRows
                                        data={item}
                                        userType={userType}
                                        index={index}
                                        page={page}
                                        limit={limit}
                                        setUsers={setUsers}
                                    />
                                ))
                            }

                        </DisplayTable>
                    }
                    {
                        users?.length == 0 && <h3 className="text-center text-xl font-bold">No data found</h3>
                    }
                </div>

                {/* pagination */}
                <div className="pt-10">
                    <DisplayPagination
                        totalPage={totalPage}
                        currentPage={parseInt(page)}
                        onPageChange={updateParams}
                    />
                </div>
            </SectionDashboard>
        </section>
    )
}

export default ActorPage