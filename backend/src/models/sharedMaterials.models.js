import mongoose from "mongoose"

const schema = new mongoose.Schema({
    materialId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "course_materials",
    },
    batchSection: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "batch_sections",
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("shared_materials", schema)