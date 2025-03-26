// controllers
import batchController from "../../controllers/batch/batch.controller.js"
import deptController from "../../controllers/departments/dept.controller.js"
import userController from "../../controllers/users/users.controller.js"

// user routes
const userRoutes = [
    {path: "/register", method: "post", controller: userController.registerUser},
    {path: "/list/teachers", method: "get", controller: userController.getTeacherList},
    {path: "/list/students", method: "get", controller: userController.getStudentList},
    {path: "/user/:id", method: "get", controller: userController.getUser},
    {path: "/user/:id", method: "patch", controller: userController.updateUser},
    // {path: "/faculty", method: "get", controller: ""},
    // {path: "/departments", method: "get", controller: ""},
    // {path: "/faculty/departments", method: "get", controller: ""},
    // {path: "/faculty/departments/offered-programs", method: "get", controller: ""},
    // {path: "/faculty/departments/teachers", method: "get", controller: ""},
    // {path: "/subjects", method: "get", controller: ""},
]

// department routes
const deptRoutes = [
    { path: "/", method: "post", controller: deptController.saveDept },
    { path: "/:id", method: "patch", controller: deptController.saveDept },
    { path: "/:id", method: "delete", controller: deptController.removeDept },
    { path: "/", method: "get", controller: deptController.getDeptList },
]

// batch routes
const batchRoutes = [
    { path: "/", method: "post", controller: batchController.saveBatch },
    { path: "/:id", method: "patch", controller: batchController.saveBatch },
    { path: "/:id", method: "delete", controller: batchController.removeBatch },
    { path: "/", method: "get", controller: batchController.getBatchList },
]


export {
    userRoutes,
    deptRoutes,
    batchRoutes
}