import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otpCode: {
        type: String,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '2m' }
    },

}, { timestamps: true, versionKey: false })

export default mongoose.model("otps", schema)