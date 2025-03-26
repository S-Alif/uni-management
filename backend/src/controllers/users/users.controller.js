import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import userService from "./users.service.js"

const userController = {
    registerUser: controllerHandler(userService.registerUser),
    getTeacherList: controllerHandler(userService.getTeacherList),
    getStudentList: controllerHandler(userService.getStudentList),
    getUser: controllerHandler(userService.getUser),
    updateUser: controllerHandler(userService.updateUser)
}

export default userController