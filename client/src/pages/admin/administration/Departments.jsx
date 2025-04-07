import CustomSheet from "@/components/CustomSheet"
import DisplayTable from "@/components/DisplayTable"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import OtherStore from "@/stores/OtherStore"
import { format } from "date-fns"
import { PencilLine, Plus, Trash2 } from "lucide-react"
import DepartmentForm from "./forms/DepartmentForm"
import DisplayAvatar from "@/components/DisplayAvatar"
import DisplayDialog from "@/components/DisplayDialog"


const Departments = () => {

    const { department, setState } = OtherStore()

    return(
        <section className="section-layout">
            {/* controls */}
            <div className="flex justify-between items-end">
                <h1 className="page-title">Deapartment list</h1>
                <CustomSheet
                    trigger={
                        <Button size="lg">
                            <span className="hidden md:block">Create department</span> <span className="!text-2xl"><Plus size={50} /></span>
                        </Button>
                    }
                    title="Create new department"
                >
                    <div className="pt-10">
                        <DepartmentForm />
                    </div>
                </CustomSheet>
            </div>

            {/* department list */}
            <div className="pt-10">
                <DisplayTable
                    headings={[
                        { name: "#" },
                        { name: "Department" },
                        { name: "Faculty" },
                        { name: "Last Updated" },
                        { name: "Actions" },
                    ]}
                >
                    {
                        department?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="border-r">{index + 1}</TableCell>
                                <TableCell className="border-r">
                                    <DisplayAvatar img={item?.image} alt="FY">
                                        <DisplayDialog
                                            trigger={<p className="cursor-pointer">{item?.name} ({item?.shortName})</p>}
                                            heading={"Department details"}
                                        >
                                            <div className="pt-8">
                                                {item?.about}
                                            </div>

                                        </DisplayDialog>
                                    </DisplayAvatar>
                                </TableCell>
                                <TableCell className="border-r">
                                    {item?.faculty?.name}
                                </TableCell>
                                <TableCell className="border-r">
                                    {format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
                                </TableCell>
                                <TableCell>
                                    {/* actions */}
                                    <div className="flex gap-2 items-center">
                                        <CustomSheet
                                            trigger={
                                                <Button size="icon"><PencilLine /></Button>
                                            }
                                            title={"Edit department"}
                                        >
                                            <div className="pt-10">
                                                <DepartmentForm id={item?._id} data={item} />
                                            </div>
                                        </CustomSheet>

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
                        ))

                    }

                </DisplayTable>
            </div>
        </section>
    )
}

export default Departments