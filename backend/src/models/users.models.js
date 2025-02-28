import mongoose from "mongoose"
import {roles} from "../constants/rolesAndFiles.constants.js"
import bcrypt from "bcryptjs"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80,
        trim: true
    },
    personalId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
        unique: true
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
    profileImg: {
        type: String,
        trim: true
    },
    profileCover: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        required: true,
        enum: [roles.ADMIN, roles.TEACHERS, roles.STUDENTS],
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshTokens: [String]
}, {timestamps: true, versionKey: false})

export default mongoose.model("users", schema)


// encrypt passwords
schema.pre("save", async function(next){
    if(!this.isModified("pass")) return next()
    const salt = await bcrypt.genSalt(10)
    this.pass = await bcrypt.hash(this.pass, salt)
})

// decrypt password
schema.methods.verifyPass = async function(pass){
    return await bcrypt.compare(pass, this.pass)
}