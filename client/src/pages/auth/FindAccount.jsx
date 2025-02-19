import { useState } from "react"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { z } from "zod"
import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// form schema
const formSchema = z.object({
    email: z.string().email("Please provide valid email")
})

let defaultValues = {
    email: ""
}

// form fields
const formFields = [
    {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Enter your email"
    }
]

// find account page
const FindAccount = () => {
    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = (value) => {
        console.log(value)
        setResetForm(true)
    }

    return (
        <AuthPageLayout
            pageId={"find-account-page"}
            pageTitle={"Find your account"}
        >
            <FormLayout 
                formId="find-account"
                formSchema={formSchema}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonClass="w-full h-12"
                buttonText="Send OTP"
                formFields={formFields}
                resetForm={resetForm}
                disabled={loading}
            />

            <div className="pt-5 text-center">
                <NavLink to={"/auth/login"} className={cn(buttonVariants({ size: "lg", variant: "link" }), "text-[18px]")}>Back to login</NavLink>
            </div>

        </AuthPageLayout>
    )
}

export default FindAccount