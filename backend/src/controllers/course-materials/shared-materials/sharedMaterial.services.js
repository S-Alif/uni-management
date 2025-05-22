import { roles } from "../../../constants/rolesAndFiles.constants.js"
import sharedMaterialsModels from "../../../models/sharedMaterials.models.js"
import { ApiError } from "../../../utils/api/response/apiError.js"
import { ApiResponse } from "../../../utils/api/response/apiResponse.js"
import { sharedMaterialSchema } from "../../../validator/data.validator.js"
import isValidData from "../../../validator/validate.js"

const sharedMaterialServices = {
    // share a material
    save: async (req) => {
        const data = req?.body
        if(!data) throw new ApiError(400, "Invalid data")
        const validate = isValidData(sharedMaterialSchema, data)
        if(!validate) throw new ApiError(400, "Invalid data")

        const role = req?.headers?.role
        if(role !== roles.TEACHERS) throw new ApiError(400, "Only a teacher can share a material")

        const count = await sharedMaterialsModels.countDocuments(data)
        if(count > 0) throw new ApiError(400, "Material already shared")

        const material = await sharedMaterialsModels.create(data)     
        
        return new ApiResponse(200, {}, "Material shared successfully")
    },

    // remove a shared material
    remove: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(400, "Invalid id")

        const role = req?.headers?.role
        if(role !== roles.TEACHERS) throw new ApiError(400, "Only a teacher can remove a material")

        await sharedMaterialsModels.findByIdAndDelete({_id: id})

        return new ApiResponse(200, {}, "Material removed successfully")
    },
    
    // get shared material by batches
    getSharedMaterials: async (req) => {
        const batchSection = req?.params?.batchSectionId // used for students
        const materialId = req?.params?.materialId // used for teachers
        const role = req?.headers?.role
        if(role!== roles.TEACHERS && role!== roles.STUDENTS) throw new ApiError(400, "Invalid role")

        const query = (role === roles.TEACHERS) ? {materialId} : {batchSection}
        const materials = await sharedMaterialsModels.find(query)
            .populate({
                path: "materialId",
                select: "name materialLocation courseTeacher",
                populate: {
                    path: "courseTeacher",
                    select: "name personalId image"
                }
            })
            .populate({
                path: "batchSection",
                select: "batch section shift",
                populate: {
                    path: "batch",
                    select: "name"
                }
            })

        return new ApiResponse(200, materials, "Materials fetched successfully")
    }
}

export default sharedMaterialServices