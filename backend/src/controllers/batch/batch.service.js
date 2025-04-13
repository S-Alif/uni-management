import { ApiError } from "../../utils/api/response/apiError.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import batchesModels from "../../models/batches.models.js"
import batchSectionsModels from "../../models/batchSections.models.js"
import mongoose from "mongoose"


const batchService = {
    // create or update batch
    saveBatch: async (req) => {
        let data = req?.body
        if(!data) throw new ApiError(400, "No data provided")
        if(isNaN(data?.name) || data?.name?.length < 1 || data?.name?.length > 5) throw new ApiError(400, "Invalid batch number")

        const checkDupticate = await batchesModels.countDocuments(data)
        if(checkDupticate > 0) throw new ApiError(400, "Batch number already exists")
        
        const id = req?.params?.id

        const batch = await batchesModels.findOneAndUpdate({ _id: id || new mongoose.Types.ObjectId() }, data, {upsert: true, new: true})
        return new ApiResponse(200, batch, "Batch saved successfully")
    },

    // remove batch
    removeBatch: async (req) => {
        const id = req?.params?.id
        if(!id) throw new ApiError(400, "No batch id provided")

        const count = await batchSectionsModels.countDocuments({batch: id})
        if(count > 0) throw new ApiError(400, "Cannot remove batch with active sections")
        
        const batch = await batchesModels.findByIdAndDelete({_id: id})
        return new ApiResponse(200, {}, "Batch removed successfully")
    },

    // get batch list
    getBatchList: async (req) => {
        const { page, limit } = req?.query
        const pageNum = parseInt(page) || 1
        const pageLimit = parseInt(limit) || 10
        const skip = (pageNum - 1) * pageLimit

        const batchList = await batchesModels.find({}).sort({createdAt: -1}).skip(skip).select("-createdAt").limit(pageLimit)
        const total = await batchesModels.countDocuments({})
        const totalPage = Math.ceil(total / pageLimit)
        return new ApiResponse(200, {batch:batchList, totalPage: totalPage}, "Batch list loaded")
    },
}

export default batchService