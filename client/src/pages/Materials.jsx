import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserStore from "@/stores/UserStore"
import { DELETE_METHOD, POST, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { errorToast, infoToast } from "@/utils/toastNotification"
import { useState } from "react"

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
        setMaterials([...materials, result])
        setFile({
            file: null,
            name: ""
        })
    }
    

    return (
        <section className="section-layout" id="materials-page">
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
                                // await apiHandler(
                                //     {url: `${teacherRoutes.materials}/123`, method: DELETE_METHOD},
                                //     {},
                                //     true
                                // )
                            }}
                            disabled={loading}
                        >
                            Upload
                        </Button>
                    </div>
                </div>

            </SectionDashboard>

            {/* show the files */}
            
        </section>
    )
}

export default Materials