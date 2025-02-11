import mongoose from "mongoose"

const schema = new mongoose.Schema({
    batchNo: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 5,
        unique: true
    }
}, {timestamps: true, versionKey: false})

export default mongoose.model("batches", schema)