import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 10,
        unique: true
    },
    faculty: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "faculties"
    },
    about: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100000,
    },
    image: {
        type: String,
        required: true
    },
    deptHead: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    msgFromDeptHead: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10000,
    },
}, {timestamps: true, versionKey: false})

export default mongoose.model("departments", schema)