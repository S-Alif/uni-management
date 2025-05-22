import mongoose from "mongoose"

const schema = new mongoose.Schema({
    courseTeacher: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users",
    },
    name: {
        type: String,
        required: true
    },
    materialLocation: {
        type: String,
        required: true
    },
    fileId: {
        type: Number,
        required: true
    },
}, { timestamps: true, versionKey: false })

export default mongoose.model("course_materials", schema)