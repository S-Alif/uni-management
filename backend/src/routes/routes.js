import express from "express"
import { roles } from "../constants/rolesAndFiles.constants.js"

// routes
import adminRoutes from "./admin.routes.js"
import studentsRoutes from "./students.routes.js"
import teachersRoutes from "./teachers.routes.js"
import publicRoutes from "./public.routes.js"

// middleware
import authCheck from "../middlewares/auth.middlewares.js"

const router = express.Router()


router.use("/admin", authCheck([roles.ADMIN]), adminRoutes)
router.use("/students", authCheck([roles.STUDENTS]), studentsRoutes)
router.use("/teachers", authCheck([roles.TEACHERS]), teachersRoutes)
router.use("/public", publicRoutes)


export default router