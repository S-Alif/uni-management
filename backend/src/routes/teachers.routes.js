import userController from "../controllers/users/users.controller.js"
import scheduleController from "../controllers/schedule/schedules.controller.js"
import { materialRoutes, sharedMaterialRoutes } from "./routeLists/lists.teachers.route.js"


const routeList = [
    { path: "/", method: "post", controller: userController.updateUser },
    { path: "/schedules", method: "get", controller: scheduleController.getScheduleByUser },
    {path: "/materials", route: materialRoutes},
    {path: "/shared-materials", route: sharedMaterialRoutes},
]

export default routeList