import semesterService from "./semester.service.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"  

const semesterController = {
    saveSemester: controllerHandler(semesterService.saveSemester),
    removeSemester: controllerHandler(semesterService.removeSemester),
    getSemester: controllerHandler(semesterService.getSemester),
    getAllSemesters: controllerHandler(semesterService.getAllSemesters)
}

export default semesterController