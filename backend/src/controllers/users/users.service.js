import { userRegistration, userUpdateByAdmin, userUpdateByHimself } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import {ApiError} from "../../utils/api/response/apiError.js"
import {ApiResponse} from "../../utils/api/response/apiResponse.js"
import { roles } from "../../constants/rolesAndFiles.constants.js"
import usersModel from "../../models/users.models.js"
import sendEmail from "../../utils/mail/sendMail.js"
import { removeMedia, uploadMedia } from "../../utils/files/mediaUpload.js"
import crypto from "crypto"
import userRegistrationMail from "../../utils/mail/mail-templates/user-registration-mail.js"


const userService = {

    // register a new user - teacher or student
    registerUser: async (req) => {
        const data = req?.body
        if (data?.role == roles.ADMIN) throw new ApiError(400, "Cannot register user")

        const validated = isValidData(userRegistration, data)
        if (!validated) throw new ApiError(400, "Please provide all the data")

        // upload image if there is
        const file = req?.files?.image
        if (!file) {
            throw new ApiError(400, "No user image uploaded")
        }

        // create password
        data.pass = crypto.randomUUID()

        const createNewUser = await usersModel.create(data)
        
        // upload user image
        const imageUrl = await uploadMedia(file)

        const userData = await usersModel.findOneAndUpdate({_id: createNewUser?._id}, {image: imageUrl}, {upsert: true, new: true})
                        .select("-pass -refreshToken")
                        .populate({
                            path: "dept",
                            select: "name shortName _id"
                        })
                        .populate({
                            path: "batch",
                            select: "name _id"
                        })
                        .populate({
                            path: "section",
                            select: "section shift _id"
                        })

        // await sendEmail(data?.email, userRegistrationMail({ ...userData?._doc, pass: data.pass }), "Account creation confirmed")
        return new ApiResponse(200, userData, "User registration successful")
    },

    // list of teachers
    getTeacherList: async (req) => {
        const role = req?.headers?.role
        const {page, limit, dept = "all", designation = "all"} = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 40
        const skip = (pageNum - 1) * pageLimit

        if (pageLimit > 80) throw new ApiError(400, "Limit exceeded")
        
        const query = {role: roles.TEACHERS}
        if (dept != "all" && dept?.length == 24) query.dept = dept
        if (designation != "all" && designation !== "") query.teacherDesignation = designation
        if(role != roles.ADMIN) query.isBlocked = false


        const teacherList = await usersModel.find(query)
                                .skip(skip)
                                .limit(pageLimit)
                                .select(`-refreshTokens -pass -about ${!role ? "-role" : ""}`)
                                .populate({
                                    path: "dept",
                                    select: "shortName _id"
                                })
        const total = await usersModel.countDocuments(query)
        const totalPages = Math.ceil(total / pageLimit)

        return new ApiResponse(200, {users: teacherList, totalPage: totalPages}, "Teacher list loaded")
    },

    // list of students
    getStudentList: async (req) => {
        const role = req?.headers?.role
        if(!role) throw new ApiError(401, "Login to see student list")
        const { page = "1", limit = "60", dept = "all", batch = "all", section = "all" } = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 60
        const skip = (pageNum - 1) * pageLimit

        if (limit > 100) throw new ApiError(400, "Limit exceeded")

        let query = {role: roles.STUDENTS}
        if (dept != "all" && dept?.length == 24) query.dept = dept
        if(batch != "all" && batch?.length == 24) query.batch = batch
        if(section != "all" && section?.length == 24) query.section = section
        if (role != roles.ADMIN) query.isBlocked = false


        const studentList = await usersModel.find(query)
            .skip(skip)
            .limit(limit)
            .select("-refreshTokens -pass")
            .populate({
                path: "dept",
                select: "shortName _id"
            })
            .populate({
                path: "batch",
                select: "name _id"
            })
            .populate({
                path: "section",
                select: "shift section _id"
            })
        const total = await usersModel.countDocuments(query)
        const totalPages = Math.ceil(total / pageLimit)

        return new ApiResponse(200, {users:studentList, totalPage: totalPages}, "Student list loaded")
    },

    // user data by admin
    getUser: async (req) => {
        const id = req?.params.id
        if (!id) throw new ApiError(400, "No user info provided")

        const role = req?.headers?.role

        const query = { _id: id }

        const user = await usersModel.findOne(query).select("role").lean()
        if (!user) throw new ApiError(404, "User not found")
        if((user?.role == roles.STUDENTS) && !role) throw new ApiError(400, "You are not authorized to see this data") 

        let userQuery = await usersModel.findOne(query).select("-pass -refreshTokens")

        if (user?.role === roles.STUDENTS) {
            userQuery = await userQuery.populate([
                { 
                    path: "dept",
                    select: "name shortName _id",
                },
                { path: "batch", select: "name _id" },
                { path: "section", select: "section shift _id" }
            ])
        }
        else if (user?.role === roles.TEACHERS) {
            userQuery = await userQuery.populate({
                path: "dept",
                select: "name shortName _id"
            })
        }

        return new ApiResponse(200, userQuery, "User data loaded")
    },

    // update user info
    updateUser: async (req) => {
        const data = req?.body
        const isAdmin = roles.ADMIN == req?.headers?.role
        const validate = isValidData(isAdmin ? userUpdateByAdmin : userUpdateByHimself, data)

        if(!validate) throw new ApiError(400, "Invalid user data")
        const id = isAdmin ? req?.params?.id : req?.headers?.id
    
        if(!id) throw new ApiError(400, "Invalid user info")
        
        const user = await usersModel.findOne({_id: id}).select("image").lean()
        
        // need to add profile image update option - only valid for admin
        const file = req?.files?.image
        if (file && isAdmin) {
            // remove old image
            const removeOldImage = await removeMedia(user?.image)
            // upload user image
            const imageUrl = await uploadMedia(file)
            data.image = imageUrl
        }
        
        
        const userUpdate = await usersModel.findById({ _id: id })
        userUpdate.set(data)
        await userUpdate.save()
        const result = await usersModel.findById({_id: id})
            .select("-refreshTokens -pass")
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
            }).lean()

        await sendEmail(
            result?.email,
            userRegistrationMail({ ...result, pass: data?.pass || "Password unchanged" }),
            "Account updated"
        )

        return new ApiResponse(200, result, "User updated")        
    }

}

export default userService