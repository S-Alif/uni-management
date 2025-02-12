import express from "express"

// routes
import userRoutes from "./admin-routes/users.admin.routes.js"

const router = express.Router()

// route lists
const routeList = [
    {path: "/users", route: userRoutes}
]

routeList.forEach(({path, route}) => {
    router.use(path, route)
})

export default router