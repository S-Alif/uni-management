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
    // pass: Joi.string().min(8).max(255).required(),
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
    teacherDesignation: Joi.string().valid("Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer").when("role", {
        is: roles.TEACHERS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    role: Joi.number().valid(...Object.values(roles)).required()
})

// user update by admin
const userUpdateByAdmin = Joi.object({
    name: Joi.string().min(5).max(80).required(),
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    image: Joi.string().min(10).max(300).optional(),
    phone: Joi.string().min(10).max(15).required(),
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
    teacherDesignation: Joi.string().valid("Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer").when("role", {
        is: roles.TEACHERS,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
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
    deptHead: Joi.string().length(24).allow("").optional(),
    about: Joi.string().min(10).max(100000).required(),
    image: Joi.string().min(10).max(300).optional(),
    bgImage: Joi.string().min(10).max(300).optional(),
    shortDesc: Joi.string().min(10).max(200).required(),
    msgFromDeptHead: Joi.string().min(10).max(10000).optional(),
})

// faculty
const facultyValidate = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    dean: Joi.string().length(24).allow("").optional(),
    about: Joi.string().max(100000).required(),
    image: Joi.string().min(10).max(300).optional(),
    bgImage: Joi.string().min(10).max(300).optional(),
    shortDesc: Joi.string().min(10).max(200).required(),
    msgFromDean: Joi.string().max(10000).allow("").optional(),
})

// section
const sectionValidate = Joi.object({
    batch: Joi.string().length(24).required(),
    dept: Joi.string().length(24).required(),
    batchCo: Joi.string().length(24).optional(),
    classRep: Joi.string().length(24).optional(),
    section: Joi.string().valid("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K").default("A"),
    shift: Joi.string().valid("day", "evening").default("day"),
    start: Joi.string().min(5).max(100).required(),
    end: Joi.string().min(5).max(100).required(),
})

// subject
const subjectValidate = Joi.object({
    name: Joi.string().min(1).max(150).required(),
    code: Joi.string().min(1).max(4).required(),
    about: Joi.string().min(10).max(250).required(),
    dept: Joi.string().length(24).required(),
})

// semester
const semesterValidate = Joi.object({
    name: Joi.string()
        .min(1)
        .max(100)
        .required(),

    start: Joi.date()
        .required(),

    end: Joi.date()
        .greater(Joi.ref("start"))
        .required(),

    active: Joi.boolean()
        .optional(),
})

// time slot
const timeSlotValidate = Joi.object({
    slot: Joi.string()
        .required(),
    shift: Joi.string()
        .valid("day", "evening")
        .default("day")
})

// schedule schema
const scheduleSchema = Joi.object({
    courseTeacher: Joi.string().length(24).required(),
    dept: Joi.string().length(24).required(),
    batchSection: Joi.string().length(24).required(),
    subject: Joi.string().length(24).required(),
    semester: Joi.string().length(24).required(),
    weekday: Joi.string()
        .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
        .required(),
    timeSlot: Joi.array()
        .items(Joi.string().length(24).required())
        .required(),
    room: Joi.string().min(3).max(24).required(),
})


export {
    userRegistration,
    userUpdateByHimself,
    adminLogin,
    userUpdateByAdmin,
    resetPass,
    deptValidate,
    facultyValidate,
    sectionValidate,
    subjectValidate,
    semesterValidate,
    timeSlotValidate,
    scheduleSchema
}