import subjectService from "./subject.service.js";
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"

const subjectController = {
    saveSubject: controllerHandler(subjectService.saveSubject),
    removeSubject: controllerHandler(subjectService.removeSubject),
    subjectList: controllerHandler(subjectService.subjectList),
}

export default subjectController