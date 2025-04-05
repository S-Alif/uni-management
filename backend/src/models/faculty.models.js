import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10000,
    },
    dean: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    msgFromDean: {
        type: String,
        minLength: 10,
        maxLength: 10000,
    },
}, {timestamps: true, versionKey: false})

export default mongoose.model("faculties", schema)