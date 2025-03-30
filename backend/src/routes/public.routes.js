import authController from "../controllers/auth/auth.controller.js"

const routeList = [
    {path: "/login", method: "post", controller: authController.login},
    {path: "/register", method: "post", controller: authController.register}, //valid only for admins
    {path: "/otp", method: "post", controller: authController.sendOtp},
    {path: "/otp", method: "patch", controller: authController.verifyOtp},
    {path: "/update-pass", method: "patch", controller: authController.resetPassword},
    // {path: "/faculty", method: "get", controller: ""},
    // {path: "/departments", method: "get", controller: ""},
    // {path: "/faculty/departments", method: "get", controller: ""},
    // {path: "/faculty/departments/offered-programs", method: "get", controller: ""},
    // {path: "/faculty/departments/teachers", method: "get", controller: ""},
    // {path: "/subjects", method: "get", controller: ""},
]

export default routeList