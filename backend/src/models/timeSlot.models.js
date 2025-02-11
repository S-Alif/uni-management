import mongoose from "mongoose"

const schema = new mongoose.Schema({
    slot: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        default: "day",
        enum: ["day", "evening"]
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("time_slots", schema)