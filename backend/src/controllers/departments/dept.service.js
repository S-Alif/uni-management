import batchSectionsModels from "../../models/batchSections.models.js"
import departmentsModels from "../../models/departments.models.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { uploadMedia } from "../../utils/files/mediaUpload.js"
import { deptValidate } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"

const deptService = {
    // create or update department
    saveDept: async (req) => {
        const data = req?.body
        const validate = isValidData(deptValidate, data)
        if(!validate) throw new ApiError(400, "Invalid department data")
        
        // count documents
        const count = await departmentsModels.countDocuments({ $or: [{ name: data.name }, { shortName: data.shortName }]})
        if(count > 0) throw new ApiError(400, "Department name or short name already exists")

        // upload image if there is
        const file = req?.files?.image
        if(file) {
            var imageUrl = await uploadMedia(file)
        }

        const id = req?.params?.id

        // update or create new data
        data.image = imageUrl
        const department = await departmentsModels.findByIdAndUpdate(id ? {_id: id} : {name: data?.name}, data, {upsert: true, new: true})

        return new ApiResponse(200, department, "Department saved successfully")
    },

    // remove department
    removeDept: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(404, "No department id provided")

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

        const department = await departmentsModels.findByIdAndDelete({_id: id})
        return new ApiResponse(200, {}, "Department removed successfully")
    },

    // get department list
    getDeptList: async (req) => {
        // need to complete it after faculty model is created
        const department = await departmentsModels.find({})
        return new ApiResponse(200, department, "Department list loaded")
    }
}

export default deptService