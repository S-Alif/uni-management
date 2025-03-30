import { useState } from "react"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { z } from "zod"
import { NavLink, replace, useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"

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
    const navigate = useNavigate()

    // send otp after finding account
    const onSubmit = async (value) => {
        let sendOtp = await apiHandler(publicRoutes.sendOtp, value, true)
        if(!sendOtp) return
        setResetForm(true)
        navigate("/auth/verify-account", {
            state: {
                ...value,
                to: "/auth/update-pass"
            },
            replace: true
        })
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