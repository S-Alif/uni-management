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
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("semesters", schema)