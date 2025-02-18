import { z } from "zod"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { useState } from "react"
import { NavLink } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// form schema
const formSchema = z.object({
    email: z.string().email({message: "Please provide valid email"}),
    pass: z.string().min(8, { message: "Password must be at least 8 characters long"}),
})

let defaultValues = {
    email: "",
    pass: "",
}

// form fields
const formFields = [
    {
        type: "text",
        name: "email",
        label: "Email",
        placeholder: "Enter your email"
    },
    {
        type: "password",
        name: "pass",
        label: "Password",
        placeholder: "Enter your password"
    }
]

// login page
const Login = () => {

    const [resetForm, setResetForm] = useState(false)

    const onSubmit = (value) => {
        console.log(value)
        setResetForm(true)
    }

    return (
        <AuthPageLayout
            pageId={"login-page"}
            pageTitle={"Login to your account"}
        >
            <FormLayout 
                formId="login-form"
                formSchema={formSchema}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                buttonClass="w-full"
                buttonText="Login"
                formFields={formFields}
                resetForm={resetForm}
            />

            <div className="pt-5 text-center">
                <NavLink to={"#"} className={cn(buttonVariants({size: "lg", variant: "link"}), "text-[18px]")}>Forget Password</NavLink>
            </div>

        </AuthPageLayout>
    )
}

export default Login