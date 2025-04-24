import FormLayout from "@/components/forms/FormLayout"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useEffect, useState } from "react"
import { z } from "zod"


const FacultyForm = ({id = null, data = null}) => {

    const [teacherList, setTeacherList] = useState([])
    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const {setState, faculty} = OtherStore()

    // get teacher list
    useEffect(() => {
        (async () => {
            const result = await apiHandler(
                { url: `${administrationRoutes.teachers}?designation=Professor`, method: GET },
                {},
                false
            )
            if (!result) return
            setTeacherList(result?.users)
        })()
    }, [])

    // form schema
    const formSchema = z.object({
        name: z.string().min(1, "Name is required").max(100, "Name is too long"),
        about: z.string().min(10, "Description is required").max(100000, "Description is too long"),
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
        shortDesc: z.string().min(10, "Length 10 - 200 characters").max(200, "Length 10 - 200 characters").default(""),
        dean: z.string().optional().default(""),
        msgFromDean: z.string().optional().default(""),
    })

    // form fields
    const formFields = [
        {
            type: "text",
            name: "name",
            label: "Enter faculty name",
            placeholder: "Faculty name"
        },
        {
            type: "file",
            name: "image",
            label: "Faculty image",
            placeholder: "Faculty image"
        },
        {
            type: "file",
            name: "bgImage",
            label: "Faculty background image",
            placeholder: "Faculty background image"
        },
        {
            type: "textarea",
            name: "shortDesc",
            label: "Faculty short description",
            placeholder: "Write faculty short description"
        },
        {
            type: "select",
            name: "dean",
            label: "Select dean",
            selectItems: teacherList,
        },
        {
            type: "textarea",
            name: "msgFromDean",
            label: "Message from dean",
            placeholder: "Write message from dean"
        },
        {
            type: "richText",
            name: "about",
            label: "About faculty",
            placeholder: "Write about the faculty"
        },
    ]

    // default values
    const defaultValues = {
        name: id ? data?.name : "",
        about: id ? data?.about : "",
        shortDesc: id ? data?.shortDesc : "",
        image: id ? data?.image : "",
        bgImage: id ? data?.bgImage : "",
        dean: id ? data?.dean?._id : "",
        msgFromDean: id ? data?.msgFromDean : ""
    }

    // save faculty
    const onSubmit = async (value) => {
        setLoading(true)
        const formData = new FormData()

        Object.keys(value).forEach((key) => {
            if (value[key] instanceof File || value[key] != "") {
                if ((key === "image" || key === "bgImage") && (value[key] instanceof File)) {
                    formData.append(key, value[key])
                }
                else {
                    formData.append(key, value[key])
                }
            }
        })

        const saveFaculty = await apiHandler(
            { url: `${administrationRoutes.faculty}/${id ? id : ""}`, method: id ? PATCH : POST},
            formData,
            true
        )

        setLoading(false)
        if(!saveFaculty) return
        if(id){
            let newList = faculty.filter((e) => e._id !== id ? e : saveFaculty)
            setState("faculty", newList)
        }
        else{
            setState("faculty", [...faculty, saveFaculty])
        }
        setResetForm(true)
    }


    return (
        <div>
            <FormLayout
                formId="faculty-form"
                formSchema={formSchema}
                formFields={formFields}
                defaultValues={defaultValues || {}}
                onSubmit={onSubmit}
                buttonText="Save faculty"
                resetForm={resetForm}
                disabled={loading}
                // buttonClass="bg-primary text-white hover:bg-primary/90"
            />
        </div>
    )
}

export default FacultyForm