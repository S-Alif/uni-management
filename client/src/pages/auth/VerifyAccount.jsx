import { useEffect, useState } from "react"
import AuthPageLayout from "./layout/AuthPageLayout"
import FormLayout from "@/components/forms/FormLayout"
import { z } from "zod"
import { Navigate, NavLink, useLocation, useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import apiHandler from "@/utils/api/apiHandler"
import { publicRoutes } from "@/utils/api/apiConstants"

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
    const [countdown, setCountdown] = useState(100)
    const [isDisabled, setIsDisabled] = useState(true)

    // sent from find account page
    const location = useLocation()
    const userEmail = location.state?.email
    const nextDestination = location.state?.to

    const navigate = useNavigate()

    if (!userEmail) {
        return <Navigate to={window.history.back()} replace={true} />
    }

    // email resent countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else {
            setIsDisabled(false)
        }
    }, [countdown])

    // submit form
    const onSubmit = async (value) => {
        let result = await apiHandler(publicRoutes.verifyOtp, {email: userEmail, ...value}, true)
        if(!result) return
        setResetForm(true)
        if (nextDestination) return navigate(nextDestination, { state: { email: userEmail } })
        navigate("/auth/login")
    }

    return (
        <AuthPageLayout
            pageId={"verify-account-page"}
            pageTitle={"Verify your account"}
        >
            {/* load the form */}
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

            {/* resned email button */}
            <div className="pt-5 flex justify-center items-center flex-col gap-1">

                <div className="flex items-center">
                    <p className="text-[17px]">Didn't receive the code ?</p>
                    <Button
                        type="submit"
                        size={"lg"}
                        variant={"link"}
                        className="text-[17px] !px-2"
                        disabled={isDisabled}
                        onClick={async () => {
                            let sendOtp = await apiHandler(publicRoutes.sendOtp, { email: userEmail }, true)
                            if (!sendOtp) return
                            setResetForm(true)
                            setCountdown(100)
                            setIsDisabled(true)
                        }}
                    >
                        Resend
                    </Button>
                    {isDisabled && <p className="text-[17px]">{`(${countdown}s)`}</p>}
                </div>

                <NavLink to={"/auth/login"} className={cn(buttonVariants({ size: "lg", variant: "link" }), "text-[18px] px-0")}>Back to login</NavLink>
            </div>

        </AuthPageLayout>
    )
}

export default VerifyAccount