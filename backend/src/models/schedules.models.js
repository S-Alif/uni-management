import mongoose from "mongoose"

const schema = new mongoose.Schema({
    courseTeacher: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users",
    },
    dept: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "departments",
    },
    batchSection: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "batch_sections",
    },
    subject: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "subjects",
    },
    semester: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "semesters",
    },
    weekday: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    room: {
        type: String,
        required: true,
    },
    timeSlot: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "time_slots",
    }],
}, { timestamps: true, versionKey: false })

export default mongoose.model("schedules", schema)