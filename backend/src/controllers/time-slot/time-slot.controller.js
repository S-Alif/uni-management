import timeSlotService from "./time-slot.service.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"

const timeSlotController = {
    saveSlot: controllerHandler(timeSlotService.saveTimeSlot),
    removeSlot: controllerHandler(timeSlotService.removeTimeSlot),
    getAllSlots: controllerHandler(timeSlotService.getAllTimeSlot)
}

export default timeSlotController