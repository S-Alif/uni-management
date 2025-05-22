import courseMaterialService from "./courseMaterial.services.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"

const courseMaterialController = {
    save: controllerHandler(courseMaterialService.save),
    remove: controllerHandler(courseMaterialService.remove),
    getAll: controllerHandler(courseMaterialService.getAll),
}

export default courseMaterialController