import DisplayDialog from "@/components/DisplayDialog"
import DisplaySharedMaterials from "@/components/DisplaySharedMaterials"
import DisplayTable from "@/components/DisplayTable"
import SectionDashboard from "@/components/SectionDashboard"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableCell, TableRow } from "@/components/ui/table"
import useQueryParams from "@/hooks/useQueryParams"
import { DELETE_METHOD, GET, POST, studentRoutes, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { errorToast, infoToast } from "@/utils/toastNotification"
import { format } from "date-fns"
import { Eye, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const fileArray = ["image/jpeg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "text/csv"]
const fileSize = 3 * 1024 * 1024

const handleFileCheck = (files) => {
    const file = files
    if (fileArray.includes(file.type) && file.size <= fileSize) {
        return true
    } 
    return false
}


// main
const Materials = ({role}) => {

    const [loading, setLoading] = useState(false)
    const [materials, setMaterials] = useState([])
    const [file, setFile] = useState({   // used when teacher is uploading a file
        file: null,
        name: ""
    })
    const [totalPages, setTotalPages] = useState(0)
    const {values: {page = 1}, updateParams} = useQueryParams(["page"])

    // upload file
    const uploadFile = async () => {
        if(!file.file || file.name.trim().length < 3) return infoToast("Please enter all the data")
        if (!handleFileCheck(file.file)) return errorToast("Invalid file type or file size")
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file.file)
        formData.append("name", file.name)
        const result = await apiHandler(
            {url: `${teacherRoutes.materials}`, method: POST},
            formData,
            true
        )
        setLoading(false)
        if(!result) return
        getMaterials()
        setFile({
            file: null,
            name: ""
        })
    }

    // get material based on role
    const getMaterials = async () => {
        let url = `${teacherRoutes.materials}?page=${page}`
        if(role == 1999) url = `${studentRoutes.materials}`

        setLoading(true)
        const result = await apiHandler(
            {url, method: GET},
            {},
            true
        )
        setLoading(false)
        if(!result) return
        setMaterials(result?.materials)
        setTotalPages(result?.totalPage)
    }

    // get material on page load
    useEffect(() => {
        getMaterials()
    }, [page])
    

    return (
        <section className="section-layout" id="materials-page">

            {/* form */}
            <SectionDashboard
                sectionTitle={"Add Materials"}
                sectionClassName={role == 1999 && "hidden"}
            >
                <div className="pt-10">
                    <div className="w-full max-w-[500px] border-0">
                        <div className="mb-5">
                            <p className="pb-3">File name</p>
                            <Input
                                type="text"
                                placeholder="File name"
                                value={file.name}
                                onChange={(e) => setFile(prev => ({ ...prev, name: e?.target?.value }))}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <p className="pb-3">File</p>
                            <Input
                                type="file"
                                onChange={(e) => setFile(prev => ({ ...prev, file: e?.target?.files[0] }))}
                                disabled={loading}
                            />
                        </div>
                        <Button
                            size="lg"
                            className="mt-5"
                            onClick={async () => {
                                uploadFile()
                                
                            }}
                            disabled={loading}
                        >
                            Upload
                        </Button>
                    </div>
                </div>

            </SectionDashboard>

            {/* show the files */}
            <SectionDashboard
                sectionTitle={"Materials"}
                loading={loading}
                loadingType="table"
                sectionClassName={role == 1999 && "hidden"}
            >
                <div className="pt-10">
                    <DisplayTable
                        headings={[
                            { name: "#" },
                            { name: "Name" },
                            { name: "View/Download" },
                            { name: "Last updated at" },
                            { name: "Actions" }
                        ]}
                    >
                        {
                            materials?.map((item, index) => (
                                <MaterialRow
                                    key={index}
                                    item={item}
                                    page={page}
                                    index={index}
                                    role={role}
                                    getMaterials={getMaterials}
                                />
                            ))
                        }

                    </DisplayTable>
                </div>
            </SectionDashboard>

        </section>
    )
}

export default Materials


// material table row
const MaterialRow = ({item, page, index, getMaterials, role}) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <TableRow>
            <TableCell className="border-r">{(page - 1) * 60 + index + 1}</TableCell>
            <TableCell className="border-r">
                <DisplayDialog
                    dialogClassName="lg:max-w-[900px] xl:max-w-[1100px]"
                    heading={`${item?.name} shared to`}
                    trigger={
                        <Button
                            size="lg"
                            variant="link"
                            className="text-lg"
                        >
                            {item?.name}
                        </Button>
                    }
                >
                    <DisplaySharedMaterials id={item?._id} role={role} />
                </DisplayDialog>
            </TableCell>

            <TableCell className="border-r flex gap-2">
                <a 
                    href={item?.materialLocation} 
                    target="_blank" 
                    rel="noreferrer"
                    className={buttonVariants({size:"icon"})}
                >
                    <Eye />
                </a>
            </TableCell>

            <TableCell className="border-r">
                {format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
            </TableCell>

            <TableCell className="border-r flex gap-2">
                <DisplayDialog
                    openState={dialogOpen}
                    setOpenstate={setDialogOpen}
                    heading={"Delete material"}
                    description={"Are you sure you want to delete this material? Deleting it will remove all the shared materials of this material"}
                    trigger={
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => setDialogOpen(true)}
                        >
                            <Trash2 />
                        </Button>
                    }
                >
                    <div className="flex justify-end gap-2">
                        <Button
                            size="lg"
                            variant="destructive"
                            onClick={async () => {
                                const result = await apiHandler(
                                    { url: `${teacherRoutes.materials}/${item?._id}`, method: DELETE_METHOD },
                                    {},
                                    true
                                )
                                if (!result) return
                                getMaterials()
                                setDialogOpen(false)
                            }}
                        >
                            Delete Material
                        </Button>
                        <Button
                            size="lg"
                            variant="blue"
                            onClick={() => setDialogOpen(false)}
                        >
                            Exit
                        </Button>
                    </div>
                </DisplayDialog>
            </TableCell>
        </TableRow>
    )
}