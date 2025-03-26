import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import batchesModels from "../../models/batches.models.js"


const batchService = {
    // create or update batch
    saveBatch: async (req) => {
        let data = req?.body
        if(!data) throw new ApiError(400, "No data provided")
        if(isNaN(data?.batchNo) || data?.batchNo?.length < 1 || data?.batchNo?.length > 5) throw new ApiError(400, "Invalid batch number")

        const checkDupticate = await batchesModels.countDocuments(data)
        if(checkDupticate > 0) throw new ApiError(400, "Batch number already exists")
        
        const id = req?.params?.id

        const batch = await batchesModels.findOneAndUpdate(id ? { _id: id } : data, data, {upsert: true, new: true})
        return new ApiResponse(200, batch, "Batch saved successfully")
    },

    // remove batch
    removeBatch: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(400, "No batch id provided")

        const batch = await batchesModels.findByIdAndDelete(id)
        return new ApiResponse(200, {}, "Batch removed successfully")
    },

    // get batch list
    getBatchList: async (req) => {
        const { page, limit } = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 10
        const skip = (pageNum - 1) * pageLimit

        const batchList = await batchesModels.find({}).skip(skip).limit(pageLimit)
        return new ApiResponse(200, batchList, "Batch list loaded")
    },
}

export default batchService