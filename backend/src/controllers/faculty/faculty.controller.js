import facultyService from "./faculty.service.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"


const facultyController = {
    saveFaculty: controllerHandler(facultyService.saveFaculty),
    removeFaculty: controllerHandler(facultyService.removeFaculty),
    getFacultyList: controllerHandler(facultyService.getFacultyList),
    getFaculty: controllerHandler(facultyService.getFaculty),
}

export default facultyController