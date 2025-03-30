import UserStore from "@/stores/UserStore"
import { errorToast, succesToast } from "../toastNotification"
import api from "./axios"


const apiHandler = async (route, data = {}, showToast = false) => {
    const accessToken = UserStore.getState().accessToken || null
    try {
        let options = {
            url: route.url,
            method: route.method,
            data: data,
            ...(accessToken && {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }

        let result = await api(options)
        const response = result?.data

        if (showToast) succesToast(response?.message || "Action success")

        return response

    } catch (error) {
        console.log(error)
        const message = error?.response?.data
        if(message){
            errorToast(message?.message)
        }
        else{
            errorToast("An error occurred, please try again later")
        }
        return false
    }
}

export default apiHandler