import FormLayout from "@/components/forms/FormLayout"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { format, parseISO } from "date-fns"
import { useState } from "react"
import { z } from "zod"


const SectionForm = ({id = null, data = null, setSection, batch}) => {

    const {department} = OtherStore()
    const [resetForm, setResetForm] = useState(false)

    // form schema
    const formSchema = z.object({
        batch: z.string().default(batch),
        dept: z.enum(department.map(item => item?._id), {
            errorMap: () => ({message: "Select a department"})
        }),
        section: z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]).default("A"),
        shift: z.enum(["day", "evening"]).default("day"),
        start: z.preprocess((value) => {
            return value ? new Date(value) : undefined
        }, z.date({
            errorMap: () => ({ message: "Start date and time required" })
        })),
        end: z.preprocess((value) => {
            return value ? new Date(value) : undefined
        }, z.date({
            errorMap: () => ({ message: "End date and time required" })
        })),
    })

    // form fields
    const formFields = [
        {
            type: "select",
            name: "dept",
            label: "Select department",
            placeholder: "Select department",
            selectItems: department
        },
        {
            type: "select",
            name: "section",
            label: "Select section",
            placeholder: "Select section",
            selectItems: [
                {_id: "A", name: "A"},
                {_id: "B", name: "B"},
                {_id: "C", name: "C"},
                {_id: "D", name: "D"},
                {_id: "E", name: "E"},
                {_id: "F", name: "F"},
                {_id: "G", name: "G"},
                {_id: "H", name: "H"},
                {_id: "I", name: "I"},
                {_id: "J", name: "J"},
                {_id: "K", name: "K"},
            ]
        },
        {
            type: "select",
            name: "shift",
            label: "Select shift",
            placeholder: "Select shift",
            selectItems: [
                {_id: "day", name: "DAY"},
                { _id: "evening", name: "EVENING"},
            ]
        },
        {
            type: "datetime-local",
            name: "start",
            label: "Section start",
            placeholder: "Enter date"
        },
        {
            type: "datetime-local",
            name: "end",
            label: "Section ends",
            placeholder: "Enter date"
        },
    ]

    // defaultValues
    let defaultValues = {
        dept: data?.dept ? data?.dept?._id : "",
        section: data?.section ? data?.section : "A",
        shift: data?.shift ? data?.shift : "day",
        start: data?.start ? format(parseISO(data?.start), "yyyy-MM-dd'T'HH:mm") : "",
        end: data?.end ? format(parseISO(data?.end), "yyyy-MM-dd'T'HH:mm") : "",
    }

    // submit form
    const onSubmit = async (value) => {
        setResetForm(false)
        const result = await apiHandler(
            { url: `${administrationRoutes.sections}/${id ? id : ""}`, method: id ? PATCH : POST},
            value,
            true
        )

        if(!result) return

        if(id) {
            setSection(prev => prev.map(item => item?._id == id ? result : item))
            return
        }
        setSection(prev => [result, ...prev])
        setResetForm(true)
    }

    return (
        <div className="pt-10">
            <FormLayout 
                formId="section-form"
                formSchema={formSchema}
                formFields={formFields}
                defaultValues={defaultValues || {}}
                onSubmit={onSubmit}
                resetForm={resetForm}
                buttonText="Save section"
            />
        </div>
    )
}

export default SectionForm