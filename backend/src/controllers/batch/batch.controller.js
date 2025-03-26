import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import batchService from "./batch.service.js"

const batchController = {
    saveBatch: controllerHandler(batchService.saveBatch),
    removeBatch: controllerHandler(batchService.removeBatch),
    getBatchList: controllerHandler(batchService.getBatchList),
}

export default batchController