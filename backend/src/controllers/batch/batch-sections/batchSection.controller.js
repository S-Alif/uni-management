import controllerHandler from "../../../utils/controller-handler/controllerHandler.js"
import batchSectionService from "./batchSection.service.js"

const batchSectionController = {
    saveSection: controllerHandler(batchSectionService.saveSection),
    removeSection: controllerHandler(batchSectionService.removeSection),
    getSectionList: controllerHandler(batchSectionService.getSectionList),
}

export default batchSectionController