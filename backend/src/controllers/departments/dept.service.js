import mongoose from "mongoose"
import batchSectionsModels from "../../models/batchSections.models.js"
import departmentsModels from "../../models/departments.models.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { removeMedia, uploadMedia } from "../../utils/files/mediaUpload.js"
import { deptValidate } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"

const deptService = {
    // create or update department
    saveDept: async (req) => {
        const data = req?.body
        if(!data) throw new ApiError(400, "No data found")

        const validate = isValidData(deptValidate, data)
        if (!validate) {
            throw new ApiError(400, "Invalid department data")
        }
            
        const id = req?.params?.id

        
        // count documents
        const count = await departmentsModels.countDocuments(
            id ? { _id: { $ne: id }, $or: [{ name: data.name }, { shortName: data.shortName }] } 
            : { $or: [{ name: data.name }, { shortName: data.shortName }] }
        )
        if (count > 0) throw new ApiError(400, "Department already exists")

        // upload image if there is
        const file = req?.files?.file
        let imageUrl = null
        if (file) {
            if (id) await removeMedia(data?.image)
            imageUrl = await uploadMedia(file)
            data.image = imageUrl
        }

        // update or create new data
        const department = await departmentsModels.findOneAndUpdate(
            { _id: id || new mongoose.Types.ObjectId() },
             data, 
             {upsert: true, new: true}
            ).populate({
                path: "faculty",
                select: "name _id"
            })
            .populate({
                path: "deptHead",
                select: "name image personalId _id"
            })

        return new ApiResponse(200, department, "Department saved successfully")
    },

    // remove department
    removeDept: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(400, "No department id provided")

        // check if department is used
        const models = [
            {model: batchSectionsModels, field: "dept"},
        ]
        for (const { model, field } of models) {
            const count = await model.countDocuments({ [field]: id });
            if (count > 0) {
                throw new ApiError(400, `Department is used in ${model.collection.name}`);
            }
        }

        const department = await departmentsModels.findOne({_id: id})
        const removeImage = await removeMedia(department?.image)
        if(!removeImage) throw new ApiError(400, "Could not remove department")

        const removeDoc = await departmentsModels.findByIdAndDelete({_id: id})
        return new ApiResponse(200, {}, "Department removed successfully")
    },

    // get department list
    getDeptList: async (req) => {
        const department = await departmentsModels.find({})
                                .select("-createdAt")
                                .populate({
                                    path: "faculty",
                                    select: "name _id"
                                })
                                .populate({
                                    path: "deptHead",
                                    select: "name image personalId _id"
                                })
        return new ApiResponse(200, department, "Department list loaded")
    },

    // get a department
    getDept: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(400, "No department id provided")
        const department = await departmentsModels.findOne({_id: id})
                                .populate({
                                    path: "faculty",
                                    select: "name _id"
                                })
                                .populate({
                                    path: "deptHead",
                                    select: "name image _id"
                                })
        
        return new ApiResponse(200, department, "Department loaded")
    }
}

export default deptService