import express from "express"
import userController from "../controllers/users/users.controller.js"
import scheduleController from "../controllers/schedule/schedules.controller.js"

const router = express.Router()

const routeList = [
    { path: "/", method: "post", controller: userController.updateUser },
    { path: "/schedules", method: "get", controller: scheduleController.getScheduleByUser },
]

export default routeList