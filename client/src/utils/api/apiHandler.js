import { errorToast } from "../toastNotification";
import api from "./axios"

const apiHandler = async (route, data = {}) => {
    try {
        let options = {
            url: route.url,
            method: route.method,
            data: data,
        }
        let result = await api(options)

        return result.data;

    } catch (error) {
        console.log(error)
        const message = error?.response?.data
        if(message){
            errorToast(message?.data)
        }
        else{
            errorToast('An error occurred, please try again later')
        }
        return false
    }
}

export default apiHandler