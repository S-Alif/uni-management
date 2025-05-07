import FormLayout from '@/components/forms/FormLayout';
import { administrationRoutes, PATCH, POST } from '@/utils/api/apiConstants';
import apiHandler from '@/utils/api/apiHandler';
import { useState } from 'react';
import { z } from 'zod';

const TimeSlotForm = ({id, data, setTimeSlot}) => {

    const timeSlotSchema = z.object({
        slot: z.string({
            required_error: "Slot is required",
            invalid_type_error: "Slot must be a string"
        }),

        shift: z.enum(["day", "evening"]).optional().default("day"),
    })

    let defaultValues = {
        slot: data?.slot || "",
        shift: data?.shift || "day",
    }

    const timeSlotFormFields = [
        {
            type: "text",
            name: "slot",
            label: "Slot",
            placeholder: "Enter time slot"
        },
        {
            type: "select",
            name: "shift",
            label: "Select shift",
            placeholder: "Select shift",
            selectItems: [
                { _id: "day", name: "DAY" },
                { _id: "evening", name: "EVENING" }
            ]
        }
    ];


    const [loading, setLoading] = useState(false)
    const [resetForm, setResetForm] = useState(false)

    const onSubmit = async (values) => {
        setLoading(true)
        setResetForm(false)
        const result = await apiHandler(
            {url: `${administrationRoutes.timeSlot}/${id? id : ""}`, method: id ? PATCH : POST},
            values,
            true
        )
        setLoading(false)
        if(!result) return

        if(!id){
            setTimeSlot(prev => [result,...prev])
            setResetForm(true)
        }
        setTimeSlot(prev => prev.map(slot => slot?._id === id ? result : slot))
    }

    return (
        <FormLayout 
            formId="time-slot-form"
            formSchema={timeSlotSchema}
            defaultValues={defaultValues}
            formFields={timeSlotFormFields}
            onSubmit={onSubmit}
            loading={loading}
            resetForm={resetForm}
            buttonText="Save Time Slot"
        />
    )
}

export default TimeSlotForm