import departmentsModels from "../../models/departments.models.js"
import facultyModels from "../../models/faculty.models.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { facultyValidate } from "../../validator/data.validator.js"
import isValidData from "../../validator/validate.js"
import {removeMedia, uploadMedia} from "../../utils/files/mediaUpload.js"
import mongoose from "mongoose"


const facultyService = {

    // create or update faculty
    saveFaculty: async (req) => {
        const data = req?.body
        if (!data) throw new ApiError(400, "No data provided")

        const id = req?.params?.id
        // upload image if there is
        const file = req?.files?.image
        let imageUrl = null
        if (file) {
            if(id) await removeMedia(data?.image)
            imageUrl = await uploadMedia(file)
            data.image = imageUrl
        }

        const validate = isValidData(facultyValidate, data)
        if (!validate) {
            if(imageUrl) await removeMedia(imageUrl)
            throw new ApiError(400, "Invalid faculty data")
        }

        // count documents
        const count = await facultyModels.countDocuments({ name: data.name })
        if (count > 1) throw new ApiError(400, "Faculty name already exists")

        const faculty = await facultyModels.findOneAndUpdate({ _id: id || new mongoose.Types.ObjectId() }, data, { upsert: true, new: true })

        return new ApiResponse(200, faculty, "Faculty saved successfully")
    },

    // remove faculty
    removeFaculty: async (req) => {
        const id = req?.params?.id
        if (!id) throw new ApiError(400, "No faculty id provided")
        
        // check usage
        const count = await departmentsModels.countDocuments({_id: id})
        if (count > 0) throw new ApiError(400, "Cannot remove faculty with active departments")
        
        const faculty = await facultyModels.findOne({_id: id})
        const removeImage = await removeMedia(faculty?.image)
        if(!removeImage) throw new ApiError(400, "Could not remove Faculty")

        const removeDoc = await facultyModels.findByIdAndDelete({ _id: id })
        return new ApiResponse(200, {}, "Faculty removed successfully")        
    },

    // get faculty list
    getFacultyList: async (req) => {
        const faculty = await facultyModels.find({})
                            .populate({
                                path: "dean",
                                select: "name _id"
                            })
        return new ApiResponse(200, faculty, "Faculty list loaded")
    },

    // get faculty data
    getFaculty: async (req) => {
        const id = req?.params?.id
        if (!id) throw new ApiError(400, "No faculty id provided")
        const faculty = await facultyModels.findById({_id: id})
                            .populate({
                                path: "dean",
                                select: "name _id"
                            })
        return new ApiResponse(200, faculty, "Faculty loaded")
    }
}


export default facultyService