import { useState } from "react"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { z } from "zod"
import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// form schema
const formSchema = z.object({
    otpCode: z.string().length(6, "Must be 6 digits")
})

let defaultValues = {
    email: ""
}

// form fields
const formFields = [
    {
        type: "otp",
        name: "otpCode",
        label: "Enter Otp",
        placeholder: "Enter your otp"
    }
]

// find account page
const VerifyAccount = () => {
    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = (value) => {
        console.log(value)
        setResetForm(true)
    }

    return (
        <AuthPageLayout
            pageId={"verify-account-page"}
            pageTitle={"Verify your account"}
        >
            <FormLayout
                formId="verify-account"
                formSchema={formSchema}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonClass="w-full h-12"
                buttonText="Verify Account"
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

export default VerifyAccount