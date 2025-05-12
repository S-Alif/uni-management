import FormLayout from "@/components/forms/FormLayout"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useState } from "react"
import { z } from "zod"

const subjectSchema = z.object({
    name: z
        .string({ required_error: "Subject name is required" })
        .min(1, "Subject name must be at least 1 character long")
        .max(150, "Subject name must be at most 150 characters long"),

    code: z
        .string({ required_error: "Subject code is required" })
        .min(1, "Subject code must be at least 1 character long")
        .max(4, "Subject code must be at most 4 characters long"),

    about: z
        .string({ required_error: "About field is required" })
        .min(10, "About must be at least 10 characters long")
        .max(250, "About must be at most 250 characters long"),

    dept: z
        .string({ required_error: "Department ID is required" })
        .length(24, "Department ID must be exactly 24 characters long"),
})

const CourseForm = ({id = null, data, setSubject}) => {

    const [resetForm, setResetForm] = useState(false)
    const [loading, serLoading] = useState(false)

    const {department} = OtherStore()

    // form fields
    const formFields = [
        {
            type: "text",
            name: "name",
            label: "Subject Name",
            placeholder: "Enter subject name"
        },
        {
            type: "text",
            name: "code",
            label: "Subject Code",
            placeholder: "Enter subject code (max 4 characters)"
        },
        {
            type: "textarea",
            name: "about",
            label: "About Subject",
            placeholder: "Write a brief about the subject (10–250 characters)"
        },
        {
            type: "select",
            name: "dept",
            label: "Select Department",
            placeholder: "Select department",
            selectItems: department 
        },
    ]

    // default Values
    let defaultValues = {
        name: data?.name || "",
        code: data?.code || "",
        about: data?.about || "",
        dept: data?.dept ? data?.dept?._id : "",
    }

    // submit form
    const onSubmit = async (value) => {
        serLoading(true)
        setResetForm(false)
        const result = await apiHandler(
            {url:`${administrationRoutes.subjects}/${id ? id : ""}`, method: id ? PATCH : POST},
            value,
            true
        )
        serLoading(false)
        if(!result) return
        if(!id){
            setSubject(prev => [result, ...prev])
            setResetForm(true)
        }
        else{
            setSubject(prev => prev.map(subject => subject._id == id ? result : subject))
        }        
    }


    return (
        <FormLayout 
            formId="course-form"
            formSchema={subjectSchema}
            formFields={formFields}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            disabled={loading}
            buttonText="Save Course"
        />
    )
}

export default CourseForm