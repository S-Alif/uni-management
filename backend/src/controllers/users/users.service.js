import { userRegistration, userUpdateByAdmin, userUpdateByHimself } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import {ApiError} from "../../utils/api/response/apiError.js"
import {ApiResponse} from "../../utils/api/response/apiResponse.js"
import { roles } from "../../constants/rolesAndFiles.constants.js"
import usersModel from "../../models/users.models.js"
import sendEmail from "../../utils/mail/sendMail.js"

const userService = {

    // register a new user - teacher or student
    registerUser: async (req) => {
        const data = req?.body
        if(data?.role == roles.ADMIN) throw new ApiError(400, "Cannot register user")

        const validated = isValidData(userRegistration, data)
        if (!validated) throw new ApiError(400, "Please provide all the data")

        const createNewUser = await usersModel.create(data)
        // await sendEmail(data?.email, "", "Account creation confirmed")
        return new ApiResponse(200, createNewUser, "User registration successful")
    },

    // list of teachers
    getTeacherList: async (req) => {
        const {page, limit} = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 20
        const skip = (pageNum - 1) * pageLimit

        if (pageLimit > 60) throw new ApiError(400, "Limit exceeded")

        const teacherList = await usersModel.find({ role: roles.TEACHERS })
                                .skip(skip)
                                .limit(pageLimit)
                                .populate({
                                    path: "dept",
                                    select: "shortName _id",
                                    populate: {
                                        path: "faculty",
                                        select: "name _id"
                                    }
                                })

        return new ApiResponse(200, teacherList, "Teacher list loaded")
    },

    // list of students
    getStudentList: async (req) => {
        const { page, limit, dept, batch, section } = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 60
        const skip = (pageNum - 1) * pageLimit

        if (limit > 100) throw new ApiError(400, "Limit exceeded")

        let query = {
            role: roles.STUDENTS,
            dept: dept ? dept : {},
            batch: batch ? batch : {},
            section: section ? section : {}
        }

        const studentList = await usersModel.find(query)
            .skip(skip)
            .limit(limit)
            .select("name personalId dept email phone batch section")
            .populate({
                path: "dept",
                select: "shortName _id",
                populate: {
                    path: "faculty",
                    select: "name _id"
                }
            })

        return new ApiResponse(200, studentList, "Student list loaded")
    },

    // user data
    getUser: async (req) => {
        const id = req?.params.id
        if (!id) throw new ApiError(400, "No user info provided")

        const isAdmin = roles.ADMIN == req?.headers?.role
        const query = {
            _id: id,
            isBlocked: !isAdmin
        }

        const user = await usersModel.findOne(query).select("role")
        if (!user) throw new ApiError(404, "User not found")

        let userQuery = await usersModel.findOne(query).select("-pass -refreshTokens")

        if (user?.role === roles.STUDENTS) {
            userQuery = userQuery.populate([
                { 
                    path: "dept",
                    select: "shortName _id",
                    populate: { 
                        path: "faculty",
                        select: "name _id" 
                    } 
                },
                { path: "batch", select: "batchNo _id" },
                { path: "section", select: "section shift _id" }
            ])
        }
        else if (user?.role === roles.TEACHERS) {
            userQuery = userQuery.populate({
                path: "dept",
                select: "shortName _id",
                populate: { path: "faculty", select: "name _id" }
            })
        }

        const populatedUser = await userQuery.exec()

        return new ApiResponse(200, populatedUser, "User data loaded")
    },

    // update user info
    updateUser: async (req) => {
        const data = req?.body
        const isAdmin = roles.ADMIN == req?.headers?.role
        const validate = isValidData(isAdmin ? userUpdateByAdmin : userUpdateByHimself, data)

        if(!validate) throw new ApiError(400, "Invalid user data")
        const id = isAdmin ? req?.params?.id : req?.headers?.id

        if(!id) throw new ApiError(400, "Invalid user info")
        
        const userUpdate = await usersModel.findByIdAndUpdate({_id: id}, data)

        return new ApiResponse(200, {}, "User updated")        
    }

}

export default userService