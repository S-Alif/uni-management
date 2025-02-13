import { userLogin, userRegistration } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import {ApiError} from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { roles } from "../../constants/rolesAndFiles.constants.js"
import usersModels from "../../models/users.models.js"

const authService = {
    // login all users
    login: async (req) => {
        const data = req?.body
        const isDataValid = isValidData(userLogin, data)
        if(!isDataValid) throw new ApiError(404, "Please provide all the data")

        const user = await usersModels.findOne({email: data?.email}).lean()
        if(!user) throw new ApiError(404, "No user found")
        
        const checkPass = await user.verifyPass(data?.pass)
        if(!checkPass) throw new ApiError(401, "Incorrect password")

        return new ApiResponse(200, user)
    },

    // register
    register: async (req) => {
        let data = req?.body
        const isDataValid = isValidData(userRegistration, data)
        if(!isDataValid) throw new ApiError(404, "Please provide all the data")
        
        if(data?.role != roles.ADMIN) throw new ApiError(403, "Cannot register user")
        const countAdmin = await usersModels.countDocuments({role: data?.role})
        if(countAdmin >= 1) throw new ApiError(403, "Maximum number of admin users reached")

        const result = await usersModels.create(data).lean()

        // send a mail to the user

        return new ApiResponse(200, {}, "Registration successful")        
    },

    // send otp
    sendOtp: async (req) => {

    },

    // verify oto
    verifyOtp: async (req) => {

    },

    // rest password
    resetPassword: async (req) => {

    }
}

export default authService