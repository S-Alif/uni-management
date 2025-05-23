import mongoose from "mongoose";
import { roles } from "../../constants/rolesAndFiles.constants.js";
import subjectsModels from "../../models/subjects.models.js";
import { ApiError } from "../../utils/api/response/apiError.js";
import { subjectValidate } from "../../validator/data.validator.js";
import isValidData from "../../validator/validate.js";
import { ApiResponse } from "../../utils/api/response/apiResponse.js";
import schedulesModels from "../../models/schedules.models.js"


const subjectService = {
    // save subject
    saveSubject: async (req) => {
        const data = req?.body
        if (!data) throw new ApiError(400, "No data found")

        const validate = isValidData(subjectValidate, data)
        if (!validate) throw new ApiError(400, "Invalid subject data")

        if(req?.headers?.role != roles.ADMIN) throw new ApiError(403, "Access forbidden")

        const id = req?.params?.id

        // count documents
        const count = await subjectsModels.countDocuments(
            id ? { _id: { $ne: id }, name: data.name, code: data.code, dept: data.dept  }
                : { name: data.name, code: data.code, dept: data.dept }
        )

        if(count > 0) throw new ApiError(400, "Duplicate subject data found")

        const subject = await subjectsModels.findOneAndUpdate(
            {_id: id || new mongoose.Types.ObjectId() },
            data,
            {upsert: true, new: true, runValidators: true}
        ).populate({
            path: "dept",
            select: "name shortName _id"
        })

        return new ApiResponse(200, subject, "Subject saved")
    },

    // remove subject
    removeSubject: async (req) => {
        const id = req?.params?.id
        if (!id) throw new ApiError(400, "No subject id provided")

        // check if subject is used
        const check = await schedulesModels.countDocuments({subject: id})
        if(check > 0) throw new ApiError(400, "Subject is already in use")

        const result = await subjectsModels.findOneAndDelete({_id: id})
        return new ApiResponse(200, {}, "Subject removed successfully")
    },

    // subject list
    subjectList: async (req) => {
        const { page = "1", limit = "60", dept = "all" } = req?.query
        // console.log(dept)

        // const id = req?.headers?.id
        // if(!id && dept == "all") throw new ApiError(404, "Could not find subjects")

        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 60
        const skip = (pageNum - 1) * pageLimit

        if(limit > 60) throw new ApiError(400, "Limit exceeded")

        let query = {}
        if (dept != "all" && dept?.length == 24) query.dept = dept

        const subjects = await subjectsModels.find(query)
                            .skip(skip)
                            .limit(limit)
                            .select("-createdAt")
                            .populate({
                                path: "dept",
                                select: "name shortName _id"
                            })

        const total = await subjectsModels.countDocuments(query)
        const totalPages = Math.ceil(total / pageLimit)

        return new ApiResponse(200, { subjects: subjects, totalPage: totalPages }, "Subject list loaded")
    }
}

export default subjectService