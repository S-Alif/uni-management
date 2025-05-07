import timeSlotModel from "../../models/timeSlot.models.js"
import schedulesModels from "../../models/schedules.models.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { timeSlotValidate } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import mongoose from "mongoose"

const timeSlotService = {
    saveTimeSlot: async (req) => {
        const data = req.body
        if(!data) throw new ApiError(400, "No data provided")
        const validate = isValidData(timeSlotValidate,data)
        if(!validate) throw new ApiError(400, "Invalid time slot data provided")

        const id = req.params?.id

        const count = await timeSlotModel.countDocuments({
            $and: [
                {slot: data.slot},
                {shift: data.shift},
                {_id: {$ne: id}}
            ]
        })

        if(count > 0) throw new ApiError(400, "Time slot already exists")

        const timeSlot = await timeSlotModel.findByIdAndUpdate(
            {_id: id ? id : new mongoose.Types.ObjectId()},
            data,
            {upsert: true, new: true}
        )
        if(!timeSlot) throw new ApiError(400, "Time slot not found")

        return new ApiResponse(200, timeSlot, "Time slot saved successfully")
    },
    removeTimeSlot: async (req) => {
        const id = req.params?.id
        if(!id) throw new ApiError(400, "No id provided")

        const count = await schedulesModels.countDocuments({ timeSlot: id })
        if(count > 0) throw new ApiError(400, "Time slot is used in schedules")

        const timeSlot = await timeSlotModel.findByIdAndDelete({_id: id})
        if(!timeSlot) throw new ApiError(400, "Time slot not found")

        return new ApiResponse(200, "Time slot removed successfully")
    },

    getAllTimeSlot: async (req) => {
        const {page = "1", limit = "40", shift = "all"} = req?.query

        const query = {}
        if(shift != "all" && (shift == "day" || shift == "evening")) query.shift = shift
        const timeSlots = await timeSlotModel.find(query)
            .sort({createdAt: -1}) 
            .skip((page - 1) * limit)
            .limit(limit)

        const count = await timeSlotModel.countDocuments(query)
        const totalPages = Math.ceil(count / limit)

        return new ApiResponse(200, {timeSlots: timeSlots, totalPage: totalPages}, "Time slots fetched successfully")
    }
}

export default timeSlotService