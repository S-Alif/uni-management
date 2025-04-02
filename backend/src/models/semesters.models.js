import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false })

export default mongoose.model("semesters", schema)