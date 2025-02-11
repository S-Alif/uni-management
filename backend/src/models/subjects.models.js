import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true
    },
    code: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 10,
        unique: true
    },
    about: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 1000,
    },
    dept: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "departments"
    },
}, { timestamps: true, versionKey: false })

export default mongoose.model("subjects", schema)