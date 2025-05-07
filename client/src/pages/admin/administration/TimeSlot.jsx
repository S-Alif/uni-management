import CustomSheet from "@/components/CustomSheet"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import useQueryParams from "@/hooks/useQueryParams"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import TimeSlotForm from "./forms/TimeSlotForm"
import FilterOptions from "@/components/FilterOptions"
import { administrationRoutes, DELETE_METHOD, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { TableCell, TableRow } from "@/components/ui/table"
import DisplayDialog from "@/components/DisplayDialog"
import DisplayTable from "@/components/DisplayTable"
import { format } from "date-fns"


const TimeSlot = () => {

    const isMobile = useIsMobile()
    const [filterOpen, setFilterOpen] = useState(false)
    const [timeSlot, setTimeSlot] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)

    const { values: { page = 1, limit = 40, shift = "all" }, updateParams } = useQueryParams(["page", "limit", "shift"])

    const getTimeSlots = async () => {
        setLoading(true)
        const result = await apiHandler(
            { url: `${administrationRoutes.timeSlot}?page=${page}&limit=${limit}&shift=${shift}`, method: GET },
            {},
            true
        )
        setLoading(false)
        if (!result) return
        setTimeSlot(result?.timeSlots)
        setTotalPage(result?.totalPage)
    }

    // get time slots
    useEffect(() => {
        getTimeSlots()
    }, [page, limit])

    return (
        <section className="section-layout" id="time-slot-page">
            <SectionDashboard
                sectionTitle={'Time Slots'}
                loading={loading}
                loadingType="table"
                headerSideOptions={
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
                                    <span className="hidden md:block">Add Time Slot</span> <Plus />
                                </Button>
                            }
                            title="Create a new time slot"
                        >
                            <TimeSlotForm setTimeSlot={setTimeSlot} />
                        </CustomSheet>
                    </div>
                }
            >
                {/* filter options */}
                <FilterOptions
                    filterOpen={filterOpen}
                    searchBtnOnClick={() => {
                        if ((page - 1) == 0) {
                            getTimeSlots()
                        }
                        updateParams("page", 1)
                    }}
                    options={[
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
                            label: "Shift",
                            name: "shift",
                            placeholder: "Select shift",
                            selectItems: [
                                { _id: "all", name: "ALL" },
                                { _id: "day", name: "DAY" },
                                { _id: "evening", name: "EVENING" },
                            ],
                            onValueChange: (name, value) => {
                                updateParams(name, value)
                            }
                        },
                    ]}
                />

                {/* table */}
                <div className="pt-10">
                    <DisplayTable 
                        headings={[
                            { name: "#" },
                            { name: "Slot" },
                            { name: "Shift" },
                            { name: "Last Updated At" },
                            { name: "Actions" },
                        ]}
                    >
                        {
                            timeSlot?.map((item, index) => (
                                <TimeSlotTableRow
                                    key={index} 
                                    page={page} 
                                    limit={limit} 
                                    index={index} 
                                    item={item} 
                                    setTimeSlot={setTimeSlot}
                                />
                            ))
                        }
                    </DisplayTable>
                </div>

            </SectionDashboard>
        </section>
    )
}

export default TimeSlot


// time slot table 
const TimeSlotTableRow = ({page, limit, index, item, setTimeSlot}) => {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <TableRow>
            <TableCell className="border-r">
                {(page-1) * limit + index + 1}
            </TableCell>
            <TableCell className="border-r">
                {item?.slot}
            </TableCell>
            <TableCell className="border-r">
                {item?.shift?.toUpperCase()}
            </TableCell>

            <TableCell className="border-r">
                {format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
            </TableCell>

            {/* actions */}
            <TableCell>
                <div className="flex gap-2 items-center">
                    <CustomSheet
                        trigger={
                            <Button size="icon"><PencilLine /></Button>
                        }
                        title="Update Time slot"
                    >
                        <div className="pt-10">
                            <TimeSlotForm id={item?._id} data={item} setTimeSlot={setTimeSlot} />
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
                        heading={`Remove time slot : ${item?.slot} ?`}
                        description={`Are you sure you want to delete this time slot ?`}
                    >
                        <div className="flex gap-5 justify-end pt-10">
                            <Button
                                size="lg"
                                variant="destructive"
                                onClick={async () => {
                                    const result = await apiHandler(
                                        { url: `${administrationRoutes.timeSlot}/${item?._id}`, method: DELETE_METHOD },
                                        {},
                                        true
                                    )
                                    if (!result) return
                                    setTimeSlot(prev => prev.filter(section => section._id !== item?._id))
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