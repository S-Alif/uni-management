import controllerHander from "../../utils/controller-handler/controllerHandler.js"
import dashboardServices from "./dashboard.services.js";


const dashboardController = {
    adminDashboard: controllerHander(dashboardServices.adminDashboard),
    studentDashboard: controllerHander(dashboardServices.studentDashboard),
    teacherDashboard: controllerHander(dashboardServices.teacherDashboard),
}

export default dashboardController