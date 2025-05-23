import FormLayout from "@/components/forms/FormLayout"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"
import { z } from "zod"


const DepartmentForm = ({id = null, data = null}) => {

    const { department, faculty, getInitialData } = OtherStore()
    const [resetForm, setResetForm] = useState(false)
    const [teacherList, setTeacherList] = useState([])
    const [loading, setLoading] = useState(false)

    // get teacher list
    useEffect(() => {
        (async () => {
            const [result1, result2] = await Promise.all([
                apiHandler({ url: `${administrationRoutes.teachers}?designation=Professor`, method: GET }),
                apiHandler({ url: `${administrationRoutes.teachers}?designation=Assistant Professor`, method: GET })
            ])
            if (!result1 || !result2) return
            setTeacherList([
                ...(result1?.users ? result1?.users : []),
                ...(result2?.users ? result2?.users : []),
            ])
        })()
    }, [])

    // form schema
    const formSchema = z.object({
        name: z.string().min(1, "Name is required").max(100, "Name is too long"),
        shortName: z.string().min(1, "Short name is required").max(10, "Short name is too long"),
        about: z.string().min(10, "Description is required").max(100000, "Description is too long"),
        faculty: z.string().length(24, "Faculty is required").default(""),
        image: z.any().optional().superRefine((value, ctx) => {
            if (Array.isArray(value) && value.length > 0) {
                const file = value[0]
                if (!(file instanceof File)) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Invalid file type",
                    })
                }
                if (file.size > 5 * 1024 * 1024) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Image size exceeds 5MB",
                    })
                }
            }
        }),
        bgImage: z.any().optional().superRefine((value, ctx) => {
            if (Array.isArray(value) && value.length > 0) {
                const file = value[0]
                if (!(file instanceof File)) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Invalid file type",
                    })
                }
                if (file.size > 5 * 1024 * 1024) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Image size exceeds 5MB",
                    })
                }
            }
        }),
        deptHead: z.string().optional().default(""),
        shortDesc: z.string().min(10, "Length 10 - 200 characters").max(200, "Length 10 - 200 characters").default(""),
        msgFromDeptHead: z.string().optional().default(""),
    })

    // form fields
    const formFields = [
        {
            type: "text",
            name: "name",
            label: "Enter department name",
            placeholder: "Department name"
        },
        {
            type: "text",
            name: "shortName",
            label: "Enter short name",
            placeholder: "Department short name"
        },
        {
            type: "file",
            name: "image",
            label: "Department image",
            placeholder: "Upload department image"
        },
        {
            type: "file",
            name: "bgImage",
            label: "Department background image",
            placeholder: "Upload department background image"
        },
        {
            type: "select",
            name: "faculty",
            label: "Select faculty",
            placeholder: "Select faculty",
            selectItems: faculty,
        },
        {
            type: "select",
            name: "deptHead",
            label: "Select department head",
            selectItems: teacherList,
        },
        {
            type: "textarea",
            name: "shortDesc",
            label: "Department short description",
            placeholder: "Write department short description"
        },
        {
            type: "textarea",
            name: "msgFromDeptHead",
            label: "Message from department head",
            placeholder: "Write message from department head"
        },
        {
            type: "richText",
            name: "about",
            label: "About department",
            placeholder: "Write about the department"
        },
    ]

    // default values
    const defaultValues = {
        name: id ? data?.name : "",
        shortName: id ? data?.shortName : "",
        faculty: id ? data?.faculty?._id : "",
        about: id ? data?.about : "",
        shortDesc: id ? data?.shortDesc : "",
        image: id ? data?.image : "",
        bgImage: id ? data?.bgImage : "",
        deptHead: id ? data?.deptHead?._id : "",
        msgFromDeptHead: id ? data?.msgFromDeptHead : ""
    }

    // form submit
    const onSubmit = async (value) => {
        setLoading(true)
        const formData = new FormData()

        Object.keys(value).forEach((key) => {
            if(value[key] instanceof File || value[key] != "") {
                if ((key === "image" || key=== "bgImage") && (value[key] instanceof File)) {
                    formData.append(key, value[key])
                }
                else {
                    formData.append(key, value[key])
                }
            }
        })

        const result = await apiHandler(
            { url: `${administrationRoutes.department}/${id ? id : ""}`, method: id ? PATCH : POST },
            formData,
            true
        )
        setLoading(false)
        if (!result) return
        setResetForm(true)
        getInitialData()
    }

    return(
        <div>
            <FormLayout 
                formId="department-form"
                formSchema={formSchema}
                formFields={formFields}
                defaultValues={defaultValues || {}}
                onSubmit={onSubmit}
                resetForm={resetForm}
                buttonText="Save department"
                disabled={loading}
            />
        </div>
    )
}

export default DepartmentForm