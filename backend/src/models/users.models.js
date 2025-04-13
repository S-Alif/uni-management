import mongoose from "mongoose"
import {roles} from "../constants/rolesAndFiles.constants.js"
import bcrypt from "bcryptjs"
import batchesModels from "./batches.models.js"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80,
        trim: true,
        index: true,
    },
    personalId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    pass: {
        type: String,
        required: true
    },
    dept: {
        type: mongoose.Types.ObjectId,
        required: function () { return (this.role == roles.STUDENTS || this.role == roles.TEACHERS) },
        ref: "departments"
    },
    batch: {
        type: mongoose.Types.ObjectId,
        required: function () {return this.role == roles.STUDENTS },
        ref: "batches",
    },
    section: {
        type: mongoose.Types.ObjectId,
        required: function () {return this.role == roles.STUDENTS },
        ref: "batch_sections",
    },
    about: {
        type: String,
        maxlength: 50000,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        required: true,
        enum: [roles.ADMIN, roles.TEACHERS, roles.STUDENTS],
    },
    teacherDesignation: {
        type: String,
        default: "Lecturer",
        enum: ["Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer"],
        required: function () { return this.role == roles.TEACHERS }
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshTokens: [String]
}, {timestamps: true, versionKey: false})


// encrypt passwords
schema.pre("save", async function(next){
    if(!this.isModified("pass")) return next()
    const salt = await bcrypt.genSalt(10)
    this.pass = await bcrypt.hash(this.pass, salt)
    next()
})

// create personal id for ne new users
schema.pre("validate", async function(next){
    if(!this.personalId) {
        if(this.role == roles.STUDENTS){
            const getBatch = await batchesModels.findOne({_id: this.batch}).select("name -_id")
            const name = getBatch?.name.padStart(3, "0")

            const countStudents = await this.collection.countDocuments({batch: this.batch})
            this.personalId = `${name + (countStudents + 1).toString().padStart(5, "0") }`
        }
        else if(this.role == roles.TEACHERS){
            const year = `${new Date().getFullYear()}`
            const admitYear = year.substring(2).padStart(3, "0")
            const countTeachers = await this.collection.countDocuments({role: roles.TEACHERS})
            this.personalId = `${admitYear + (countTeachers + 1).toString().padStart(5, "0") }`
        }
        return next()
    }
    next()
})


// decrypt password
schema.methods.verifyPass = async function(pass){
    return await bcrypt.compare(pass, this.pass)
}

export default mongoose.model("users", schema)