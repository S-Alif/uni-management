import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import userService from "./users.service.js"

const userController = {
    registerUser: controllerHandler(userService.registerUser)
}

export default userController