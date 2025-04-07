import FormLayout from "@/components/forms/FormLayout"
import { administrationRoutes, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { useState } from "react"
import { z } from "zod"

// form schema
const formSchema = z.object({
    name: z.string().min(1).max(3).superRefine((value, ctx) => {
        if(isNaN(value)) ctx.addIssue({
            code: "custom",
            message: "Batch number must be a number",
            // path: ["name"]
        })
    })
})

// form fields
const formFields = [
    {
        type: "text",
        name: "name",
        label: "Enter new batch no",
        placeholder: "Enter your new batch no (e.g: 27)"
    }
]

const BatchForm = ({id = null, data = null, setBatch}) => {

    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)

    // defaultValues
    let defaultValues = { name: data?.name || "" }

    // save batch
    const onSubmit = async (value) => {
        setResetForm(false)
        setLoading(true)
        const result = await apiHandler(
            {url: `${administrationRoutes.batch}/${id || ""}`, method: id ? PATCH : POST},
            value,
            true,
        )
        setLoading(false)
        if(!result) return

        if(id){
            setBatch(prev => {
                return prev.map(batch => batch._id === id ? result : batch)
            })
            return
        }
        setBatch(prev => [result, ...prev])
        setResetForm(true)
    }




    return (
        <div>
            <FormLayout 
                formId="batch-form"
                formSchema={formSchema}
                defaultValues={defaultValues}
                formFields={formFields}
                onSubmit={onSubmit}
                buttonText="Save batch"
                resetForm={resetForm}
                disabled={loading}
            />
        </div>
    )
}

export default BatchForm