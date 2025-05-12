import semestersModels from "../../models/semesters.models.js"
import schedulesModels from "../../models/schedules.models.js"
import {ApiError} from "../../utils/api/response/apiError.js"
import {ApiResponse} from "../../utils/api/response/apiResponse.js"
import { semesterValidate } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import mongoose from "mongoose"


const semesterService = {
    // save semester
    saveSemester: async (req) => {
        const data = req.body
        if(!data) throw new ApiError(400, "No data provided")
        const validate = isValidData(semesterValidate,data)
        if(!validate) throw new ApiError(400, "Invalid semester data provided")
        
        const id = req.params?.id

        const count = await semestersModels.countDocuments(
            id ? {_id: {$ne: id}, name: data?.name, start: data?.start, end: data?.start}
            :
            {name: data?.name, start: data?.start, end: data?.start}
        )
        if(count > 0) throw new ApiError(400, "Duplicate semester data found")

        const activeSemester = await semestersModels.countDocuments({active: true})
        if(activeSemester > 0 && data?.active == "true") throw new ApiError(400, "Only one semester can be active at a time")

        const semester = await semestersModels.findByIdAndUpdate(
            id ? id : new mongoose.Types.ObjectId(),
            data,
            {new: true, upsert: true, runValidators: true}
        )
        return new ApiResponse(200, semester, "Semester saved")
    },
    // remove
    removeSemester: async (req) => {
        const id = req.params?.id
        if(!id) throw new ApiError(400, "No semester id provided")
        
        const count = await schedulesModels.countDocuments({ semester: id})
        if(count > 0) throw new ApiError(400, "Semester has schedules, cannot be removed")

        const semester = await semestersModels.findByIdAndDelete({_id: id})
        return new ApiResponse(200, {}, "Semester removed successfully")
    },
    // get one
    getSemester: async (req) => {
        const id = req.params?.id
        if(!id) throw new ApiError(400, "No semester id provided")

        const semester = await semestersModels.findById({_id: id})
        if(!semester) throw new ApiError(404, "Semester not found")

        return new ApiResponse(200, semester, "Semester loaded")
    },
    // get all
    getAllSemesters: async (req) => {
        const {page = 1, limit = 40} = req?.query
        const pageNum = parseInt(page)
        const limitNum = parseInt(limit)
        const skip = (pageNum - 1) * limitNum

        const semesters = await semestersModels.find({})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limitNum)
        
        const count = await semestersModels.countDocuments({})
        const totalPages = Math.ceil(count / limitNum)

        return new ApiResponse(200, { semesters: semesters, totalPages: totalPages }, "Semesters loaded")
    }
}

export default semesterService