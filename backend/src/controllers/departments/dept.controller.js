import deptService from "./dept.service.js";
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"

const deptController = {
    saveDept: controllerHandler(deptService.saveDept),
    removeDept: controllerHandler(deptService.removeDept),
    getDeptList: controllerHandler(deptService.getDeptList),
    getDept: controllerHandler(deptService.getDept),
}

export default deptController