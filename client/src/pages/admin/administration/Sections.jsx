import CustomSheet from "@/components/CustomSheet"
import FilterOptions from "@/components/FilterOptions"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, DELETE_METHOD, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { ListFilter, PencilLine, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import SectionForm from "./forms/SectionForm"
import { TableCell, TableRow } from "@/components/ui/table"
import DisplayTable from "@/components/DisplayTable"
import DisplayAvatar from "@/components/DisplayAvatar"
import { format } from "date-fns"
import DisplayDialog from "@/components/DisplayDialog"
import DisplayPagination from "@/components/DisplayPagination"
import { useIsMobile } from "@/hooks/use-mobile"


const Sections = () => {

    const { department } = OtherStore()
    const navigate = useNavigate()
    const { updateParams, values: { batch, no, page = 1, limit = 40, dept = "all", shift = "all" }} = useQueryParams(["batch", "page", "limit", "dept", "shift", "no"])
    const isMobile = useIsMobile()

    const [section, setSection] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)

    // if no batch
    if(!batch){
        return (
            <div className="section-layout">
                <h1 className="text-3xl font-bold pb-5">Batch not found</h1>
                <Button
                    size="lg"
                    onClick={() => {
                        navigate(-1) 
                    }}
                >Go back</Button>
            </div>
        )
    }

    // get the list of sections
    const getSections = async () => {
        setLoading(true)
        const result = await apiHandler(
            { url: `${administrationRoutes.sections}?page=${page}&limit=${limit}&dept=${dept}&shift=${shift}&batch=${batch}`, method: GET },
            {},
            true
        )
        if (!result) return
        setSection(result?.sections)
        setTotalPage(result?.totalPage)
        setLoading(false)
    }
    useEffect(() => {
        getSections()
    }, [page])

    // filter options
    const filterOptions = [
        {
            label: "Limit",
            name: "limit",
            placeholder: "Select limit",
            selectItems: [
                { _id: 40, name: "40" },
                { _id: 60, name: "60" },
                { _id: 80, name: "80" },
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
                {_id: "all", name:"ALL"},
                ...department
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
        {
            label: "Shift",
            name: "shift",
            placeholder: "Select shift",
            selectItems: [
                { _id: "all", name: "ALL" },
                { _id: "day", name: "Day" },
                { _id: "evening", name: "Evening" },
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        }
    ]

    return (
        <section className="section-layout">
            {/* filters */}
            <div className="pb-5">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <h1 className="page-title pb-8 md:pb-0">Batch - {no < 10 ? "0"+no : no} Sections</h1>
                    <div className="flex gap-2">
                        <Button
                            size={isMobile ? "icon" : "lg"}
                            variant="outline"
                            onClick={() => {
                                setFilterOpen((prev) => !prev)
                            }}
                        >
                            <span className="hidden md:block md:mr-1">filter</span> <ListFilter />
                        </Button>
                        {/* section form */}
                        <CustomSheet 
                            trigger={
                                <Button
                                    size={isMobile ? "icon" : "lg"}
                                >
                                    <span className="hidden md:block">Create Section</span> <Plus />
                                </Button>
                            }
                            title="Create a new section"
                        >
                            <SectionForm batch={batch} setSection={setSection} />
                        </CustomSheet>
                    </div>
                </div>

                {/* filter options */}
                <FilterOptions 
                    options={filterOptions}
                    filterOpen={filterOpen}
                    searchBtnOnClick={() => {
                        updateParams("page", 1)
                        getSections()
                    }}
                />
                
            </div>

            {/* display table */}
            <div className="pt-8">
                {
                    section.length == 0 ? 
                        <h3 className="text-center font-bold text-xl">No sections found</h3>
                        :
                        <DisplayTable
                            headings={[
                                { name: "#" },
                                { name: "Section" },
                                { name: "Shift" },
                                { name: "Department" },
                                { name: "Period" },
                                { name: "Batch Co." },
                                { name: "Class Rep." },
                                { name: "Last updated at" },
                                { name: "Action" },
                            ]}
                        >
                            {
                                section.map((item, index) => (
                                    <SectionTableRows 
                                        data={item}
                                        index={index}
                                        page={page}
                                        limit={limit}
                                        key={index}
                                        setSection={setSection}
                                    />
                                ))
                            }

                        </DisplayTable>
                }
            </div>

            {/* pagination */}
            <div className="pt-8">
                <DisplayPagination
                    totalPage={totalPage}
                    currentPage={parseInt(page)}
                    onPageChange={updateParams}
                />
            </div>

        </section>
    )
}

export default Sections

// section table rows
const SectionTableRows = ({data, index, page, limit, setSection}) => {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <TableRow>
            <TableCell className="border-r">{(page - 1) * limit + index + 1}</TableCell>
            <TableCell className="border-r">{data?.batch?.name} - {data?.section}</TableCell>
            <TableCell className="border-r">{data?.shift?.toUpperCase()}</TableCell>
            <TableCell className="border-r">{data?.dept?.shortName}</TableCell>
            <TableCell className="border-r">
                {format(data?.start, "MMMM dd, yyyy")} - {format(data?.end, "MMMM dd, yyyy")}
            </TableCell>

            {/* batch co */}
            <TableCell className="border-r">
                {
                    data?.batchCo ?
                    <DisplayAvatar
                        img={data?.batchCo?.image}
                        alt="Batch co-ordinator"
                    >
                        <h3 className="text-base">{data?.batchCo?.name}</h3>
                        <p className="text-sm text-gray-400">{data?.batchCo?.personalId}</p>
                    </DisplayAvatar>
                    :
                    <p className="text-center">-</p>
                }
            </TableCell>

            {/* class rep */}
            <TableCell className="border-r">
                {
                    data?.classRep ?
                    <DisplayAvatar
                        img={data?.classRep?.image}
                        alt="Batch co-ordinator"
                    >
                        <h3 className="text-base">{data?.classRep?.name}</h3>
                        <p className="text-sm text-gray-400">{data?.classRep?.personalId}</p>
                    </DisplayAvatar>
                    :
                    <p className="text-center">-</p>
                }
            </TableCell>

            <TableCell className="border-r">
                {format(data?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
            </TableCell>

            {/* actions */}
            <TableCell>
                <div className="flex gap-2 items-center">
                    <CustomSheet
                        trigger={
                            <Button size="icon"><PencilLine /></Button>
                        }
                        title="Update batch"
                    >
                        <div className="pt-10">
                            <SectionForm id={data?._id} data={data} setSection={setSection} batch={data?.batch?._id} />
                        </div>
                    </CustomSheet>

                    {/* remove */}
                    <DisplayDialog
                        trigger={
                            <Button size="icon" variant="destructive" onClick={() => setDialogOpen(true)}>
                                <Trash2 />
                            </Button>
                        }
                        openState={dialogOpen}
                        setOpenstate={setDialogOpen}
                        heading={`Delete section: ${data?.dept?.shortName} ${data?.batch?.name} - ${data?.section} (${data?.shift.toUpperCase()})`}
                        description={`Are you sure you want to delete this section ?`}
                    >
                        <div className="flex gap-5 justify-end pt-10">
                            <Button
                                size="lg"
                                variant="destructive"
                                onClick={async () => {
                                    const result = await apiHandler(
                                        { url: `${administrationRoutes.sections}/${data?._id}`, method: DELETE_METHOD },
                                        {},
                                        true
                                    )
                                    if (!result) return
                                    setSection(prev => prev.filter(section => section._id !== data?._id))
                                    setDialogOpen(false)
                                }}
                            >
                                Proceed
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Exit
                            </Button>
                        </div>
                    </DisplayDialog>
                </div>
            </TableCell>
        </TableRow>
    )
}