import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true
    },
    programDetail: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100000,
        unique: true
    },
    dept: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "departments"
    },
    graduate: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false })

export default mongoose.model("offered_programs", schema)