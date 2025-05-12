import FormLayout from "@/components/forms/FormLayout";
import { administrationRoutes, PATCH, POST } from "@/utils/api/apiConstants";
import apiHandler from "@/utils/api/apiHandler";
import { useState } from "react";
import { z } from "zod";

const SemesterForm = ({id, data, setSemester}) => {

    const semesterSchema = z.object({
        name: z.string()
            .min(1, "Name must be at least 1 character long")
            .max(100, "Name must be at most 100 characters long"),

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

        active: z
            .enum(["true", "false"])
            .optional()
            .transform((val) => val === "true"),
    })

    const [resetform, setResetform] = useState(false)
    const [loading, setLoading] = useState(false)

    const defaultValues = {
        name: data?.name || "",
        start: data?.start || "",
        end: data?.end || "",
        active: data?.active?.toString() || "false",
    }

    const formFields = [
        {
            type: "text",
            name: "name",
            label: "Semester name",
            placeholder: "Enter semester name"
        },
        {
            type: "datetime-local",
            name: "start",
            label: "Start date",
            placeholder: "Select start date and time"
        },
        {
            type: "datetime-local",
            name: "end",
            label: "End date",
            placeholder: "Select end date and time"
        },
        {
            type: "select",
            name: "active",
            label: "Is Active ?",
            placeholder: "Select status",
            selectItems: [
                { _id: "true", name: "Yes" },
                { _id: "false", name: "No" }
            ]
        }
    ]

    // submit form
    const onSubmit = async (value) => {
        // return console.log(value)
        setResetform(false)
        setLoading(true)
        const result = await apiHandler(
            {url: `${administrationRoutes.semester}/${id ? id : ""}`, method: id ? PATCH : POST},
            value,
            true
        )
        setLoading(false)
        if(!result) return
        if(!id){
            setSemester(prev => [result, ...prev])
            setResetform(true)
        }
        setSemester(prev => prev.map(sem => sem?._id === id ? result : sem))
    }

    return (
        <FormLayout 
            formId="semester-form"
            formSchema={semesterSchema}
            defaultValues={defaultValues}
            formFields={formFields}
            onSubmit={onSubmit}
            loading={loading}
            resetForm={resetform}
            buttonText="Save semester"
        />
    )
}

export default SemesterForm