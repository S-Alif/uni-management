import fileUpload from "express-fileupload"
import courseMaterialController from "../../controllers/course-materials/courseMaterial.controller.js"
import fileCheck from "../../middlewares/fileChecker.middlewares.js"
import { fileExt } from "../../constants/rolesAndFiles.constants.js"
import sharedMaterialController from "../../controllers/course-materials/shared-materials/sharedMaterial.controller.js"

const fileUp = fileUpload({ createParentPath: true })

const materialRoutes = [
    { path: "/", method: "post", middleware: [fileUp, fileCheck([...Object.values(fileExt)], 1)] , controller: courseMaterialController.save },
    { path: "/:id", method: "delete", controller: courseMaterialController.remove },
    { path: "/", method: "get", controller: courseMaterialController.getAll },
]

const sharedMaterialRoutes = [
    { path: "/", method: "post", controller: sharedMaterialController.save },
    { path: "/:id", method: "delete", controller: sharedMaterialController.remove },
    { path: "/:materialId", method: "get", controller: sharedMaterialController.getSharedMaterials },
]

export {
    materialRoutes,
    sharedMaterialRoutes
}