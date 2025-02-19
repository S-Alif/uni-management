import FormLayout from "@/components/forms/FormLayout"
import AuthPageLayout from "./layout/AuthPageLayout"
import { z } from "zod"
import { useState } from "react"


// form schema
const formSchema = z.object({
    name: z.string().min(5, "Name must be at least 3 characters long").max(80, "Name can't be more than 80 characters long"),
    email: z.string().email("Please provide valid email"),
    phone: z.string().min(10, "Please provide valid phone").max(15, "Please provide valid phone"),
    pass: z.string().min(8, "Password must be at least 8 characters long"),
    personalId: z.string().min(8, "Personal Id must be at least 8 characters long"),
    address: z.string().min(10, "Adress must be at least 10 characters long").max(300, "Address can't be more than 300 characters long"),
})

let defaultValues = {
    name: "",
    email: "",
    phone: "",
    pass: "",
    personalId: "",
    address: ""
}

// form fields
const formFields = [
    {
        type: "text",
        name: "name",
        label: "Your name",
        placeholder: "Enter your full name"
    },
    {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Enter your email"
    },
    {
        type: "text",
        name: "personalId",
        label: "Personal Id",
        placeholder: "Enter your personal Id"
    },
    {
        type: "text",
        name: "phone",
        label: "Phone",
        placeholder: "Enter your phone number"
    },
    {
        type: "password",
        name: "pass",
        label: "Password",
        placeholder: "Enter your password"
    },
    {
        type: "text",
        name: "address",
        label: "Address",
        placeholder: "Enter your address"
    }
]

// admin register page
const AdminRegister = () => {

    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = (value) => {
        console.log(value)
        setResetForm(true)
    }

    return (
        <AuthPageLayout
            pageId={"admin-register-page"}
            pageTitle={"Register as an admin"}
        >
            <FormLayout
                formId="admin-register"
                formSchema={formSchema}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonClass="w-full h-12"
                buttonText="Register account"
                formFields={formFields}
                resetForm={resetForm}
                disabled={loading}
            />

        </AuthPageLayout>
    )
}

export default AdminRegister