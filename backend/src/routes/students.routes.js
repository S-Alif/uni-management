import userController from "../controllers/users/users.controller.js"
import scheduleController from "../controllers/schedule/schedules.controller.js"
import sharedMaterialController from "../controllers/course-materials/shared-materials/sharedMaterial.controller.js"


const routeList = [
    {path: "/", method: "post", controller: userController.updateUser},
    {path: "/classmates", method: "get", controller: userController.getStudentList},
    { path: "/schedules", method: "get", controller: scheduleController.getScheduleByUser },
    { path: "/shared-materials/:batchSectionId", method: "get", controller: sharedMaterialController.getSharedMaterials },
]

export default routeList