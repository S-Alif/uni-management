import scheduleService from "./schedules.service.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"  

const scheduleController = {
    saveSchedule: controllerHandler(scheduleService.saveSchedule),
    removeSchedule: controllerHandler(scheduleService.removeSchedule),
    getAllSchedule: controllerHandler(scheduleService.getAllSchedule),
    getScheduleByUser: controllerHandler(scheduleService.getScheduleByUser),
}

export default scheduleController