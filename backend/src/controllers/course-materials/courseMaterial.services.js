import { roles } from "../../constants/rolesAndFiles.constants.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { fileRemove, fileUpload } from "../../utils/files/fileUpload.js"
import courseMaterialModel from "../../models/courseMaterials.models.js"

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
    remove: async (req) => {
        console.log(req.params)
        await fileRemove(`27337`, 980)
        return new ApiResponse(200, {}, "file removed")
    },
    getAll: async (req) => {
        
    }
}

export default courseMaterialService