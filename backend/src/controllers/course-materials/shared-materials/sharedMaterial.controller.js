import controllerHandler from "../../../utils/controller-handler/controllerHandler.js"
import sharedMaterialServices from "./sharedMaterial.services.js"

const sharedMaterialController = {
    save: controllerHandler(sharedMaterialServices.save),
    remove: controllerHandler(sharedMaterialServices.remove),
    getSharedMaterials: controllerHandler(sharedMaterialServices.getSharedMaterials),
}

export default sharedMaterialController