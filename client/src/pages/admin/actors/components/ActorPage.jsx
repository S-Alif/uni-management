import useQueryParams from "@/hooks/useQueryParams"
import { useEffect, useState } from "react"
import UserForm from "../forms/UserForm"
import DisplayDialog from "@/components/DisplayDialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import OtherStore from "@/stores/OtherStore"
import FilterOptions from "@/components/FilterOptions"
import apiHandler from "@/utils/api/apiHandler"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import DisplayTable from "@/components/DisplayTable"
import { TableCell, TableRow } from "@/components/ui/table"
import DisplayAvatar from "@/components/DisplayAvatar"
import { format } from "date-fns"
import DisplayPagination from "@/components/DisplayPagination"


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
            {/* controls */}
            <div className="pb-5">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="page-title"><span className="capitalize">{userType}</span> list</h1>
                    
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

                {/* filter options */}
                <FilterOptions
                    options={filterOptions}
                    filterOpen={filterOpen}
                    searchBtnOnClick={async () => {
                        if(page == 1) {
                            return await getData()
                        }
                        updateParams("page", 1)
                    }}
                />
            </div>

            {/* table */}
            <div className="pt-5">
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
        </section>
    )
}

export default ActorPage


// table rows
const UserTableRows = ({data, userType, index, page, limit, setUsers}) => {
    return (
        <TableRow>
            <TableCell className="border-r">{(page - 1) * limit + index + 1}</TableCell>
            <TableCell className="border-r">
                <DisplayAvatar
                    img={data?.image}
                    alt="User image"
                >
                    <h3 className="text-base">{data?.name}</h3>
                    <p className="text-sm text-gray-400">{data?.personalId}</p>

                </DisplayAvatar>
            </TableCell>

            <TableCell className="border-r">
                <div className="flex flex-col items-start">
                    <a href={`mailto:${data?.email}`} className={`!text-base ${buttonVariants({ variant: "link" }) }`}>{data?.email}</a>
                    <a href={`tel:+${data?.phone}`} className={`!text-base ${buttonVariants({ variant: "link" })}`}>+{data?.phone}</a>
                </div>
            </TableCell>

            <TableCell className="border-r">
                <p className="text-base">{data?.dept?.shortName}</p>
            </TableCell>

            {
                userType == "student" &&
                <TableCell className="border-r">
                    <p className="text-base">{data?.batch?.name} - {data?.section?.shift.toUpperCase()} - {data?.section?.section}</p>
                </TableCell>
            }

            {
                userType == "teacher" &&
                <TableCell className="border-r">
                    <p className="text-base">{data?.teacherDesignation}</p>
                </TableCell>
            }

            <TableCell className="border-r">
                {format(data?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
            </TableCell>

            <TableCell className="">
                {/* actions */}
                <div className="flex gap-2 items-center">
                    <DisplayDialog
                        trigger={
                            <Button size="icon"><PencilLine /></Button>
                        }
                        heading={`Update ${userType}`}
                        dialogClassName="lg:max-w-[900px]"
                    >
                        <div className="pt-10">
                            <UserForm id={data?._id} data={data} userType={userType} setUsers={setUsers} />
                        </div>
                    </DisplayDialog>

                    {/* remove */}
                    <Button
                        size="icon"
                        variant="destructive"
                    >
                        <Trash2 />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}