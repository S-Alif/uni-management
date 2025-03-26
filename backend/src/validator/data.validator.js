import Joi from "joi"
import { roles } from "../constants/rolesAndFiles.constants.js"

const emailRegex = "^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$"

// for registering a user by admin
const userRegistration = Joi.object({
    name: Joi.string().min(5).max(80).required(),
    personalId: Joi.string().length(8).required(),
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    pass: Joi.string().min(8).max(255).required(),
    phone: Joi.string().min(10).max(15).required(),
    about: Joi.string().optional(),
    dept: Joi.string().length(24).when("role", {
        is: roles.STUDENTS || roles.TEACHERS,
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
    personalId: Joi.string().length(8).required(),
    pass: Joi.string().min(8).max(255).optional(),
    about: Joi.string().min(10).max(50000).optional(),
    dept: Joi.string().length(24).when("role", {
        is: roles.STUDENTS || roles.TEACHERS,
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

const userLogin = Joi.object({
    email: Joi.string().email(new RegExp(emailRegex)).required(),
    pass: Joi.string().min(8).max(255).required()
})


export {
    userRegistration,
    userUpdateByHimself,
    userLogin,
    userUpdateByAdmin
}