import mongoose from "mongoose"

const schema = new mongoose.Schema({
	batch: {
		type: mongoose.Types.ObjectId,
		required: true,
		index: true,
		ref: "batches",
	},
	dept: {
		type: mongoose.Types.ObjectId,
		required: true,
		index: true,
		ref: "departments"
	},
	batchCo: {
		type: mongoose.Types.ObjectId,
		ref: "users"
	},
	classRep: {
		type: mongoose.Types.ObjectId,
		ref: "users"
	},
	shift: {
		type: String,
		default: "day",
		index: true,
		enum: ["day", "evening"]
	},
	section: {
		type: String,
		default: "A",
		enum: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
}, { timestamps: true, versionKey: false })

export default mongoose.model("batch_sections", schema)