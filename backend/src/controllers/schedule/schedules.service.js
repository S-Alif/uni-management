import { roles } from "../../constants/rolesAndFiles.constants.js"
import schedulesModels from "../../models/schedules.models.js"
import semestersModels from "../../models/semesters.models.js"
import usersModels from "../../models/users.models.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { scheduleSchema } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import mongoose from "mongoose"


const scheduleService = {

    saveSchedule: async (req) => {
        const data = req.body
        if (!data) throw new ApiError(400, "No data provided")
        const validate = isValidData(scheduleSchema, data)
        if (!validate) throw new ApiError(400, "Invalid schedule data provided")

        const id = req.params?.id

        const countTeacherSchedule = await schedulesModels.countDocuments(
            id ? { _id: { $ne: id }, courseTeacher: data.courseTeacher, timeSlot: data.timeSlot, weekday: data.weekday }
                :
                { courseTeacher: data.courseTeacher, timeSlot: data.timeSlot, weekday: data.weekday }
        )

        const countRoom = await schedulesModels.countDocuments(
            id ? { _id: { $ne: id }, room: data.room, timeSlot: data.timeSlot, weekday: data.weekday  }
                :
                { room: data.room, timeSlot: data.timeSlot, weekday: data.weekday }
        )
        if (countTeacherSchedule > 0) throw new ApiError(400, "Teacher already has a schedule in this time slot")
        if (countRoom > 0) throw new ApiError(400, "The room already has a schedule in this time slot")

        // save schedule
        const schedule = await schedulesModels.findByIdAndUpdate(
            id ? id : new mongoose.Types.ObjectId(),
            data,
            { new: true, upsert: true, runValidators: true }
        )
        .populate({
            path: "courseTeacher",
            select: "_id name image personalId"
        })
        .populate({
            path: "dept",
            select: "_id name shortName"
        })
        .populate({
            path: "batchSection",
            select: "_id name batch section shift",
            populate:{
                path: "batch",
                select: "name"
            }
        })
        .populate({
            path: "subject",
            select: "name code dept _id",
            populate: {
                path: "dept",
                select: "_id name shortName"
            }
        })
        .populate({
            path: "semester",
            select: "name _id"
        })
        .populate({
            path: "timeSlot",
            select: "slot shift _id"
        })
        return new ApiResponse(200, schedule, "Schedule saved")
    },

    removeSchedule: async (req) => {
        const id = req?.params?.id
        if (!id) throw new ApiError(400, "No schedule id provided")
        const schedule = await schedulesModels.findByIdAndDelete({_id: id})
        if (!schedule) throw new ApiError(400, "No schedule found")
        return new ApiResponse(200, {}, "Schedule deleted")
    },

    getAllSchedule: async (req) => {
        const {page = "1", limit = "80", dept="all", semester = null, batchSection, subject, room, timeSlot} = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 40
        const skip = (pageNum - 1) * pageLimit

        let query = {}
        if(semester && semester?.length == 24) {
            query.semester = semester
        }
        else{
            throw new ApiError(400, "Invalid semester id")
        }

        if(dept && dept != "all" && dept?.length == 24) query.dept = dept
        if(batchSection && batchSection?.length == 24) query.batchSection = batchSection
        if(subject && subject?.length == 24) query.subject = subject
        if(room) query.room = room
        if(timeSlot && timeSlot?.length == 24) query.timeSlot = timeSlot

        const schedule = await schedulesModels.find(query)
            .skip(skip)
            .limit(pageLimit)
            .populate({
                path: "courseTeacher",
                select: "_id name image personalId"
            })
            .populate({
                path: "dept",
                select: "_id name shortName"
            })
            .populate({
                path: "batchSection",
                select: "_id name batch section shift",
                populate: {
                    path: "batch",
                    select: "name"
                }
            })
            .populate({
                path: "subject",
                select: "name code dept _id",
                populate: {
                    path: "dept",
                    select: "_id name shortName"
                }
            })
            .populate({
                path: "semester",
                select: "name _id"
            })
            .populate({
                path: "timeSlot",
                select: "slot shift _id"
            })

        const total = await schedulesModels.countDocuments(query)
        const totalPages = Math.ceil(total / pageLimit)

        return new ApiResponse(200, {schedules:schedule, totalPage: totalPages}, "Schedule list loaded")
    },

    getScheduleByUser: async (req) => {
        const userId = req?.headers?.id
        const role = req?.headers?.role
        if (!userId || !role) throw new ApiError(403, "Please log in to see your schedule")
        
        const activeSemester = await semestersModels.findOne({active: true}).select("_id").lean()
        if (!activeSemester) throw new ApiError(404, "No active semester found")

        let query = {}
        if(role == roles.TEACHERS) {
            query.courseTeacher = userId
        }
        else{
            const section = await usersModels.findOne({ _id: userId }).select("section").lean()
            if (!section) throw new ApiError(404, "No batch section found")
            query.batchSection = section?.section.toString()
        }
        
        query.semester = activeSemester._id.toString()

        let populateOptions = [
            {
                path: "dept",
                select: "_id name shortName"
            },
            {
                path: "batchSection",
                select: "_id name batch section shift",
                populate: {
                    path: "batch",
                    select: "name"
                }
            },
            {
                path: "subject",
                select: "name code dept _id",
                populate: {
                    path: "dept",
                    select: "_id name shortName"
                }
            },
            {
                path: "semester",
                select: "name _id"
            },
            {
                path: "timeSlot",
                select: "slot shift _id"
            }
        ]
        if(role !== roles.TEACHERS) {
            populateOptions.push({
                path: "courseTeacher",
                select: "_id name image personalId"
            })
        }

        const schedule = await schedulesModels.find(query).populate(populateOptions)

        return new ApiResponse(200, schedule, "Schedule list loaded")
    }
}

export default scheduleService