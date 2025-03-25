import express from "express"
import authController from "../controllers/auth/auth.controller.js"

const router = express.Router()

const routeList = [
    {path: "/login", method: "post", controller: authController.login},
    {path: "/register", method: "post", controller: authController.register}, //valid only for admins
    {path: "/otp", method: "post", controller: authController.sendOtp},
    {path: "/otp", method: "patch", controller: authController.verifyOtp},
    // {path: "/faculty", method: "get", controller: ""},
    // {path: "/departments", method: "get", controller: ""},
    // {path: "/faculty/departments", method: "get", controller: ""},
    // {path: "/faculty/departments/offered-programs", method: "get", controller: ""},
    // {path: "/faculty/departments/teachers", method: "get", controller: ""},
    // {path: "/subjects", method: "get", controller: ""},
]

routeList.forEach(({path, method, controller}) => {
    router[method](path, controller)
})

export default router