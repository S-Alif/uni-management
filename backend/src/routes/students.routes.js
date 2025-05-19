import userController from "../controllers/users/users.controller.js"
import scheduleController from "../controllers/schedule/schedules.controller.js"


const routeList = [
    {path: "/", method: "post", controller: userController.updateUser},
    {path: "/classmates", method: "get", controller: userController.getStudentList},
    { path: "/schedules", method: "get", controller: scheduleController.getScheduleByUser },
]

export default routeList