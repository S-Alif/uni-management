import express from "express"
import { roles } from "../constants/rolesAndFiles.constants.js"

// routes
import adminRoutes from "./admin.routes.js"
import studentsRoutes from "./students.routes.js"
import teachersRoutes from "./teachers.routes.js"
import publicRoutes from "./public.routes.js"

// middleware
import authCheck from "../middlewares/auth.middlewares.js"
import userController from "../controllers/users/users.controller.js"
import authController from "../controllers/auth/auth.controller.js"

const router = express.Router()

// route lists
const routeList = [
    { path: "/admin", middleware: authCheck([roles.ADMIN]), route: adminRoutes },
    { path: "/students", middleware: authCheck([roles.STUDENTS]), route: studentsRoutes },
    { path: "/teachers", middleware: authCheck([roles.TEACHERS]), route: teachersRoutes },
    { path: "/users/:id", middleware: [authCheck([roles.ADMIN, roles.STUDENTS, roles.TEACHERS])], method: "get", controller: userController.getUser },
    { path: "/users/logout", method: "patch", controller: authController.logout },
    { path: "/public", route: publicRoutes }
]

const createRoutes = (parentRouter, routes) => {
    routes.forEach(({ path, middleware, route, method, controller }) => {

        if(route){
            const childRouter = express.Router()
            createRoutes(childRouter, route)

            if(middleware) return parentRouter.use(path, middleware, childRouter)
            parentRouter.use(path, childRouter)
        }
        else if(method && controller) {
            if(middleware) return parentRouter[method](path, ...middleware, controller)
            parentRouter[method](path, controller)
        }
    })
}

// initiate the routes
createRoutes(router, routeList)


export default router