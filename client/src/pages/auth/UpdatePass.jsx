import { useState } from "react"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { z } from "zod"
import { Navigate, NavLink, useLocation, useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"

// form schema
const formSchema = z.object({
    pass: z.string().min(8, "Must be at least 8 digits"),
    confirmPass: z.string().min(8, "Must be at least 8 digits"),
}).superRefine(({confirmPass, pass}, ctx) => {
    if (confirmPass!== pass) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPass"]
        })
    }
})

let defaultValues = {
    pass: "",
    confirmPass: ""
}

// form fields
const formFields = [
    {
        type: "password",
        name: "pass",
        label: "Enter new password",
        placeholder: "Enter your new password"
    },
    {
        type: "password",
        name: "confirmPass",
        label: "Confirm new password",
        placeholder: "Confirm your new password"
    }
]

// find account page
const UpdatePass = () => {
    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // sent from find account page
    const location = useLocation()
    const userEmail = location.state?.email
    const nextDestination = location.state?.to

    // if no email return to before
    if(!userEmail) return <Navigate to={window.history.back()} replace={true} />

    const onSubmit = async (value) => {
        // console.log(value)
        let result = await apiHandler(publicRoutes.updatePass, {email: userEmail, pass: value?.pass}, true)
        if(!result) return
        setResetForm(true)
        if (nextDestination) return navigate(nextDestination, { state: { email: userEmail } })
        navigate("/auth/login")
    }

    return (
        <AuthPageLayout
            pageId={"update-pass-page"}
            pageTitle={"Update your password"}
        >
            <FormLayout
                formId="update-password"
                formSchema={formSchema}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonClass="w-full h-12"
                buttonText="update password"
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

export default UpdatePass