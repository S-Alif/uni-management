import { roles } from "../../constants/rolesAndFiles.constants.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { fileRemove, fileUpload } from "../../utils/files/fileUpload.js"
import courseMaterialModel from "../../models/courseMaterials.models.js"
import sharedMaterialModel from "../../models/sharedMaterials.models.js"

const courseMaterialService = {
    save: async (req) => {
        const id = req?.headers?.id
        const role = req?.headers?.role
        const file = req?.files?.file
        const name = req?.body?.name
        if(!id) throw new ApiError(400, "User not found")
        if (!file) throw new ApiError(400, "file is required")
        if (!name || name?.trim().length < 5 || name?.trim().length > 50) throw new ApiError(400, "Name should be 5 to 50 characters")
        if (role !== roles.TEACHERS) throw new ApiError(403, "only teacher can upload file")
        
        const uploadFile = await fileUpload(file)
        
        const uploadMaterial = await courseMaterialModel.create({
            courseTeacher: id,
            name: name,
            materialLocation: uploadFile.url,
            fileId: parseInt(uploadFile.fileId)
        })

        return new ApiResponse(200, uploadMaterial, "file uploaded")
    },

    // remove files
    remove: async (req) => {
        const materialId = req?.params?.id
        const role = req?.headers?.role
        const id = req?.headers?.id
        if (!materialId) throw new ApiError(400, "Material not found")
        if (role !== roles.TEACHERS) throw new ApiError(403, "only teacher can remove file")
        if(!id) throw new ApiError(400, "User not found")

        const material = await courseMaterialModel.findById({ _id: materialId }).select("fileId").lean()
        if (!material) throw new ApiError(400, "Material not found")

        
        await fileRemove(material?.fileId)
        await courseMaterialModel.findByIdAndDelete({ _id: materialId })
        await sharedMaterialModel.deleteMany({ materialId: materialId})

        return new ApiResponse(200, {}, "file removed")
    },

    // get files based on user id and role
    getAll: async (req) => {
        const id = req?.headers?.id
        const role = req?.headers?.role
        if(!id) throw new ApiError(400, "User not found")
        if (!role) throw new ApiError(403, "Cannot view materials")

        const {page = "1"} = req?.query
        const limit = 60
        const skip = (parseInt(page) - 1) * limit

        const materials = await courseMaterialModel.find({courseTeacher: id})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .select("-courseTeacher -createdAt")

        const total = await courseMaterialModel.countDocuments({courseTeacher: id})
        const totalPages = Math.ceil(total / limit)

        return new ApiResponse(200, {materials, totalPage: totalPages}, "Materials Loaded")
    }
}

export default courseMaterialService