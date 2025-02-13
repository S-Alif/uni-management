import express from "express"
import userController from "../../controllers/users/users.controller.js"

const router = express.Router()

const routeList = [
    {path: "/register", method: "post", controller: userController.registerUser},
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