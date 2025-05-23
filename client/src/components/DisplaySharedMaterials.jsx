// id - can be batch section or materials id

import { DELETE_METHOD, GET, studentRoutes, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"
import DisplayTable from "./DisplayTable"
import { TableCell, TableRow } from "./ui/table"
import { format } from "date-fns"
import { Button, buttonVariants } from "./ui/button"
import { Eye, Trash2 } from "lucide-react"
import SectionDashboard from "./SectionDashboard"
import DisplayAvatar from "./DisplayAvatar"
import { NavLink } from "react-router"

const DisplaySharedMaterials = ({id, role}) => {

    const [loading, setLoading] = useState(false)
    const [materials, setMaterials] = useState([])
    // const [totalPages, setTotalPages] = useState(0)
    // const [page, setPage] = useState(1)

    const getMaterials = async () => {
        let url = `${teacherRoutes.sharedMaterials}/${id}`
        if(role === 1999) url = `${studentRoutes.sharedMaterials}/${id}`

        setLoading(true)
        const result = await apiHandler({url: url, method: GET})
        setLoading(false)

        if(!result) return
        setMaterials(result)
    }

    useEffect(() => {
        getMaterials()
    }, [])

    return (
        <SectionDashboard
            loading={loading}
            loadingType="table"
            {...(role === 1999 ? { sectionTitle: "Shared Materials" } : {})}
        >
            <div className="pt-10">
                <DisplayTable
                    headings={[
                        { name: "#" },
                        ...(role == 2022 ?
                            [{ name: "Batch Section" },
                            { name: "Shared date" },
                            { name: "Action" }] : []
                        ),
                        ...(role == 1999 ?
                            [{ name: "Shared by" },
                            { name: "Material name" },
                            { name: "View / Download" }] : []
                        ),
                    ]}
                >
                    {
                        materials?.map((item, index) => (
                            <SharedMaterialsRows
                                key={index}
                                item={item}
                                index={index}
                                getMaterials={getMaterials}
                                role={role}
                            />
                        ))
                    }
                    {
                        materials.length == 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-lg">No materials shared</TableCell>
                            </TableRow>
                        )
                    }

                </DisplayTable>
            </div>
        </SectionDashboard>
    )
}

export default DisplaySharedMaterials


// table rows
const SharedMaterialsRows = ({item, index, getMaterials, role}) => {
    return (
        <TableRow>
            <TableCell className="border-r">{index + 1}</TableCell>
            {
                role == 2022 && (
                    <>
                        <TableCell className="border-r">{item?.batchSection?.batch?.name} - {item?.batchSection?.section} - {item?.batchSection?.shift?.toUpperCase()}</TableCell>
                        <TableCell className="border-r">
                            {format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
                        </TableCell>
                        <TableCell>
                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={async () => {
                                    const result = await apiHandler(
                                        {url: `${teacherRoutes.sharedMaterials}/${item?._id}`, method: DELETE_METHOD},
                                        {},
                                        true
                                    )
                                    if(!result) return
                                    getMaterials()
                                }}
                            >
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </> 
                )
            }
            {
                role == 1999 && (
                    <>
                        <TableCell className="border-r">
                            <DisplayAvatar
                                img={item?.materialId?.courseTeacher?.image}
                                alt={item?.materialId?.courseTeacher?.name}
                            >
                                <NavLink to={`/academics/teachers/${item?.materialId?.courseTeacher?._id}`}>
                                    <h3>{item?.materialId?.courseTeacher?.name}</h3>
                                </NavLink>
                            </DisplayAvatar>
                        </TableCell>
                        <TableCell className="border-r">{item?.materialId?.name}</TableCell>
                        <TableCell>
                            <NavLink
                                className={buttonVariants({size: "icon"})}
                                to={item?.materialId?.materialLocation}
                                target="_blank"
                            >
                                <Eye />
                            </NavLink>
                        </TableCell>
                    </>
                )
            }

        </TableRow>
    )
}