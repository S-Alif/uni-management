import Joi from "joi"
import { roles } from "../constants/rolesAndFiles.constants.js"

const emailRegex = "^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$"

// for registering a user by admin
const userRegistration = Joi.object({
    name: Joi.string().min(5).max(80).required(),
    personalId: Joi.string().length(8).when("role",{
        is: roles.ADMIN,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    pass: Joi.string().min(8).max(255).required(),
    phone: Joi.string().min(10).max(15).required(),
    dept: Joi.string().length(24).when("role", {
        is: Joi.valid(roles.STUDENTS, roles.TEACHERS),
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    batch: Joi.string().length(24).when("role", {
        is: roles.STUDENTS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    section: Joi.string().length(24).when("role", {
        is: roles.STUDENTS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    address: Joi.string().min(10).max(300).required(),
    role: Joi.number().valid(...Object.values(roles)).required()
})

// user update by admin
const userUpdateByAdmin = Joi.object({
    name: Joi.string().min(5).max(80).required(),
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    profileImg: Joi.string().min(10).max(300).optional(),
    name: Joi.string().min(5).max(80).required(),
    pass: Joi.string().min(8).max(255).optional(),
    about: Joi.string().min(10).max(50000).optional(),
    dept: Joi.string().length(24).when("role", {
        is: Joi.valid(roles.STUDENTS, roles.TEACHERS),
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    batch: Joi.string().length(24).when("role", {
        is: roles.STUDENTS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    section: Joi.string().length(24).when("role", {
        is: roles.STUDENTS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    address: Joi.string().min(10).max(300).optional(),
    role: Joi.number().valid(...Object.values(roles)).optional()
})

// for updating a user by himself
const userUpdateByHimself = Joi.object({
    pass: Joi.string().min(8).max(255).required(),
    about: Joi.string().min(10).max(50000).required()
})

// user login
const adminLogin = Joi.object({
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    pass: Joi.string().min(8).max(255).required()
})

// reset pass
const resetPass = Joi.object({
    pass: Joi.string().min(8).max(50).required(),
    email: Joi.string().email(new RegExp(emailRegex)).required(),
})

// departments
const deptValidate = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    shortName: Joi.string().min(1).max(10).required(),
    faculty: Joi.string().length(24).required(),
    deptHead: Joi.string().length(24).optional(),
    about: Joi.string().min(10).max(100000).required(),
    image: Joi.string().min(10).max(300).optional(),
    msgFromDeptHead: Joi.string().min(10).max(10000).optional(),
})

// faculty
const facultyValidate = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    dean: Joi.string().length(24).optional(),
    about: Joi.string().min(10).max(100000).required(),
    image: Joi.string().min(10).max(300).required(),
    msgFromDean: Joi.string().min(10).max(10000).optional(),
})

// section
const sectionValidate = Joi.object({
    batch: Joi.string().length(24).required(),
    dept: Joi.string().length(24).required(),
    batchCo: Joi.string().length(24).optional(),
    classRep: Joi.string().length(24).optional(),
    shift: Joi.string().valid("day", "evening").default("day"),
    start: Joi.string().min(5).max(100).required(),
    end: Joi.string().min(5).max(100).required(),
})


export {
    userRegistration,
    userUpdateByHimself,
    adminLogin,
    userUpdateByAdmin,
    resetPass,
    deptValidate,
    facultyValidate,
    sectionValidate
}