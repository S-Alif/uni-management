import userController from "../controllers/users/users.controller.js"


const routeList = [
    {path: "/", method: "post", controller: userController.updateUser},
    {path: "/classmates", method: "get", controller: userController.getStudentList},
]

export default routeList