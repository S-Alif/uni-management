import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import authService from "./auth.service.js"

const authController = {
    login: controllerHandler(authService.login),
    register: controllerHandler(authService.register)
}

export default authController