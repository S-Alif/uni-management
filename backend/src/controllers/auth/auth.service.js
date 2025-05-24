import { adminLogin, resetPass, userRegistration } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import {ApiError} from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { roles } from "../../constants/rolesAndFiles.constants.js"
import usersModels from "../../models/users.models.js"
import otpModel from "../../models/otps.models.js"
import sendEmail from "../../utils/mail/sendMail.js"
import registrationSuccess from "../../utils/mail/mail-templates/registration-success.js"
import otpMail from "../../utils/mail/mail-templates/otp-mail.js"

const authService = {
    // login
    login: async (req) => {
        const data = req?.body
        const isDataValid = isValidData(adminLogin, data)
        if(!isDataValid) throw new ApiError(400, "Please provide all the data")

        const user = await usersModels.findOne({email: data?.email, isBlocked: false})
                            .populate({
                                path: "dept",
                                select: "shortName name _id"
                            })
                            .populate({
                                path: "batch",
                                select: "name _id"
                            })
                            .populate({
                                path: "section",
                                select: "shift section _id"
                            })
        if(!user) throw new ApiError(400, "No user found")
        
        const checkPass = await user.verifyPass(data?.pass)
        if(!checkPass) throw new ApiError(400, "Incorrect password")

        return user
    },

    // register
    register: async (req) => {
        let data = req?.body
        const isDataValid = isValidData(userRegistration, data)
        if(!isDataValid) throw new ApiError(400, "Please provide all the data")
        
        if(data?.role != roles.ADMIN) throw new ApiError(403, "Cannot register user")
        const countAdmin = await usersModels.countDocuments({role: data?.role})
        if(countAdmin >= 1) throw new ApiError(400, "Maximum number of admin users reached")

        await usersModels.create(data)

        // send a mail to the user
        // await sendEmail(data?.email, registrationSuccess(data?.name), "Registration success notification")

        return new ApiResponse(200, {}, "Registration successful")        
    },

    // send otp
    sendOtp: async (req) => {
        let email = req?.body?.email
        if (!email) throw new ApiError(400, "No email provided")

        const user = await usersModels.findOne({ email: email }).lean()
        if (!user) throw new ApiError(400, "Account does not exist")

        let otpCode = Math.floor(100000 + Math.random() * 900000)
        await otpModel.create({ email, otpCode })

        await sendEmail(email, otpMail(user?.name, otpCode), "Account verification")

        return new ApiResponse(200, {}, "Verification email sent")
    },

    // verify otp
    verifyOtp: async (req) => {
        const checkOtp = await otpModel.findOne({ email: req.body?.email, otpCode: req.body?.otpCode })
        if (checkOtp == null || !checkOtp) throw new ApiError(400, "Otp expired")

        await otpModel.updateOne({ email: req.body.email, otpCode: req.body.otpCode, verified: false }, { verified: true })

        if (req.body?.type && req.body.type == 10) {
            await usersModels.updateOne({ email: req.body.email }, { verified: true })
        }

        return new ApiResponse(200, {}, "Account verified successfully")
    },

    // rest password
    resetPassword: async (req) => {
        const data = req?.body
        const validate = isValidData(resetPass, data)
        if(!validate) throw new ApiError(400, "Invalid reset password")
        
        const user = await usersModels.findOne({email: data?.email})
        if(!user) throw new ApiError(400, "User not found")
        user.pass = data?.pass
        user.save()

        // notification email to user
        await sendEmail(data?.email, "Your password was changed", "Password reset confirmation")
        return new ApiResponse(200, {}, "Password reset successfully")
    }
}

export default authService