import mongoose from "mongoose"
import { ApiError } from "../../../utils/api/response/apiError.js"
import { ApiResponse } from "../../../utils/api/response/apiResponse.js"
import { sectionValidate } from "../../../validator/data.validator.js"
import isValidData from "../../../validator/validate.js"
import batchSectionsModels from "../../../models/batchSections.models.js"
import sharedMaterialsModels from "../../../models/sharedMaterials.models.js"
import scheduleModels from "../../../models/schedules.models.js"


const batchSectionService = {

    // create or update section
    saveSection: async (req) => {
        const data = req?.body
        const validate = isValidData(sectionValidate, data)
        if (!validate) throw new ApiError(400, "Please provide all the data")
        const id = req?.params?.id

        const checkDuplicate = await batchSectionsModels.countDocuments({ section: data?.section, batch: data?.batch, dept: data?.dept })
        if (checkDuplicate > 0) throw new ApiError(400, "Section already exists")

        const section = await batchSectionsModels.findOneAndUpdate({ _id: id || new mongoose.Types.ObjectId() }, data, { upsert: true, new: true })
        return new ApiResponse(200, section, "Section saved successfully")
    },

    // remove section
    removeSection: async (req) => {
        const id = req?.params?.id
        if (!id) throw new ApiError(400, "No section id provided")
        const models = [sharedMaterialsModels, scheduleModels]
        for (const model of models) {
            const count = await model.countDocuments({ batchSection: id });
            if (count > 0) {
                throw new ApiError(400, `Department is used in ${model.collection.name}`);
            }
        }

        const section = await batchSectionsModels.findByIdAndDelete({_id: id})
        return new ApiResponse(200, {}, "Section removed successfully")
    },

    // get section list
    getSectionList: async (req) => {
        const {page = "1", limit = "30", dept = "all", shift = "all", batch = "all"} = req?.query
        const pageNumber = parseInt(page) || 1
        const limitNumber = parseInt(limit) || 30
        const skip = (pageNumber - 1) * limitNumber

        const query = {}
        if (dept !== "all" && dept.length == 24) query.dept = dept
        if (batch !== "all" && batch.length == 24) query.batch = batch
        if (shift !== "all" && (shift == "day" || shift == "evening")) query.shift = shift

        const sectionList = await batchSectionsModels.find(query)
                                .sort({ createdAt: -1 })
                                .skip(skip)
                                .limit(limitNumber)
                                .populate({
                                    path: "batch",
                                    select: "name _id"
                                })
                                .populate({
                                    path: "dept",
                                    select: "name shortName _id"
                                })
                                .populate({
                                    path: "batchCo",
                                    select: "name image _id"
                                })
                                .populate({
                                    path: "classRep",
                                    select: "name image _id"
                                })

        const total = await batchSectionsModels.countDocuments(query)
        const totalPage = Math.ceil(total / limitNumber)
        
        return new ApiResponse(200, {sections: sectionList, totalPage: totalPage}, "Section list loaded")
    },

}

export default batchSectionService